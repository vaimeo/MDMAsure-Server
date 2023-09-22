'use strict';
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');


async  function getList(enterprise_id,page = 1) {
        //GET DEVICES LIST FROM DATABASE
        const offset = helper.getOffset(page, config.listPerPage);
        const rows = await db.query(
        `SELECT * from devices where enterprise_id=? LIMIT ?,?`, 
        [enterprise_id,offset, config.listPerPage]
        );
        const data = helper.emptyOrRows(rows);
        const meta = {page};
        return {
        data,
        meta
        }
    }

async function getDetails(id,colums='*'){
    const rows = await db.query(
      `SELECT ${colums} from devices where id= ?`, 
      [id]
    );
    const data = helper.emptyOrRows(rows[0]);
    return {
      data:data,
      code:1001
    }
  }


  async function getDeviceDetailsByPram(column_name,column_val,colums='*'){
    const rows = await db.query(
      `SELECT ${colums} from devices where ${column_name}= ?`, 
      [column_val]
    );
    const data = helper.emptyOrRows(rows[0]);
    return {
      data:data,
      code:1001
    }
  }

  async function update(id,title,body,enroll_url){
    const rows = await db.query(
      `update devices set name=? , policy_data=? ,enroll_url=? where id= ?`, 
      [title,JSON.stringify(body),enroll_url,id]
    );
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated'
    }
  }


  async function updateData(id,body,status){
    const rows = await db.query(
      `update devices set device_data=? , status=? where id= ?`, 
      [JSON.stringify(body),status,id]
    );
    console.log('update=',rows);
    return {
      messsage:'record has been updated'
    }
  }

  async function create(title,body,enroll_url,enterprise_id){
    const rows = await db.query(
      `insert into devices set name=?,device_id=?, enterprise_id=?`, 
      [title,JSON.stringify(body),enroll_url,enterprise_id]
    );
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated'
    }
  }
  


  async function deleteRecord(id){
    const rows = await db.query(
      `delete from devices where id=?`, 
      [id]
    );
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated'
    }
  }
  


  async function getDeviceInfo(selectPram,deviceId)
  {
    
  }




  async function insertNewlist(body,enterprise_id){

    const del = await db.query(`delete from devices where enterprise_id=`+enterprise_id);
    console.log('del=',del);

    const rows = await db.query(
      `insert into devices (name,enterprise_id,mdm_device_id)
      values `+body,
    );
    console.log('insert=',rows);
    return {
      messsage:'record has been updated'
    }
  }


  async function insertNewDevice(body,enterprise_id){
    const rows = await db.query(
      `insert into devices (name,enterprise_id,mdm_device_id,device_data,status)
      values `+body,
    );
    console.log('insert=',rows);
    return {
      messsage:'record has been updated'
    }
  }

  
  
module.exports = {
    getList,getDetails,update,create,insertNewlist,deleteRecord,getDeviceDetailsByPram,updateData,insertNewDevice
}
