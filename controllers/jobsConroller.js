import { StatusCodes } from 'http-status-codes';

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
    const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(StatusCodes.OK)
        .json({
            status: true,
            jobs,
            totalJobs: jobs.length,
            numOfPages: 1,
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
    res.send('show stats');
};

export {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats,
};