import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import UnprocessableEntityError from '../errors/unprocessable-entity.js';

const createJob = async (req, res) => {
    const { position, company } = req.body;

    if (!position || !company) {
        throw new UnprocessableEntityError('Please provide all values');
    }

    const job = await Job.create({
        position,
        company,
        createdBy: req.user.userId,
    });

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            job,
        })
};

const getAllJobs = async (req, res) => {
    res.send('get all Jobs');
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