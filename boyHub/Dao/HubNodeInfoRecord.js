'use strict'
var BoyHubDBHelper= require('./boyHubDBHelper');
var conf=require("../src/config");
var boyHubCommon=require('../src/boyHubCommon');
 
function HubNodeInfoRecord(){
    this.BoyHubDb=new BoyHubDBHelper();
};

//RequestLog insert,update,select,delete
HubNodeInfoRecord.prototype.RequestLogInsert=function(RequestLog){

     
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyHubDb.mysqlParameter.common.sql = "insert into RequestLog (appId,appName,appGuid,userId,url,createTime,reqStorageClusterType,reqGuid,isActive,userGuid,writeSqlSha,writeSql,isConfirmedByMaster,targetDbName) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyHubDb.mysqlParameter.common.params = [RequestLog.appId,RequestLog.appName,RequestLog.appGuid,RequestLog.userId,RequestLog.url,RequestLog.createTime,RequestLog.reqStorageClusterType,RequestLog.reqGuid,RequestLog.isActive,RequestLog.userGuid,RequestLog.writeSqlSha,RequestLog.writeSql,RequestLog.isConfirmedByMaster,RequestLog.targetDbName];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--RequestLog is inserted failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--RequestLog is inserted successfully!");
              return true;
          }

        }
      
    }
    this.BoyHubDb.add();
};

HubNodeInfoRecord.prototype.RequestLogUpdate=function(RequestLog){   
   
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;   
    this.BoyHubDb.mysqlParameter.common.sql ="update RequestLog set appId=?,appName=?,appGuid=?,userId=?,url=?,createTime=?,reqStorageClusterType=?,isActive=?,userGuid=?,writeSqlSha=?,writeSql=? where reqGuid=?";
    this.BoyHubDb.mysqlParameter.common.params=[RequestLog.appId,RequestLog.appName,RequestLog.appGuid,RequestLog.userId,RequestLog.url,RequestLog.createTime,RequestLog.reqStorageClusterType,RequestLog.isActive,RequestLog.userGuid,RequestLog.writeSqlSha,RequestLog.writeSql,RequestLog.reqGuid];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog is updated failed!");
                return false;
            }
        }
    }
    this.BoyHubDb.update();
  };

  HubNodeInfoRecord.prototype.RequestLogIsActiveUpdate=function(RequestLog){   
   
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyHubDb.mysqlParameter.common.sql ="update RequestLog set isActive=? where reqGuid=?";
    this.BoyHubDb.mysqlParameter.common.params=[RequestLog.isActive,RequestLog.reqGuid];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isActive is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isActive is updated failed!");
                return false;
            }
        }
    }
    this.BoyHubDb.update();
  };

  HubNodeInfoRecord.prototype.RequestLogIsConfirmedUpdate=function(RequestLog){   
   
    console.log("start update RequestLogIsConfirmedUpdate for reqGuid:",RequestLog.reqGuid);
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyHubDb.mysqlParameter.common.sql ="update RequestLog set isConfirmedByMaster=?,confirmedByMasterIp=? where reqGuid=?";
    this.BoyHubDb.mysqlParameter.common.params=[RequestLog.isConfirmedByMaster,RequestLog.comeFromCrystalNodeIp,RequestLog.reqGuid];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isConfirmedByMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isConfirmedByMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyHubDb.update();
  };

  HubNodeInfoRecord.prototype.RequestLogIsConfirmedUpdateByWriteSha=function(isConfirmedByMaster,writeSqlSha,writeSql){   
   
     
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;      
    this.BoyHubDb.mysqlParameter.common.sql ="update RequestLog set isConfirmedByMaster=? where writeSqlSha=? and writeSql=?";
    this.BoyHubDb.mysqlParameter.common.params=[isConfirmedByMaster,writeSqlSha,writeSql];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isConfirmedByMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isConfirmedByMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyHubDb.update();
  };

  HubNodeInfoRecord.prototype.RequestLogIsSentToMasterUpdate=function(isSentToMaster,reqGuid){   
   
    this.BoyHubDb.dbType = 'mysql';    
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;  
    this.BoyHubDb.mysqlParameter.common.sql ="update RequestLog set isSentToMaster=?,sendToMasterTime=? where reqGuid=?";
    this.BoyHubDb.mysqlParameter.common.params=[isSentToMaster,boyHubCommon.GetFormatDateFromTimeSpan(Date.now()),reqGuid];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog isSentToMaster is updated successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog isSentToMaster is updated failed!");
                return false;
            }
        }
    }
    this.BoyHubDb.update();
  };


  HubNodeInfoRecord.prototype.RequestLogSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyHubDb.dbType = 'mysql';   
    this.BoyHubDb.mysqlParameter.select.tableName='RequestLog';
    this.BoyHubDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyHubDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyHubDb.mysqlParameter.select.params=params;
    this.BoyHubDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyHubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to RequestLogSelect from current node db')
         if(err)
         {
            console.log(err);
            console.log('Failed to RequestLogSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyHubDb.select();
}

HubNodeInfoRecord.prototype.RequestLogDelete=function(reqId){
    
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="RequestLog";
    this.BoyHubDb.mysqlParameter.del.whereSql="where reqId=?";
    this.BoyHubDb.mysqlParameter.del.params=[reqId];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--RequestLog is deleted successfully!");
                return true;
            }else{
                console.log(success,"--RequestLog is deleted failed!");
                return false;
            }
        }
    };
    this.BoyHubDb.del();   
}

