/* eslint-disable require-jsdoc */
import axios from 'axios';
import {query} from 'express-validator';

import log from '../../helpers/log.js';
import validate from '../../helpers/validate.js';
import {
  respondWithSuccess,
  respondWithSuccessAndData,
} from '../../helpers/response.js';
import {analyzeComment} from '../../analytics/perspective.js';

async function getCommentsFromRedditUserOnPushshift(username) {
  log.info('PUSHSHIFT', `Requesting comments from ${username}`);
  const URL = 'https://api.pushshift.io/reddit/comment/search';
  const response = await axios(URL + '?author=' + username);
  return await response.data;
}

async function getSubmissionsFromRedditUserOnPushshift(username) {
  log.info('PUSHSHIFT', `Requesting submissions from ${username}`);
  const URL = 'https://api.pushshift.io/reddit/submission/search';
  const response = await axios(URL + '?author=' + username);
  return await response.data;
}

async function analyzeUser(username) {
  const userAnalysis = {
    username,
    perspective: {
      toxicity: null,
    },
    metrics: {
      totalSubmissions: null,
      totalComments: null,
      totalAccountAge: null,
      medianUpvotesForSubmissions: null,
      medianUpvotesForComments: null,
    },
    context: {
      subredditsForSubmissions: [],
      subredditsForComments: [],
      subreddits: [],
    },
  };
  const submissions = await getSubmissionsFromRedditUserOnPushshift(username);
  const comments = await getCommentsFromRedditUserOnPushshift(username);

  console.log(submissions);
  console.log(comments);

  userAnalysis.metrics.totalSubmissions = submissions.data.length;
  userAnalysis.metrics.totalComments = comments.data.length;

  return userAnalysis;
}

async function getCommentTextFromUser(username) {
  const comments = [];
  const pushshift = await getCommentsFromRedditUserOnPushshift(username);
  for (const comment of await pushshift.data) {
    if (comment.body) {
      comments.push(comment.body);
    }
  }
  log.debug('getCommentsFromUser', typeof comments);
  return comments;
}

async function getSubmissionTextFromUser(username) {
  const submissions = [];
  const pushshift = await getSubmissionsFromRedditUserOnPushshift(username);
  for (const comment of await pushshift.data) {
    if (comment.selftext) {
      submissions.push(comment.selftext);
    }
  }
  log.debug('getSubmissionsFromUser', typeof submissions);
  return submissions;
}

async function sendTextToPerspective(username) {
  let text = await getCommentTextFromUser(username);
  log.debug('TEXT DIRECT', text);
  text = text.join('; ');
  log.debug('TEXT', text);
  const analysis = await analyzeComment(text);
  console.log(analysis.attributeScores);
}

async function getTextFromUser(username) {
  const text = [];
  const comments = await getCommentTextFromUser(username);
  const submissions = await getSubmissionTextFromUser(username);
  log.debug(typeof comments);
  log.debug(typeof submissions);
  text.concat(comments);
  text.concat(submissions);
  log.debug(typeof text);
  return text;
}

/**
 * Controller for handling incoming requests to test the Pushshift API
 */
class PushshiftController {
  /**
   * Perspective API Controller
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static getComments = [
    // Validations using express-validator
    query('username')
        .exists().withMessage('username in query required')
        .isString().withMessage('username must be a string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const username = req.query.username;
      const response = await getCommentsFromRedditUserOnPushshift(username);
      try {
        respondWithSuccessAndData(
            res,
            {pushshift: await response},
            'Pushshift API returned the following data',
        );
      } catch (e) {
        log.error(e);
      }
    },
  ];

  /**
   * Perspective API Controller
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static getSubmissions = [
    // Validations using express-validator
    query('username')
        .exists().withMessage('username in query required')
        .isString().withMessage('username must be a string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const username = req.query.username;
      const response = await getSubmissionsFromRedditUserOnPushshift(username);
      try {
        respondWithSuccessAndData(
            res,
            {pushshift: await response},
            'Pushshift API returned the following data',
        );
      } catch (e) {
        log.error(e);
      }
    },
  ];

  static debug = [
    async (_, res) => {
      console.log(await sendTextToPerspective('1r0ll'));
      respondWithSuccess(
          res,
          'See console for more debugging information',
      );
    //   const data = await analyzeUser('1r0ll');
    //   respondWithSuccessAndData(
    //       res,
    //       data,
    //       'See console for more debugging information');
    },
  ];
}

export {
  PushshiftController,
};
