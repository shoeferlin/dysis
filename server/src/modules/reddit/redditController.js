import {respondWithSuccess} from '../../helpers/response.js';

const getForMuliple = [
  (req, res) => {
    const data = {
      itsdino: {
        liwcAnalytical: 80,
      },
    };
    respondWithSuccess(
        res,
        'Found data for the following reddit users',
        data,
    );
  },
];

const redditController = {
  getForMuliple: getForMuliple,
};

export default redditController;
