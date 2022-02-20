/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         jobDetails.model.js
 * @author       deepak
 * @since       19/2/2022
 */

import { Schema, model } from 'mongoose';

const jobSchema = new Schema(
  {
    recruiterId: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    postName: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    type: {
      type: String
    },
    hrEmail: {
      type: String,
    },
    education: {
      type: String
    },
    experience: {
      type: String
    },
    salary: {
      type: Number
    },
    skills: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('JobDetails', jobSchema);
