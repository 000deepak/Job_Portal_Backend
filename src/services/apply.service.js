import Job from '../models/jobDetails.model';
import JobCart from '../models/jobCart.model';

//add to JobCart
export const apply = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  // console.log(req)
  console.log(req.params.jobId, 'param jobId');
  console.log(req.body.data.candidateId, 'candidateId');

  /* 1.check for Job availibilty */
  let checkJob = await Job.findOne({ _id: req.params.jobId });

  console.log(checkJob.recruiterId, 'recruiterId');

  if (checkJob) {
    let checkJobCart = await JobCart.findOne({
      jobId: req.params.jobId
    });

    console.log(checkJobCart, 'checkJobCart');

    if (!checkJobCart) {
      //create cart for jobId & add candidate
      let newJobCart = new JobCart({
        recruiterId: checkJob.recruiterId,

        jobId: req.params.jobId,

        candidates: [
          {
            candidateId: req.body.data.candidateId
          }
        ]
      });

      const data = await newJobCart.save();

      response.status = 201;
      response.success = true;
      response.message = 'Applied To Job';
      response.data = data;
      return response;
    } else {
      //jobcart already present

      /* 2.check if candidate present in that jobcart*/
      const getArrayJob = await checkJobCart.candidates.filter(
        (x) => x.candidateId === req.body.data.candidateId
      );

      if (getArrayJob.length == 0) {
        //if candidate not present in that jobcart then just push new candidate

        const newCandidate = {
          candidateId: req.body.data.candidateId
        };

        checkJobCart.candidates.push(newCandidate);

        await checkJobCart.save();

        response.status = 200;
        response.success = false;
        response.message = 'Applied To Job';
        response.data = ' ';
        return response;
      } else {
        //if candidate  present in that jobcart it has already applied

        response.status = 200;
        response.success = false;
        response.message = 'Already Applied to job';
        response.data = ' ';
        return response;
      }
    }
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Job Not Available';
    response.data = ' ';
    return response;
  }
};
