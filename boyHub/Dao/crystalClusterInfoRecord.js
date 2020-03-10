'use strict'
var HubDbHelper= require('./boyHubDBHelper');
var HubDb=new HubDbHelper();

function CrystalClusterInfoRecord(){

}; 

//crystalClusterBlock insert,update,select,delete
CrystalClusterInfoRecord.prototype.crystalClusterBlockInsert=function(crystalClusterBlock){
   
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="insert into crystalClusterBlock (crystalNodeGuid,crystalNodeIp,crystalNodePort,interactProtocolType,mem_totalHeap,mem_heapUsed,mem_totalForCurrentProcess,mem_totalOnV8EngineUsing,mem_usedMemRate,cpuArch,cpuInfo,freemem,hostName,loadAvg,networkInterface,platformtype,platformVersion,osTempDir,totalMemory,osType,nodeNormalRunedTime,crstalNodeRole) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    HubDb.mysqlParameter.common.params = [crystalClusterBlock.crystalNodeGuid,crystalClusterBlock.crystalNodeIp,crystalClusterBlock.crystalNodePort,crystalClusterBlock.interactProtocolType,crystalClusterBlock.mem_totalHeap,crystalClusterBlock.mem_heapUsed,crystalClusterBlock.mem_totalForCurrentProcess,crystalClusterBlock.mem_totalOnV8EngineUsing,crystalClusterBlock.mem_usedMemRate,crystalClusterBlock.cpuArch,crystalClusterBlock.cpuInfo,crystalClusterBlock.freemem,crystalClusterBlock.hostName,crystalClusterBlock.loadAvg,crystalClusterBlock.networkInterface,crystalClusterBlock.platformtype,crystalClusterBlock.platformVersion,crystalClusterBlock.osTempDir,crystalClusterBlock.totalMemory,crystalClusterBlock.osType,crystalClusterBlock.nodeNormalRunedTime,crystalClusterBlock.crstalNodeRole];
    HubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err);  
              return false;
        }else
        {
          if(insertId!=undefined){
             if(success){
                console.log(success,"--crystalClusterBlock is inserted successfully!");
                return true;
             }else{
                return false;
             }
          }

        }
      
    };
    HubDb.add();
};

CrystalClusterInfoRecord.prototype.crystalClusterBlockUpdate=function(crystalClusterBlock){
    
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update crystalClusterBlock set crystalNodeIp=?,crystalNodePort=?,interactProtocolType=?,mem_totalHeap=?,mem_heapUsed=?,mem_totalForCurrentProcess=?,mem_totalOnV8EngineUsing=?,mem_usedMemRate=?,cpuArch=?,cpuInfo=?,freemem=?,hostName=?,loadAvg=?,networkInterface=?,platformtype=?,platformVersion=?,osTempDir=?,totalMemory=?,osType=?,nodeNormalRunedTime=? where crystalNodeGuid=?";
    HubDb.mysqlParameter.common.params=[crystalClusterBlock.crystalNodeIp,crystalClusterBlock.crystalNodePort,crystalClusterBlock.interactProtocolType,crystalClusterBlock.mem_totalHeap,crystalClusterBlock.mem_heapUsed,crystalClusterBlock.mem_totalForCurrentProcess,crystalClusterBlock.mem_totalOnV8EngineUsing,crystalClusterBlock.mem_usedMemRate,crystalClusterBlock.cpuArch,crystalClusterBlock.cpuInfo,crystalClusterBlock.freemem,crystalClusterBlock.hostName,crystalClusterBlock.loadAvg,crystalClusterBlock.networkInterface,crystalClusterBlock.platformtype,crystalClusterBlock.platformVersion,crystalClusterBlock.osTempDir,crystalClusterBlock.totalMemory,crystalClusterBlock.osType,crystalClusterBlock.nodeNormalRunedTime,crystalClusterBlock.crystalNodeGuid];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--crystalClusterBlock is updated successfully!");
                return true;
            }else{
                return false;
            }
        }
    };
    HubDb.update();
};

CrystalClusterInfoRecord.prototype.crystalClusterBlockMasterUpdate=function(crystalClusterBlock){
    
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update crystalClusterBlock set crstalNodeRole=? where crystalNodeIp=?";
    HubDb.mysqlParameter.common.params=[crystalClusterBlock.crstalNodeRole,crystalClusterBlock.crystalNodeIp];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--crystalClusterBlock master is updated successfully!");
                return true;
            }else{
                console.log(success,"--crystalClusterBlock master is updated failed!");
                return false;
            }
        }
    };
    HubDb.update();
};

