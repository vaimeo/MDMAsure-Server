const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

async function getList(enterprise_id,page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * from policies where enterprise_id=? LIMIT ?,?`, 
    [enterprise_id,offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    code:1001,
    data,
    meta
  }
}



async function getDetails(id,colums='*'){
  const rows = await db.query(
    `SELECT ${colums} from policies where id= ?`, 
    [id]
  );
  console.log('rows=',rows);
  const data = helper.emptyOrRows(rows[0]);
  
  return {
    data:data,
    code:1001
  }
}


  async function update(id,title,body,enroll_url){
    const rows = await db.query(
      `update policies set name=? , policy_data=? ,enroll_url=? where id= ?`, 
      [title,JSON.stringify(body),enroll_url,id]
    );
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated'
    }
  }


  async function create(title,body,enroll_url,enterprise_id,id=0){
    var rows ='';
    if(id>0)//update
    {
       rows = await db.query(
        `update  policies set name=? , policy_data=? ,enroll_url=? where id=?`, 
        [title,JSON.stringify(body),enroll_url,id]
      );
  
    }
    else//insert
    {
       rows = await db.query(
        `insert into policies set name=? , policy_data=? ,enroll_url=?, enterprise_id=? , mdm_policy_id=?`, 
        [title,JSON.stringify(body),enroll_url,enterprise_id,body.name  ]
      );
    }
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated',
      enroll_url:enroll_url,
      code:1001
    }
  }
  


  async function insertNewlist(body,enterprise_id){

    const del = await db.query(`delete from policies where enterprise_id=`+enterprise_id);
    console.log('del=',del);

    const rows = await db.query(
      `insert into policies (name,enterprise_id,mdm_policy_id,policy_data)
      values `+body,
    );
    console.log('insert=',rows);
    return {
      messsage:'record has been updated'
    }
  }



  async function deleteRecord(id){
    const rows = await db.query(
      `delete from policies where id=?`, 
      [id]
    );
    console.log('udpate=',rows);
    return {
      messsage:'record has been updated'
    }
  }
  
  

module.exports = {
    getList,getDetails,update,create,insertNewlist,deleteRecord
}