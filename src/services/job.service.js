/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Job.service.js
 * @author       deepak
 * @since        19/2/2022
 */

import Job from '../models/jobDetails.model';

//create new Job
export const newJob = async (req) => {

  
  let newJob = new Job({
    recruiterId: req.body.data.recruiterId,
    companyName: req.body.companyName,
    postName: req.body.postName,
    location: req.body.location,
    type: req.body.type,
    hrEmail: req.body.hrEmail,
    education: req.body.education,
    experience: req.body.experience,
    salary: req.body.salary,
    skills: req.body.skills
  });

  const data = await Job.create(newJob);

  let response = {
    status: 201,
    success: true,
    message: 'Job Posted Successfully',
    data: data
  };
  return response;
};

//get jobs
export const getJobs = async () => {
  const data = await Job.find();
  let response = {
    status: 200,
    success: false,
    message: '',
    data: ''
  };
  response.status = 200;
  response.success = false;
  response.message = 'All Jobs Fectched';
  response.data = data;

  return response;
};
