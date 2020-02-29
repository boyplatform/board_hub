'use strict'
var BoyHubValidation=require('../src/boyHubValidation');
var boyHubValidationObj=new BoyHubValidation();
var InodeCahce=require("../coreLibs/iNodeCache");
const BoyHubHttpHelper=require('../src/boyHubHttpHelper');
var conf = require("../src/config");
var boyHubCommon=require('../src/boyHubCommon');

 //board SIbridge objects
var MemTalker=require("../SIBridge/MemTalker");
var IOTalker=require("../SIBridge/IOTalker");
var MessageQueueTalker=require("../SIBridge/MessageQueueTalker");

function BoyHubCommandParser(){

  //this.memoryNodeCache=memoryNodeCache;
  //this.memoryNodeCache.setConn({});
  //board SIbridge objects
  this.memTalker=new MemTalker();
  this.ioTalker=new IOTalker();
  this.messageQueueTalker=new MessageQueueTalker();


}; 

BoyHubCommandParser.prototype.constructor=BoyHubCommandParser;
BoyHubCommandParser.prototype.cmdParseAndExecution=function(memoryNodeCache,jsonBody,callback){
    
    switch(jsonBody.type.toString()){
        //for aes256 
         
        case 'encryption':
        //2.1.hub生成随机密钥key和随机aes256数，分别在被请求节点和Hub unit的其它节点缓存为KV map
           switch(jsonBody.cmd.toString()){
             case 'getRandomCondition':
              var result={encryptionKey:null,encryptionTimes:null};
             
                  let uuid=boyHubCommon.replaceAll("-","",boyHubCommon.getUUID()).trim();
                  result.encryptionKey=uuid.substring(uuid.length-16,uuid.length).trim();
                  result.encryptionTimes=boyHubCommon.GetRandomNum(1,5);
                  //当前节点缓存aes key，value
                  memoryNodeCache.get(result.encryptionKey,function(err,value){
                    if(err){
                        console.log(err);
                       
                    }
                    else if (value===undefined||value===null||value===""){
                       memoryNodeCache.set(result.encryptionKey.trim(),result.encryptionTimes,{ttl:conf.platformArch.encryptionKeyTtl},function(err,ok){
                            if(err){
                                console.log("NodeCacheOperator error:",err);
                                
                            }
                            if(ok==="OK"){
                                
                            
                                console.log("aes key & times has been stored under local node successfully:",result.encryptionKey.trim());
                            }
                        }.bind(this));
                        
                    }
                  }.bind(this));
                  //访问unit集群节点缓存aes key value
                  for(let ip in conf.platformArch.unitCluster){
                    if(boyHubCommon.whetherUnitNodeItem(ip))
                    {
                          if(conf.platformArch.unitCluster[ip].toString().split(':')[0]!==boyHubCommon.getCurrentServerIpAdress().trim())
                          {
                              var domainUrl=conf.platformArch.unitCluster[ip];
                              var partialUrl="/securityCacheReceiver";
                              var qs=""
                              var timeout=conf.platformArch.defaultHttpReqTimeOut;
                              var body={
                                        'encryptionKey':result.encryptionKey.trim(),
                                        'encryptionTimes':result.encryptionTimes
                                        };
                              BoyHubHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.unitCluster.httpDefaultMode,domainUrl,partialUrl,qs,body,timeout,function(result){
                                          console.log(result);
                              });
                          }
                             
                    }
                 }
                  callback(result);
              break;
           }
           break;
       
        case 'op':
                   //for op
                     //5.按照约定格式解析CMD命令；按照密钥从本节点缓存中获取aes256随机加密数；按照不同的targetUnit向不同的board unit通过messageQueue或直接发送正式操作请求[memTalker,IOTalker]。
              switch(jsonBody.targetUnit.toString()){
                  case 'memory':
                  this.memTalker.talkToMemory(memoryNodeCache,jsonBody,function(result){
                      console.log('visited memory and get result:',result);
                      callback(result);
                  })
                    break;
                  case 'messageQueue':
                  this.messageQueueTalker.talkToMessageQueue(memoryNodeCache,jsonBody,function(result){
                    console.log('visited messageQueue and get result:',result);
                     callback(result);
                  })
                    break;
                  case 'diskfile':
                  this.ioTalker.talkToDiskfile(memoryNodeCache,jsonBody,function(result){
                    console.log('visited diskfile and get result:',result);
                     callback(result);
                  })
                    break;
                   
              }
           break;
     }
}
 


module.exports = BoyHubCommandParser;