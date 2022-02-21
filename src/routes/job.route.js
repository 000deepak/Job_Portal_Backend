/**
 * @purpose      To divert control to admin/job routes when given path is hit.
 * @module       routes
 * @file         job.route.js
 * @author       deepak 
 * @since        19/2/2022
 */

 import express from 'express';
 import * as jobController from '../controllers/job.controller';
 import * as Validator from '../validators/validator';
 import { userAuth } from '../middlewares/auth.middleware';
 
 const router = express.Router();
 
//route to add job
router.post('/job',userAuth,Validator.jobValidator ,jobController.newJob);
 
//route to getjob
router.get('/job',userAuth,jobController.getJobs);
 

 export default router;
 