var express = require('express');
var router = express.Router();
const usersService =  require('../services/users');
var cors = require('cors')


router.post('/auth', async function(req, res, next) {
  try {
    const {username,password} = req.body;
    console.log('username,password=',username,password);
    const getRecord = await usersService.checkCredentials(username,password);
    console.log*('getRecord=',getRecord);
    if(getRecord.data.length>0)
        {
          res.json({token:'test-token',code:"1001"});
        }
        else
        {
          res.status(401).json({message:'Wrong credentials',code:"1002"});
        }
  } catch (err) {
    console.error(`Error while getting users list `, err.message);
    next(err);
  }
});

router.get('/', async function(req, res, next) {
  try {
    res.json(await usersService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users list `, err.message);
    next(err);
  }
});


module.exports = router;
