/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Candidate.service.js
 * @author       deepak
 * @since        19/2/2022
 */

import Candidate from '../models/candidate.model';
import CandidateDetails from '../models/candidateDetails';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//create new Candidate
export const newCandidate = async (body) => {
  let email = { email: body.email };

  let foundCandidate = await Candidate.findOne(email);

  if (!foundCandidate) {
    let hash = await bcrypt.hash(body.password, 8);
    let newCan = new Candidate({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash
    });

    const data = await Candidate.create(newCan);

    let response = {
      status: 201,
      success: true,
      message: 'Candidate registration successfull',
      data: data
    };
    return response;
  } else {
    let response = {
      status: 409,
      success: false,
      message: 'Candidate already exists',
      data: body
    };
    return response;
  }
};

//login Candidate
export const loginCandidate = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };

  let email = { email: body.email };

  let foundCandidate = await Candidate.findOne(email);

  if (foundCandidate) {
    let match = await bcrypt.compare(body.password, foundCandidate.password);
    if (match) {
      let token = jwt.sign(
        { email: foundCandidate.email, candidateId: foundCandidate._id },
        'secret'
      );

      let obj = {
        firstName: foundCandidate.firstName,
        lastName: foundCandidate.lastName,
        candidateId: foundCandidate._id,
        email: foundCandidate.email,
        token: token
      };

      response.status = 200;
      response.success = true;
      response.message = 'Login Successful';
      response.data = obj;
      return response;
    }
    response.status = 401;
    response.success = false;
    response.message = 'Invalid Password';
    response.data = body;

    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Candidate Not Found';
    response.data = body;

    return response;
  }
};

//add Candidate details
export const candidateDetails = async (req) => {
  console.log(req.body.data.candidateId);

  let email = { email: req.body.email };

  let foundCandidate = await CandidateDetails.findOne(email);

  if (!foundCandidate) {
    let newDetail = new CandidateDetails({
      candidateId: req.body.data.candidateId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      education: req.body.education,
      experience: req.body.experience,
      expectedCTC: req.body.expectedCTC,
      skills: req.body.skills
    });

    const data = await CandidateDetails.create(newDetail);

    let response = {
      status: 201,
      success: true,
      message: 'Candidate Details Added Successfully',
      data: data
    };
    return response;
  } else {
    let response = {
      status: 409,
      success: false,
      message: 'Candidate Details Already Exists',
      data: body
    };
    return response;
  }
};

//get jobs
export const getCandidateDetails = async (req) => {
  const data = await CandidateDetails.find({
    candidateId: req.body.data.candidateId
  });
  let response = {
    status: 200,
    success: false,
    message: '',
    data: ''
  };
  response.status = 200;
  response.success = false;
  response.message = 'Candidate Found';
  response.data = data;

  return response;
};
