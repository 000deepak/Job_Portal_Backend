/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         candidateDetails.model.js
 * @author       deepak
 * @since        19/2/2022
 */

import { Schema, model } from 'mongoose';

const candidateSchema = new Schema(
  {
    candidateId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    gender: {
      type: String
    },
    education: {
      type: String
    },
    experience: {
      type: Number
    },
    expectedCTC: {
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

export default model('CandidateDetails', candidateSchema);
