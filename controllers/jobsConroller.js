import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import UnprocessableEntityError from '../errors/unprocessable-entity.js';

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
    res.send('update Job');
};

const deleteJob = async (req, res) => {
    res.send('delete Job');
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