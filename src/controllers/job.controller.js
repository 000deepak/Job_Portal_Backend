/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         job.controller.js
 * @author       deepak
 * @since        19/2/2022
 */

import * as jobService from '../services/job.service.js';

/**
 * Controller to create a new job
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newJob = async (req, res, next) => {
  try {
    const data = await jobService.newJob(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all job available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getJobs = async (req, res, next) => {
  try {
    const data = await jobService.getJobs(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
