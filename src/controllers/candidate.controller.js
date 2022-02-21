/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         candidate.controller.js
 * @author       deepak
 * @since        19/2/2022
 */

import * as candidateService from '../services/candidate.service.js';

import * as applyService from '../services/apply.service';

/**
 * Controller to create a new candidate
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newCandidate = async (req, res, next) => {
  try {
    const data = await candidateService.newCandidate(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to login Candidate
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginCandidate = async (req, res, next) => {
  try {
    const data = await candidateService.loginCandidate(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add a new candidate details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const candidateDetails = async (req, res, next) => {
  try {
    const data = await candidateService.candidateDetails(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get candidate details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCandidateDetails = async (req, res, next) => {
  try {
    const data = await candidateService.getCandidateDetails(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to apply candidate
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const apply = async (req, res, next) => {
  try {
    const data = await applyService.apply(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
