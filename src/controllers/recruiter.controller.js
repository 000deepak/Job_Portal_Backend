/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         recruiter.controller.js
 * @author       deepak
 * @since        9/1/2022
 */

import * as recruiterService from '../services/recruiter.service.js';

/**
 * Controller to create a new recruiter
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newRecruiter = async (req, res, next) => {
  try {
    const data = await recruiterService.newRecruiter(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to login recruiter
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginRecruiter = async (req, res, next) => {
  try {
    const data = await recruiterService.loginRecruiter(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to forgoot pasword link
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await recruiterService.forgotPassword(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to reset Password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const data = await recruiterService.resetPassword(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCandidates = async (req, res, next) => {
  try {
    const data = await recruiterService.getCandidates(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to post jobs
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getPostedJobs = async (req, res, next) => {
  try {
    const data = await recruiterService.getPostedJobs(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
