import express from 'express';
const router = express.Router();

import {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats,
} from '../controllers/jobsConroller.js';

router.route('/stats').get(showStats);
router.route('/')
    .post(createJob)
    .get(getAllJobs);
router.route('/:id')
    .delete(deleteJob)
    .patch(updateJob);


export default router;