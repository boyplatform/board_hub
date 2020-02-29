'use strict'
var conf=require("../src/config");
var boyHubCommon=require('../src/boyHubCommon');
const BoyHubHttpHelper=require('../src/boyHubHttpHelper');

function MessageQueueTalker(){

 
  
  }; 

MessageQueueTalker.prototype.constructor=MessageQueueTalker;
MessageQueueTalker.prototype.talkToMessageQueue=function(memoryNodeCache,jsonBody,callback){

      let result={res:null,desc:""};
      //从本节点获取对应aes key的加密次数
      memoryNodeCache.get(jsonBody.encryptionKey,function(err,value){
            if(err){
                console.log(err);
            }
            if(value!==undefined&&typeof value==="number"){
                  //按照加密次数对报文cmd进行aes解密
                  boyHubCommon.aes256Decryption(jsonBody.encryptionKey,value,jsonBody.cmd,function(cmdText){
                       
                        console.log('get decryption cmd:',cmdText);
                         //将解密后的报文发送至board MessageQueue节点
                         var domainUrl=conf.platformArch.messageQueueInfo.url;
                         var partialUrl="/";
                         var qs=""
                         var timeout=conf.platformArch.defaultHttpReqTimeOut;
                          
                         BoyHubHttpHelper.apiSimpleRequestWithCallBack(conf.platformArch.messageQueueInfo.httpDefaultMode,domainUrl,partialUrl,qs,JSON.parse(cmdText),timeout,function(rs){
                              //返回结果到callback    
                              callback(rs);
                         });  
                  });
                
            }else{
                //返回结果到callback 
                result.res=false;
                result.desc="get security key failed on your requested node for board-MessageQueue,please try again.";
                callback(result);
            }
          
      })
    

     

      
    
}





module.exports = MessageQueueTalker;