CrystalClusterInfoRecord.prototype.crystalClusterBlockSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    HubDb.dbType = 'mysql';    
    HubDb.mysqlParameter.select.tableName='crystalClusterBlock';
    HubDb.mysqlParameter.select.topNumber=topNumber;
    HubDb.mysqlParameter.select.whereSql=whereSql;
    HubDb.mysqlParameter.select.params=params;
    HubDb.mysqlParameter.select.orderSql=orderBySql;
    HubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to crystalClusterBlockSelect from current node db');
         if(err)
         {
           console.log('Failed to crystalClusterBlockSelect from current node db');  
           callBack(undefined);
         }
         else
         {
           callBack(rows);
           
         }
    };
    HubDb.select();
};


CrystalClusterInfoRecord.prototype.crystalClusterBlockDelete=function(crystalNodeIp,crystalNodePort,interactProtocolType,callback){
   
    HubDb.dbType = 'mysql'; 
    HubDb.mysqlParameter.del.tableName="crystalClusterBlock";
    HubDb.mysqlParameter.del.whereSql="where crystalNodeIp=? and crystalNodePort=? and interactProtocolType=?";
    HubDb.mysqlParameter.del.params=[crystalNodeIp,crystalNodePort,interactProtocolType];
    HubDb.mysqlParameter.del.callBack=function(err,success,affectRowsCount){
        if (err) {
            console.dir(err);  
            callback(false);
        }else
        {
            if(success){
                console.log(success,"--crystalClusterBlock is deleted successfully!");
                callback(true);
            }else{
                callback(false);
            }
        }
    };
    HubDb.del();
}

//unitNodeRelation insert,update,select
CrystalClusterInfoRecord.prototype.unitNodeRelationInsert=function(unitNodeRelation){
    
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="insert into unitNodeRelation(appId,unitNodeGuid,isActive,createTime,updateTime,unitNodeRelationId,unitNodeRelationGuid,unitNodeRole,unitNodeSource,unitNodeIp,unitNodePort,unitNodeProtocolType,mem_totalHeap,mem_heapUsed,mem_totalForCurrentProcess,mem_totalOnV8EngineUsing,mem_usedMemRate,cpuArch,cpuInfo,freemem,hostName,loadAvg,networkInterface,platformtype,platformVersion,osTempDir,totalMemory,osType,nodeNormalRunedTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    HubDb.mysqlParameter.common.params = [unitNodeRelation.appId,unitNodeRelation.unitNodeGuid,unitNodeRelation.isActive,unitNodeRelation.createTime,unitNodeRelation.updateTime,unitNodeRelation.unitNodeRelationId,unitNodeRelation.unitNodeRelationGuid,unitNodeRelation.unitNodeRole,unitNodeRelation.unitNodeSource,unitNodeRelation.unitNodeIp,unitNodeRelation.unitNodePort,unitNodeRelation.unitNodeProtocolType,unitNodeRelation.mem_totalHeap,unitNodeRelation.mem_heapUsed,unitNodeRelation.mem_totalForCurrentProcess,unitNodeRelation.mem_totalOnV8EngineUsing,unitNodeRelation.mem_usedMemRate,unitNodeRelation.cpuArch,unitNodeRelation.cpuInfo,unitNodeRelation.freemem,unitNodeRelation.hostName,unitNodeRelation.loadAvg,unitNodeRelation.networkInterface,unitNodeRelation.platformtype,unitNodeRelation.platformVersion,unitNodeRelation.osTempDir,unitNodeRelation.totalMemory,unitNodeRelation.osType,unitNodeRelation.nodeNormalRunedTime];
    HubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err);  
              return false;
        }else
        {
          if(insertId!=undefined){
             if(success){
                console.log(success,"--unitNodeRelation is inserted successfully!");
                return true;
             }else{
                return false;
             }
          }

        }
      
    };
    HubDb.add();
};

