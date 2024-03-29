import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';

import Job from '../models/Job.js';
import UnprocessableEntityError from '../errors/unprocessable-entity.js';
import { NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res) => {
    const {
        position,
        company,
        jobLocation,
        jobType,
        status,
    } = req.body;

    if (!position || !company) {
        throw new UnprocessableEntityError('Please provide all values');
    }

    const job = await Job.create({
        position,
        company,
        jobLocation,
        jobType,
        status,
        createdBy: req.user.userId,
    });

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            job,
        });
};

const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search } = req.query;

    const queryObject = {
        // createdBy: req.user.userId,
        createdBy: '63628d5d178e918562ef9ce8',
    };

    if (status && status !== 'all') {
        queryObject.status = status;
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }

    let result = Job.find(queryObject);

    // chain sort conditions
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('position');
    }
    if (sort === 'z-a') {
        result = result.sort('-position');
    }

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const jobs = await result;

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK)
        .json({
            status: true,
            jobs,
            totalJobs,
            numOfPages,
        });
};

const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (!position || !company) {
        throw new UnprocessableEntityError('Please provide all values');
    }

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`);
    }

    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId },
        req.body,
        { new: true, runValidators: true },
    );

    res.status(StatusCodes.OK)
        .json({
            status: true,
            updatedJob,
        });
};

const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`);
    }

    checkPermissions(req.user, job.createdBy);

    await job.remove();

    res.status(StatusCodes.OK)
        .json({
            status: true,
            msg: 'Success! Job removed.',
        });
};

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        // { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $match: { createdBy: mongoose.Types.ObjectId('63628d5d178e918562ef9ce8') } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        // { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $match: { createdBy: mongoose.Types.ObjectId('63628d5d178e918562ef9ce8') } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = moment()
                .month(month - 1)
                .year(year)
                .format('MMM Y');
            return { date, count };
        })
        .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats,
};