//operationLog insert,update,select,delete
HubNodeInfoRecord.prototype.operationLogInsert=function(operationLog){

     
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "insert into operationLog (operationStorageClusterType,operationLogGuid,userId,userName,operationType,operationLogTime,appId,docId,exfModuleId,viewId,platformControllerId,platformActionId,usingObjectId,bizUserRoleId,deviceId,devLangId,operationStatusId,userGuid,appGuid,workFlowStatusId,writeSqlSha,writeSql) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyHubDb.mysqlParameter.common.params = [operationLog.operationStorageClusterType,operationLog.operationLogGuid,operationLog.userId,operationLog.userName,operationLog.operationType,operationLog.operationLogTime,operationLog.appId,operationLog.docId,operationLog.exfModuleId,operationLog.viewId,operationLog.platformControllerId,operationLog.platformActionId,operationLog.usingObjectId,operationLog.bizUserRoleId,operationLog.deviceId,operationLog.devLangId,operationLog.operationStatusId,operationLog.userGuid,operationLog.appGuid,operationLog.workFlowStatusId,operationLog.writeSqlSha,operationLog.writeSql]; 
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLog is inserted failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLog is inserted successfully!");
              return true;
          }

        }
      
    }
    this.BoyHubDb.add();
};

HubNodeInfoRecord.prototype.operationLogUpdate=function(operationLog){

     
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "update operationLog set  operationStorageClusterType=?,userId=?,userName=?,operationType=?,operationLogTime=?,appId=?,docId=?,exfModuleId=?,viewId=?,platformControllerId=?,platformActionId=?,usingObjectId=?,bizUserRoleId=?,deviceId=?,devLangId=?,operationStatusId=?,userGuid=?,appGuid=?,workFlowStatusId=?,writeSqlSha=?,writeSql=? where  operationLogGuid=? ";
    this.BoyHubDb.mysqlParameter.common.params = [operationLog.operationStorageClusterType,operationLog.userId,operationLog.userName,operationLog.operationType,operationLog.operationLogTime,operationLog.appId,operationLog.docId,operationLog.exfModuleId,operationLog.viewId,operationLog.platformControllerId,operationLog.platformActionId,operationLog.usingObjectId,operationLog.bizUserRoleId,operationLog.deviceId,operationLog.devLangId,operationLog.operationStatusId,operationLog.userGuid,operationLog.appGuid,operationLog.workFlowStatusId,operationLog.writeSqlSha,operationLog.writeSql,operationLog.operationLogGuid]; 
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLog is updated failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLog is updated successfully!");
              return true;
          }

        }
      
    }
    this.BoyHubDb.update();
};

