/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         jobcart.model.js
 * @author       deepak
 * @since        19/2/2022
 *
 */

import { Schema, model } from 'mongoose';
const cartSchema = new Schema({
  recruiterId: {
    type: String
  },
  jobId: {
    type: String
  },
  candidates: [
    {
      candidateId: {
        type: String
      }
    }
  ]
});

export default model('JobCart', cartSchema);
