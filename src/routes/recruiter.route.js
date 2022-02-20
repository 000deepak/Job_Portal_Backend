/**
 * @purpose      To forward control to handler fn when given path is hit.
 * @module       routes
 * @file         recruiter.route.js
 * @author       deepak 
 * @since        19/2/2022
 */

import express from 'express';
import * as recruiterController from '../controllers/recruiter.controller';
import * as Validator from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new recruiter
router.post('/register', Validator.signupValidator, recruiterController.newRecruiter);

//route to login recruiter
router.post('/login', Validator.signinValidator, recruiterController.loginRecruiter);

//Forgot Password
router.post('/forgotpassword', Validator.emailValidator, recruiterController.forgotPassword);

//Reset password
router.post('/resetpassword', userAuth,Validator.passwordValidator, recruiterController.resetPassword); 

//get candidates
router.get('/candidates/:jobId', recruiterController.getCandidates); 

//get jobs
router.get('/jobs', userAuth, recruiterController.getPostedJobs); 


export default router;