HubNodeInfoRecord.prototype.operationLogSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyHubDb.dbType = 'mysql';    
    this.BoyHubDb.mysqlParameter.select.tableName='operationLog';
    this.BoyHubDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyHubDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyHubDb.mysqlParameter.select.params=params;
    this.BoyHubDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyHubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to operationLogSelect from current node db')
         if(err)
         {
            console.log('Failed to operationLogSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyHubDb.select();
}

HubNodeInfoRecord.prototype.operationLogDelete=function(operationLogId){
    
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="operationLog";
    this.BoyHubDb.mysqlParameter.del.whereSql="where operationLogId=?";
    this.BoyHubDb.mysqlParameter.del.params=[operationLogId];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--operationLog is deleted successfully!");
                return true;
            }else{
                console.log(success,"--operationLog is deleted failed!");
                return false;
            }
        }
    };
    this.BoyHubDb.del();   
}

HubNodeInfoRecord.prototype.operationLogDeleteAll=function(callBack){
    
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="operationLog";
    this.BoyHubDb.mysqlParameter.del.whereSql="where operationLogId>?";
    this.BoyHubDb.mysqlParameter.del.params=[0];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLog is deleted all successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLog is deleted all failed!");
                callBack(false);
            }
        }
    };
    this.BoyHubDb.del();   
}

//operationLogSummarySha insert,update,select,delete
HubNodeInfoRecord.prototype.operationLogSummaryShaInsert=function(OperationLogSummarySha){
       
        this.BoyHubDb.dbType = 'mysql';
        this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
        this.BoyHubDb.mysqlParameter.common.sql = "insert into operationLogSummarySha (latestCheckOperationSha,createTime,shaCheckGuid) values (?,?,?)";
        this.BoyHubDb.mysqlParameter.common.params = [OperationLogSummarySha.latestCheckOperationSha,OperationLogSummarySha.createTime,OperationLogSummarySha.shaCheckGuid]; 
        this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
        
            if(err)
            {
                console.dir(err); 
                console.log(success,"--operationLogSummarySha is inserted failed!"); 
                return false;
            }else
            {
            if(insertId!=undefined){
                
                console.log(success,"--operationLogSummarySha is inserted successfully!");
                return true;
            }

            }
        
        }
        this.BoyHubDb.add();
}
HubNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsConfirmedByMaster=function(shaCheckGuid,isConfirmedByMaster,confirmedByMasterIp){
    
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isConfirmedByMaster=?,isActive=?,confirmedByMasterIp=?  where  shaCheckGuid=? ";
    if(isConfirmedByMaster){
       this.BoyHubDb.mysqlParameter.common.params = [isConfirmedByMaster,false,confirmedByMasterIp,shaCheckGuid]; 
    }else{
       this.BoyHubDb.mysqlParameter.common.params = [isConfirmedByMaster,true,confirmedByMasterIp,shaCheckGuid]; 
    }
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err); 
              console.log(success,"--operationLogSummarySha isConfirmedByMaster is updated failed!"); 
              return false;
        }else
        {
          if(insertId!=undefined){
             
              console.log(success,"--operationLogSummarySha isConfirmedByMaster is updated successfully!");
              return true;
          }

        }
      
    }
    this.BoyHubDb.update();

}

HubNodeInfoRecord.prototype.operationLogSummaryShaUpdateNotMatchedCount=function(shaCheckGuid,callBack){
       
        this.BoyHubDb.dbType = 'mysql';
        this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
        this.BoyHubDb.mysqlParameter.common.sql = "update operationLogSummarySha set  notMatchedCount=notMatchedCount+1  where  shaCheckGuid=? ";
        this.BoyHubDb.mysqlParameter.common.params = [shaCheckGuid]; 
        this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
        
            if(err)
            {
                console.dir(err); 
                console.log(success,"--operationLogSummarySha notMatchedCount is updated failed!"); 
                callBack(false);
            }else
            {
            if(insertId!=undefined){
                
                console.log(success,"--operationLogSummarySha notMatchedCount is updated successfully!");
                callBack(true);
            }

            }
        
        }
        this.BoyHubDb.update();
}

HubNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsSendToMaster=function(isSendToMaster,shaCheckGuid){
       
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isSendToMaster=?,sendToMasterTime=?  where  shaCheckGuid=? ";
    this.BoyHubDb.mysqlParameter.common.params = [isSendToMaster,boyHubCommon.GetFormatDateFromTimeSpan(Date.now()),shaCheckGuid]; 
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--operationLogSummarySha isSendToMaster is updated failed!"); 
            return false;
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--operationLogSummarySha isSendToMaster is updated successfully!");
            return true;
        }

        }
    
    }
    this.BoyHubDb.update();
}

HubNodeInfoRecord.prototype.operationLogSummaryShaUpdateIsNeedRestore=function(shaCheckGuid,definedOperationLogCheckFailedTimes){
       
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "update operationLogSummarySha set  isNeedRestore=1 and notMatchedCount>=?  where  shaCheckGuid=? ";
    this.BoyHubDb.mysqlParameter.common.params = [definedOperationLogCheckFailedTimes,shaCheckGuid]; 
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--operationLogSummarySha isNeedRestore is updated failed!"); 
            return false;
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--operationLogSummarySha isNeedRestore is updated successfully!");
            return true;
        }

        }
    
    }
    this.BoyHubDb.update();
}

HubNodeInfoRecord.prototype.operationLogSummaryShaSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    this.BoyHubDb.dbType = 'mysql';    
    this.BoyHubDb.mysqlParameter.select.tableName='operationLogSummarySha';
    this.BoyHubDb.mysqlParameter.select.topNumber=topNumber;
    this.BoyHubDb.mysqlParameter.select.whereSql=whereSql;
    this.BoyHubDb.mysqlParameter.select.params=params;
    this.BoyHubDb.mysqlParameter.select.orderSql=orderBySql;
    this.BoyHubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to operationLogSummaryShaSelect from current node db')
         if(err)
         {
            console.log('Failed to operationLogSummaryShaSelect from current node db');  
            callBack(undefined); 
         }
         else
         {
            callBack(rows); 
           
         }
    };
    this.BoyHubDb.select();
}

HubNodeInfoRecord.prototype.operationLogSummaryShaDelete=function(shaCheckId){
        this.BoyHubDb.dbType = 'mysql'; 
        this.BoyHubDb.mysqlParameter.del.tableName="operationLogSummarySha";
        this.BoyHubDb.mysqlParameter.del.whereSql="where shaCheckId=?";
        this.BoyHubDb.mysqlParameter.del.params=[shaCheckId];
        this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
            if (err) {
                console.dir(err);  
                return false;
            }else
            {
                if(success){
                    console.log(success,"--operationLogSummarySha is deleted successfully!");
                    return true;
                }else{
                    console.log(success,"--operationLogSummarySha is deleted failed!");
                    return false;
                }
            }
        };
        this.BoyHubDb.del(); 
}

HubNodeInfoRecord.prototype.checkedOperationLogSummaryShaDelete=function(){
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="operationLogSummarySha";
    this.BoyHubDb.mysqlParameter.del.whereSql="where isConfirmedByMaster=1 and isActive=0";
    this.BoyHubDb.mysqlParameter.del.params=[""];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--checked OperationLogSummarySha is deleted successfully!");
                return true;
            }else{
                console.log(success,"--checked OperationLogSummarySha is deleted failed!");
                return false;
            }
        }
    };
    this.BoyHubDb.del(); 
}

//operationLogShadow delete
HubNodeInfoRecord.prototype.operationLogShadowDelete=function(callBack){
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="operationLogShadow";
    this.BoyHubDb.mysqlParameter.del.whereSql="where shaCheckId>?";
    this.BoyHubDb.mysqlParameter.del.params=[0];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLogShadow is deleted successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLogShadow is deleted failed!");
                callBack(false);
            }
        }
    };
    this.BoyHubDb.del(); 
}


