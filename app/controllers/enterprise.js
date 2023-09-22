const express = require('express');
const router = express.Router();
const amApiObject = require('../services/android-management');
const config = require('../config');
const amApi = new amApiObject();

// Middleware for error handling
function handleError(err, res, next) {
  console.error(`Error: ${err.message}`);
  next(err);
}

// Middleware to set session
router.use((req, res, next) => {
  req.session = req.session || {}; // Ensure req.session exists
  next();
});

// Set up PubSub notifications
router.post('/setpubsub', async (req, res, next) => {
  try {
    const pubsubConfig = {
      name: 'enterprises/LC019rjnor',
      updateMask: 'pubsubTopic,enabledNotificationTypes',
      requestBody: {
        "pubsubTopic": config.pubSubTopic,
        "enabledNotificationTypes": ['ENROLLMENT', 'STATUS_REPORT', 'COMMAND']
      }
    };
    const response = await amApi.updatePubSub(pubsubConfig);
    res.json(response);
  } catch (err) {
    handleError(err, res, next);
  }
});

// Callback endpoint
router.get('/callback', (req, res) => {
  res.json(req.session);
});

// Set session data
router.get('/set', (req, res) => {
  req.session.wajid = 'hello';
  req.session.save();
  res.json(req.session);
});

// Get enterprise information
router.get('/info', async (req, res, next) => {
  try {
    const enterpriseInfo = await amApi.getEnterPriceInfo(req.body);
    res.json(enterpriseInfo);
  } catch (err) {
    handleError(err, res, next);
  }
});

// Create enterprise
router.post('/create', async (req, res, next) => {
  try {
    const createdEnterprise = await amApi.creteEnterprise(req.body);
    res.json(createdEnterprise);
  } catch (err) {
    handleError(err, res, next);
  }
});

// Get signup URL
router.get('/signupurl', async (req, res, next) => {
  try {
    const surl = await amApi.getEnterPriceSignupUrl({
      callbackUrl: config.signupCallbackUrl,
      projectId: config.projectId,
    });
    req.session.signupUrls = surl.name;
    res.json(surl);
  } catch (err) {
    handleError(err, res, next);
  }
});

// Delete enterprise
router.delete('/delete', async (req, res) => {
  try {
    await amApi.enterprisesDelete(req.body);
    res.json({ "message": "enterprise has been removed" });
  } catch (err) {
    handleError(err, res, next);
  }
});

// List enterprises
router.get('/listemm', async (req, res,next) => {
  try {
    const enterpriseList = await amApi.getEnterpriseList();
    console.log('Enterprise List:', enterpriseList);
    res.json(enterpriseList);
  } catch (err) {
    handleError(err, res, next);
  }
});

module.exports = router;