CrystalClusterInfoRecord.prototype.unitNodeRelationUpdate=function(unitNodeRelation){

    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update unitNodeRelation set appId=?,isActive=?,createTime=?,updateTime=?,unitNodeRelationId=?,unitNodeRelationGuid=?,unitNodeRole=?,unitNodeSource=?,unitNodeIp=?,unitNodePort=?,unitNodeProtocolType=?,mem_totalHeap=?,mem_heapUsed=?,mem_totalForCurrentProcess=?,mem_totalOnV8EngineUsing=?,mem_usedMemRate=?,cpuArch=?,cpuInfo=?,freemem=?,hostName=?,loadAvg=?,networkInterface=?,platformtype=?,platformVersion=?,osTempDir=?,totalMemory=?,osType=?,nodeNormalRunedTime=? where unitNodeGuid=?";
    HubDb.mysqlParameter.common.params=[unitNodeRelation.appId,unitNodeRelation.isActive,unitNodeRelation.createTime,unitNodeRelation.updateTime,unitNodeRelation.unitNodeRelationId,unitNodeRelation.unitNodeRelationGuid,unitNodeRelation.unitNodeRole,unitNodeRelation.unitNodeSource,unitNodeRelation.unitNodeIp,unitNodeRelation.unitNodePort,unitNodeRelation.unitNodeProtocolType,unitNodeRelation.mem_totalHeap,unitNodeRelation.mem_heapUsed,unitNodeRelation.mem_totalForCurrentProcess,unitNodeRelation.mem_totalOnV8EngineUsing,unitNodeRelation.mem_usedMemRate,unitNodeRelation.cpuArch,unitNodeRelation.cpuInfo,unitNodeRelation.freemem,unitNodeRelation.hostName,unitNodeRelation.loadAvg,unitNodeRelation.networkInterface,unitNodeRelation.platformtype,unitNodeRelation.platformVersion,unitNodeRelation.osTempDir,unitNodeRelation.totalMemory,unitNodeRelation.osType,unitNodeRelation.nodeNormalRunedTime,unitNodeRelation.unitNodeGuid];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--unitNodeRelation is updated successfully!");
                return true;
            }else{
                return false;
            }
        }
    };
    HubDb.update();
};

CrystalClusterInfoRecord.prototype.unitNodeRelationSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    HubDb.dbType = 'mysql';    
    HubDb.mysqlParameter.select.tableName='unitNodeRelation';
    HubDb.mysqlParameter.select.topNumber=topNumber;
    HubDb.mysqlParameter.select.whereSql=whereSql;
    HubDb.mysqlParameter.select.params=params;
    HubDb.mysqlParameter.select.orderSql=orderBySql;
    HubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to unitNodeRelationSelect from current node db');
         if(err)
         {
           console.log('Failed to unitNodeRelationSelect from current node db');  
           callBack(undefined);
         }
         else
         {
           callBack(rows);
           
         }
    };
    HubDb.select();
};

//crystalMasterVote insert,update,select
CrystalClusterInfoRecord.prototype.crystalMasterVoteInsert=function(crystalMasterVote){
    
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="insert into crystalMasterVote(crystalNodeId,crystalNodeGuid,lastVoteMeNodesIps,lastVotePerformanceDump,lastVoteCount,createTime,updateTime,crystalNodeIp,crystalNodePort,interactProtocolType) values (?,?,?,?,?,?,?,?,?,?)";
    HubDb.mysqlParameter.common.params = [crystalMasterVote.crystalNodeId,crystalMasterVote.crystalNodeGuid,crystalMasterVote.lastVoteMeNodesIps,crystalMasterVote.lastVotePerformanceDump,crystalMasterVote.lastVoteCount,crystalMasterVote.createTime,crystalMasterVote.updateTime,crystalMasterVote.crystalNodeIp,crystalMasterVote.crystalNodePort,crystalMasterVote.interactProtocolType];
    HubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err);  
              return false;
        }else
        {
          if(insertId!=undefined){
             if(success){
                console.log(success,"--crystalMasterVote is inserted successfully!");
                return true;
             }else{
                return false;
             }
          }

        }
      
    };
    HubDb.add();
};

CrystalClusterInfoRecord.prototype.crystalMasterVoteUpdate=function(crystalMasterVote){

    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update crystalMasterVote set lastVoteMeNodesIps=?,lastVotePerformanceDump=?,lastVoteCount=?,createTime=?,updateTime=?,crystalNodeIp=?,crystalNodePort=?,interactProtocolType=? where crystalNodeGuid=?";
    HubDb.mysqlParameter.common.params = [crystalMasterVote.lastVoteMeNodesIps,crystalMasterVote.lastVotePerformanceDump,crystalMasterVote.lastVoteCount,crystalMasterVote.createTime,crystalMasterVote.updateTime,crystalMasterVote.crystalNodeIp,crystalMasterVote.crystalNodePort,crystalMasterVote.interactProtocolType,crystalMasterVote.crystalNodeGuid];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--crystalMasterVote is updated successfully!");
                return true;
            }else{
                return false;
            }
        }
    };
    HubDb.update();
};

