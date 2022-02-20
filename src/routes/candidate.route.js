/**
 * @purpose      To forward control to handler fn when given path is hit.
 * @module       routes
 * @file         candidate.route.js
 * @author       deepak 
 * @since        19/2/2022
 */

 import express from 'express';
 import * as candidateController from '../controllers/candidate.controller';
 import * as Validator from '../validators/validator';
 import { userAuth } from '../middlewares/auth.middleware';
 
 const router = express.Router();
 
//route to create a new candidate
router.post('/register', Validator.signupValidator, candidateController.newCandidate);

//route to login candidate
router.post('/login', Validator.signinValidator, candidateController.loginCandidate);

//route to create add candidate details
router.post('/detail', userAuth,candidateController.candidateDetails);
 
//route to create a new candidate
router.get('/detail', userAuth,candidateController.getCandidateDetails);
 
//route to login candidate
router.post('/apply/:jobId',userAuth, candidateController.apply);
 
  
 export default router;
 