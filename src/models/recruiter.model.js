/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         recruiter.model.js
 * @author       deepak 
 * @since        19/2/2022
 */
import { Schema, model }  from 'mongoose';

const  recruiterSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
   email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export default model('Recruiters', recruiterSchema);
