var express = require('express');
var router = express.Router();
var policyModel = require('../models/policies');
var amApiObject = require('../services/android-management');
var amApi = new amApiObject();
const helper = require('../helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Policies Dashboard' });
});

router.get('/list', async function(req, res) {
 const p =  await  policyModel.getList(1);
 res.json(p);
});


router.get('/listemm', async function(req, res) {
  const p =  await  amApi.getPolicyList();
  //update devcies into db;
  
  console.log('p=',p);
  res.json(p);
 });
 

 


 router.delete('/delete/:policyId/', async function(req, res) {
  //get mdm device id from the db
  const policyId = req.params.policyId;
  const response =  await  policyModel.getDetails(policyId,'mdm_policy_id');

  //delete MDM devie first
      const mdmpolicyId =response.data.mdm_policy_id;
        const body = {
          name:mdmpolicyId
        };
      const r =  await  amApi.removeDevice(body);

  //delete devide record from database
   const d = await policyModel.deleteRecord(policyId)
  
  //update devcies into db;
  //console.log('p=',d);
  res.json({"message":"policy has been removed"});
 });
 


//this will sync all devices list from google to local database 
router.get('/synclist', async function(req, res) {
  //get android devies list
  const {policies} =  await  amApi.getPolicyList();

  //prepare the insert new array
  toinsertdata = policies.map(function(e,i){
    return {"name":e.name,"mdm_policy_id":e.name,"enterprise_id":"1","policy_data":e}
  } );
  insertString = toinsertdata.map(function(e,i){
      return `("`+e.name+`","1","`+e.name+`",'`+JSON.stringify(e.policy_data)+`')`
  } );


  //call the insert function 
  policyModel.insertNewlist(insertString,1)

   const p =  await  policyModel.getList(1);
   res.json(p);

  //res.end();

 });

 

router.get('/details/:id', async function(req, res) {
  const p =  await  policyModel.getDetails(req.params.id);
  res.json(p);
  // res.render('policy/details',{title: 'Policy Details',mytitle:'menu',data:p,jsondata:JSON.stringify(p, undefined, 2)});
 });

 router.post('/update/:id', async function(req, res) {
      const {title,policy_body,update_mask,enroll_url} = req.body;
      // here we are callng the android managment API to and then the response we will update to database
      const amApiBody  = {
        name: policy_body.name,
        requestBody:policy_body
      }
    const policy_update_response =  await  amApi.updatePolicy(amApiBody);
    console.log('policy_update_response=',policy_update_response);
    const p =  await  policyModel.update(req.params.id,title,policy_update_response,'');
    res.json(p)
 });

 router.post('/create', async function(req, res) {
    const {title,policy_body,update_mask,id} = req.body;
    var mdm_enterprise_id='LC019rjnor';
    var enterprise_id =1;
    policy_body.name = helper.getName('policy',mdm_enterprise_id,title)



    //here we are callng the android managment API to and then the response we will update to database
    const amApiBody  = {
      name:policy_body.name,
      requestBody:policy_body
    }

    //     const amApiBody  = {
    //   name:policy_body.name,
    //   requestBody:{
    //     "applications": [
    //         {
    //             "packageName": "com.google.samples.apps.iosched",
    //             "installType": "FORCE_INSTALLED"
    //         }
    //     ],
    //     "debuggingFeaturesAllowed": true,
    //     "kioskCustomLauncherEnabled": true
    //   }
    // }

    console.log(amApiBody)
    // const policy_create_response =  await  amApi.updatePolicy(amApiBody);
    // var enroll_url = await amApi.getTokenUrl(policy_create_response.name);
    // const p =  await  policyModel.create(title,policy_create_response,enroll_url,enterprise_id,id);
    // console.log('policy_create_response=',policy_create_response);
    // res.json(p);

  });
  

 router.get('/generateToken', async function(req, res) {
  const url =  await  amApi.getTokenUrl(req.query['name']);
  res.redirect(url);
 });

// router.get('/updateTest', async function(req, res) {
//   const p =  await  policyInstance.updatePolicy();
//   console.log('p=',p);
//   res.render('login', { title: 'login' });
//  });

// router.post('/update', async  function(req, res) {
//   console.log('reqFirstBody=',req.body);
//   const p =  await  policyInstance.updatePolicy(req.body);
//   //console.log('response-body=',p);
//   res.json(p)
//  });

module.exports = router;