CrystalClusterInfoRecord.prototype.crystalMasterVoteClear=function(crystalMasterVote){

    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update crystalMasterVote set lastVoteCount=?,lastVoteMeNodesIps='' where crystalNodeGuid=?";
    HubDb.mysqlParameter.common.params = [crystalMasterVote.lastVoteCount,crystalMasterVote.crystalNodeGuid];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--crystalMasterVote count is cleared successfully!");
                return true;
            }else{
                console.log(success,"--crystalMasterVote count is cleared failed!");
                return false;
            }
        }
    };
    HubDb.update();
};


CrystalClusterInfoRecord.prototype.crystalMasterVoteSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    HubDb.dbType = 'mysql';    
    HubDb.mysqlParameter.select.tableName='crystalMasterVote';
    HubDb.mysqlParameter.select.topNumber=topNumber;
    HubDb.mysqlParameter.select.whereSql=whereSql;
    HubDb.mysqlParameter.select.params=params;
    HubDb.mysqlParameter.select.orderSql=orderBySql;
    HubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to crystalMasterVoteSelect from current node db');
         if(err)
         {
            console.log('Failed to crystalMasterVoteSelect from current node db');  
            callBack(undefined);
         }
         else
         {
            callBack(rows);
          
           
         }
    };
    HubDb.select();
};

//customerDbList insert,update,select
CrystalClusterInfoRecord.prototype.customerDbListInsert=function(customerDbList){
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="insert into customerDbList(guid,dataSourceClassName,dataSourceUser,dataSourcePassword,dataSourceDataBaseName,dataSourcePortNumber,dataSourceServerName,remark,dbTypeNum,isActive,createTime) values (?,?,?,?,?,?,?,?,?,?,?)";
    HubDb.mysqlParameter.common.params = [customerDbList.guid,customerDbList.dataSourceClassName,customerDbList.dataSourceUser,customerDbList.dataSourcePassword,customerDbList.dataSourceDataBaseName,customerDbList.dataSourcePortNumber,customerDbList.dataSourceServerName,customerDbList.remark,customerDbList.dbTypeNum,customerDbList.isActive,customerDbList.createTime];
    HubDb.mysqlParameter.common.callBack = function (err, success, insertId) {
      
        if(err)
        {
              console.dir(err);  
              return false;
        }else
        {
          if(insertId!=undefined){
             if(success){
                console.log(success,"--customerDbList is inserted successfully!");
                return true;
             }else{
                return false;
             }
          }

        }
      
    };
    HubDb.add();
};

CrystalClusterInfoRecord.prototype.customerDbListUpdate=function(customerDbList){
    HubDb.dbType = 'mysql';
    HubDb.mysqlParameter.common.sql ="update customerDbList set dataSourceClassName=?,dataSourceUser=?,dataSourcePassword=?,dataSourceDataBaseName=?,dataSourcePortNumber=?,dataSourceServerName=?,remark=?,dbTypeNum=?,isActive=? where guid=?";
    HubDb.mysqlParameter.common.params = [customerDbList.dataSourceClassName,customerDbList.dataSourceUser,customerDbList.dataSourcePassword,customerDbList.dataSourceDataBaseName,customerDbList.dataSourcePortNumber,customerDbList.dataSourceServerName,customerDbList.remark,customerDbList.dbTypeNum,customerDbList.isActive,customerDbList.guid];
    HubDb.mysqlParameter.common.callBack = function (err, success, affectedRows)
    {
        if (err) {
            console.dir(err);  
            return false;
        }else
        {
            if(success){
                console.log(success,"--customerDbList is updated successfully!");
                return true;
            }else{
                return false;
            }
        }
    };
    HubDb.update();
};

CrystalClusterInfoRecord.prototype.customerDbListSelect=function(topNumber,whereSql,params,orderBySql,callBack){
    
    HubDb.dbType = 'mysql';    
    HubDb.mysqlParameter.select.tableName='customerDbList';
    HubDb.mysqlParameter.select.topNumber=topNumber;
    HubDb.mysqlParameter.select.whereSql=whereSql;
    HubDb.mysqlParameter.select.params=params;
    HubDb.mysqlParameter.select.orderSql=orderBySql;
    HubDb.mysqlParameter.select.callBack=function(err, rows)
    {
         console.log('Begin to customerDbListSelect from current node db');
         if(err)
         {
            console.log('Failed to customerDbListSelect from current node db');  
            callBack(undefined);
         }
         else
         {
            callBack(rows);
           
         }
    };
    HubDb.select();
};



module.exports = CrystalClusterInfoRecord;