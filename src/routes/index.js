/**
 * @purpose      To divert control to recruiter/candidate routes when given path is hit.
 * @module       routes
 * @file         index.js
 * @author       deepak
 * @since        19/2/2022
 */

import express from 'express';
const router = express.Router();
import recruiterRoute from './recruiter.route';
import candidateRoute from './candidate.route';
import jobRoute from './job.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome to candidate payroll application');
  });
  router.use('/recruiter', recruiterRoute);
  router.use('/candidate', candidateRoute);
  router.use('/job', jobRoute);

  return router;
};

export default routes;
