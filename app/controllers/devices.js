var express = require('express');
var router = express.Router();
var deviceModel = require('../models/devices');
var amApiObject = require('../services/android-management');
var amApi = new amApiObject();


/* GET device page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'devices Dashboard' });
});


router.get('/list', async function(req, res) {
  const p =  await  deviceModel.getList(1);
  console.log('p=',p);
  res.json(p);
 });
 

 router.get('/listemm', async function(req, res) {
  const p =  await  amApi.getDeviceList(1);
  //update devcies into db;
  
  console.log('p=',p);
  res.json(p);
 });
 


 router.post('/update/:id', async function(req, res) {
  const {name,update_mask,device_body} = req.body;
  // here we are callng the android managment API to and then the response we will update to database
  const amApiBody  = {
    name: name,
    updateMask:update_mask,
    requestBody:device_body
  }
const policy_update_response =  await  amApi.updateDevice(amApiBody);
//console.log(enroll_url);
//const p =  await  policyModel.update(req.params.id,title,policy_update_response,'');
res.json(policy_update_response)
});
 

 router.delete('/delete/:deviceId/', async function(req, res) {
  //get mdm device id from the db
  const deviceId = req.params.deviceId;
  const response =  await  deviceModel.getDetails(deviceId,'mdm_device_id');

  //delete MDM devie first
      const mdm_device_id =response.data.mdm_device_id;
        const body = {
          name:mdm_device_id,
          wipeDataFlags:"PRESERVE_RESET_PROTECTION_DATA",
          wipeReasonMessage:"This devices is removed from MDM enrolment"
        };

        console.log(body);

       const r =  await  amApi.removeDevice(body);

  //delete devide record from database
   const d = deviceModel.deleteRecord(deviceId)
  
  //update devcies into db;
  //console.log('p=',d);
  res.json({"message":"device has been removed"});
 });
 


//this will sync all devices list from google to local database 
router.get('/synclist', async function(req, res) {
  //get android devies list
  const {devices} =  await  amApi.getDeviceList(1);

  //prepare the insert new array
  toinsertdata = devices.map(function(e,i){
    return {"name":e.name,"mdm_device_id":e.name,"enterprise_id":"1","device_data":e}
  } );
  insertString = toinsertdata.map(function(e,i){
      return `("`+e.name+`","1","`+e.name+`")`
  } );

//   insertString = toinsertdata.map(function(e,i){
//     return `("`+e.name+`","1","`+e.name+`",'`+JSON.stringify(e.device_data)+`')`
// } );

  console.log(insertString);
  //call the insert function 
  deviceModel.insertNewlist(insertString,1)

  const p =  await  deviceModel.getList(1);
  res.json(p);

 });
 


router.get('/details/:id', async function(req, res) {
  const p =  await  deviceModel.getDetails(req.params.id);
  console.log(p);
  res.json(p);
  //res.render('devices/details',{title: 'Device Details',mytitle:'menu',data:JSON.stringify(p, undefined, 2)});
 
 });





 router.get('/detailsemm', async function(req, res) {
  const p =  await  amApi.getDeviceDetails(req.query['name']);
  //update devcies into db;
  
  console.log('p=',p);
  res.json(p);
 });
 


module.exports = router;