//operationLogLanding insert,delete
HubNodeInfoRecord.prototype.operationLogLandingInsert=function(OperationLogLanding,callBack){
       
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig;
    this.BoyHubDb.mysqlParameter.common.sql = "insert into operationLogLanding (operationStorageClusterType,operationLogGuid,userId,userName,operationType,operationLogTime,appId,docId,exfModuleId,viewId,platformControllerId,platformActionId,usingObjectId,bizUserRoleId,deviceId,devLangId,operationStatusId,userGuid,appGuid,workFlowStatusId,writeSqlSha,writeSql) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    this.BoyHubDb.mysqlParameter.common.params = [OperationLogLanding.operationStorageClusterType,OperationLogLanding.operationLogGuid,OperationLogLanding.userId,OperationLogLanding.userName,OperationLogLanding.operationType,OperationLogLanding.operationLogTime,OperationLogLanding.appId,OperationLogLanding.docId,OperationLogLanding.exfModuleId,OperationLogLanding.viewId,OperationLogLanding.platformControllerId,OperationLogLanding.platformActionId,OperationLogLanding.usingObjectId,OperationLogLanding.bizUserRoleId,OperationLogLanding.deviceId,OperationLogLanding.devLangId,OperationLogLanding.operationStatusId,OperationLogLanding.userGuid,OperationLogLanding.appGuid,OperationLogLanding.workFlowStatusId,OperationLogLanding.writeSqlSha,OperationLogLanding.writeSql]; 
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
    
        if(err)
        {
            console.dir(err); 
            console.log(success,"--OperationLogLanding is inserted failed!"); 
            callBack(false);
        }else
        {
        if(insertId!=undefined){
            
            console.log(success,"--OperationLogLanding is inserted successfully!");
            callBack(true);
        }

        }
    
    }
    this.BoyHubDb.add();
}

HubNodeInfoRecord.prototype.operationLogLandingDeleteAll=function(callBack){
    
    this.BoyHubDb.dbType = 'mysql'; 
    this.BoyHubDb.mysqlParameter.del.tableName="operationLogLanding";
    this.BoyHubDb.mysqlParameter.del.whereSql="where operationLogId>?";
    this.BoyHubDb.mysqlParameter.del.params=[0];
    this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callBack(undefined);
        }else
        {
            if(success){
                console.log(success,"--operationLogLanding is deleted all successfully!");
                callBack(true);
            }else{
                console.log(success,"--operationLogLanding is deleted all failed!");
                callBack(false);
            }
        }
    };
    this.BoyHubDb.del();   
}




HubNodeInfoRecord.prototype.showDataBases=function(callBack){
    
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyHubDb.mysqlParameter.common.sql ="show databases";
    this.BoyHubDb.mysqlParameter.common.params=[""];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, rows) {
      
        if(err)
        {
              console.dir(err);  
              callBack(undefined);
        }else
        {
            callBack(rows);

        }
      
    };
    this.BoyHubDb.querySql();
}

HubNodeInfoRecord.prototype.showTablesBaseOnDBName=function(DbName,callBack){
    this.BoyHubDb.dbType = 'mysql';
    this.BoyHubDb.mysqlParameter.common.dbConf=conf.mysqlConfig; 
    this.BoyHubDb.mysqlParameter.common.sql ="select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA=?";
    this.BoyHubDb.mysqlParameter.common.params=[DbName];
    this.BoyHubDb.mysqlParameter.common.callBack = function (err, rows) {
      
        if(err)
        {
              console.dir(err);  
              callBack(undefined);
        }else
        {
            callBack(rows);

        }
      
    };
    this.BoyHubDb.querySql();
}

HubNodeInfoRecord.prototype.deleteTablesByName=function(tableName,callback){
        this.BoyHubDb.dbType = 'mysql'; 
        this.BoyHubDb.mysqlParameter.del.tableName=tableName;
        this.BoyHubDb.mysqlParameter.del.whereSql="";
        this.BoyHubDb.mysqlParameter.del.params=[""];
        this.BoyHubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
            if (err) {
                console.dir(err);  
                return callback(undefined);
            }else
            {
                if(success){
                    console.log(success,"--",tableName," is deleted successfully!");
                    callback(true);
                }else{
                    console.log(success,"--",tableName," is deleted failed!");
                    callback(false);
                }
            }
        };
        this.BoyHubDb.del(); 
}

module.exports = HubNodeInfoRecord;