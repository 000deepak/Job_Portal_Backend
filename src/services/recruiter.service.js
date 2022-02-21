/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Recruiter.service.js
 * @author       deepak
 * @since        19/2/2022
 */


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as sendEmail from '../middlewares/nodemailer.middleware.js';
import Recruiter from '../models/recruiter.model';
import JobCart from '../models/jobCart.model';
import Job from '../models/jobDetails.model';
import CandidateDetails from '../models/candidateDetails';

//create new Recruiter
export const newRecruiter = async (body) => {
  let email = { email: body.email };

  let foundRecruiter = await Recruiter.findOne(email);

  if (!foundRecruiter) {
    let hash = await bcrypt.hash(body.password, 8);
    let newRecruiter = new Recruiter({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash
    });

    const data = await Recruiter.create(newRecruiter);

    let response = {
      status: 201,
      success: true,
      message: 'Recruiter registration successfull',
      data: data
    };
    return response;
  } else {
    let response = {
      status: 409,
      success: false,
      message: 'Recruiter already exists',
      data: body
    };
    return response;
  }
};

//login Recruiter
export const loginRecruiter = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };

  let email = { email: body.email };
  let foundRecruiter = await Recruiter.findOne(email);

  if (foundRecruiter) {
    let match = await bcrypt.compare(body.password, foundRecruiter.password);
    if (match) {
      let token = jwt.sign(
        { email: foundRecruiter.email, recruiterId: foundRecruiter._id },
        'secret'
      );

      let obj = {
        firstName: foundRecruiter.firstName,
        lastName: foundRecruiter.lastName,
        recruiterId: foundRecruiter._id,
        email: foundRecruiter.email,
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
    response.message = 'Recruiter Not Found';
    response.data = body;

    return response;
  }
};

//forgot password
export const forgotPassword = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };
  let email = { email: body.email };
  let foundRecruiter = await Recruiter.findOne(email);
  if (foundRecruiter) {
    //jwt
    let token = jwt.sign(
      { email: foundRecruiter.email, recruiterId: foundRecruiter.id },
      'secret'
    );
    let address = 'http://localhost:3000/reset-password/';

    let link = address + token;

    console.log('Sending email to ', foundRecruiter.email);

    let send = await sendEmail.sendEmail(foundRecruiter.email, link);

    response.status = 200;
    response.success = true;
    response.message = 'Link Sent To Email';
    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Recruiter Not Found';
    response.data = body;

    return response;
  }
};

//reset password
export const resetPassword = async (body) => {
  let response = {
    status: 201,
    success: false,
    message: '',
    data: ''
  };
  let RecruiterId = { _id: body.data.RecruiterId };
  let foundRecruiter = await Recruiter.findOne(RecruiterId);
  if (foundRecruiter) {
    //('Resetting Password ', foundRecruiter);

    let hash = await bcrypt.hash(body.confirmPassword, 8);

    let newPassword = { password: hash };

    let update = await Recruiter.findByIdAndUpdate(RecruiterId, newPassword);

    response.status = 200;
    response.success = true;
    response.message = 'Password Update Successful';
    response.data = update;

    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Recruiter Not Found';
    response.data = body;

    return response;
  }
};

//get applied candidates
export const getCandidates = async (req) => {
  let response = {
    status: 200,
    success: false,
    message: '',
    data: ''
  };

  const candidateDetails = await CandidateDetails.find();

  const data = await JobCart.findOne({ jobId: req.params.jobId });

  let candidates = candidateDetails.filter((o) =>
    data.candidates.some(({ candidateId }) => o.candidateId === candidateId)
  );

  response.status = 200;
  response.success = false;
  response.message = 'All Candidates Fectched';
  response.data = candidates;

  return response;
};

//get applied candidates
export const getPostedJobs = async (req) => {
  let response = {
    status: 200,
    success: false,
    message: '',
    data: ''
  };

  const data = await Recruiter.findOne({ _id: req.body.data.recruiterId });

  if (data) {
    const data = await Job.find({ recruiterId: req.body.data.recruiterId });
    response.status = 200;
    response.success = false;
    response.message = 'All Posted Jobs Fectched';
    response.data = data;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Jobs Not Found';
    response.data = data;
  }
  return response;
};
