var express = require('express');
var router = express.Router();
var amApiObject = require('../services/android-management');
var amApi = new amApiObject();
var deviceModel = require('../models/devices');
//var io = require('../app');

///its used to setup pubsub notificaitons, we will use it to get the devices notifications such as enrolled, disabled etc
router.post('/callback', async function(req, res, next) {
  try {


    //create a buffer
    const buff = Buffer.from(req.body.message.data, 'base64');
    //decode buffer as UTF-8
    const str = buff.toString('utf-8');
    const reqDeviceData = JSON.parse(str);
    var deviceName = reqDeviceData.name;

    
    var notificationType  =   req.body.message.attributes.notificationType;

    if(notificationType=="STATUS_REPORT")
    {
      //get Device details from DB
      const p =  await  deviceModel.getDeviceDetailsByPram('mdm_device_id',deviceName);
      const deviceData = p.data;
      console.log('device-db-data=',deviceData.name);
      
      require('../io').io().emit('deviceupdates',{
        status:'status_updates',
        device_name: deviceData.name,
        device_status: reqDeviceData.appliedState
      });

      deviceModel.updateData(deviceData.id,reqDeviceData,reqDeviceData.state);

      //Update device data in DB

    }

    if(notificationType=="ENROLLMENT")
    {
      
      require('../io').io().emit('deviceupdates',{
        status:notificationType,
        device_name: reqDeviceData.name,
        device_status: reqDeviceData.appliedState
      });

          //prepare the insert new array
          insertString = `("`+reqDeviceData.name+`","1","`+reqDeviceData.name+`",'`+JSON.stringify(reqDeviceData)+`',"`+reqDeviceData.state+`")`;

          //console.log(insertString);
          //call the insert function 
          deviceModel.insertNewDevice(insertString,1)

    }

    if(notificationType=="COMMAND")
    {

    }
    
    //update device data in db
    
    //res.render('devices/details',{title: 'Device Details',mytitle:'menu',data:JSON.stringify(p, undefined, 2)});

    res.status(200).json(reqDeviceData);
   // res.end();
  } catch (err) {
    console.error(`Error while getting callback response `, err.message);
    next(err);
  }
});


module.exports = router;
