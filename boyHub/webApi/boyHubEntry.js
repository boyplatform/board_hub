//import section
var express= require('express');
var app=express();
var bodyParser = require('body-parser');
 

var BoyHubValidation=require('../src/boyHubValidation');
var boyHubValidationObj=new BoyHubValidation();
 

var boyHubCommon=require('../src/boyHubCommon');
var conf=require('../src/config.js');

var selfIntroduce=require('../crystalBlock/selfExpress/selfIntroduce');
var InodeCahce=require("../coreLibs/iNodeCache");
var memoryNodeCache=new InodeCahce("singleNodeCache");

var BoyHubCommandParser=require("../src/boyHubCommandParser");
 

//install midware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Programe Entry
var server=app.listen(8080,'0.0.0.0',function(){
      //internet模式下启动时初始化并缓存本机公网IP
      if(conf.platformArch.crystalCluster.CrystalClusterNetworkMode==="internet"){
         boyHubCommon.initCurrentServerPubIpAdress();
      }
     console.log('Intelligent boy-hub is running on current crystal node at:'+(new Date()).toLocaleString()," on IP:",boyHubCommon.getCurrentServerIpAdress().trim());
     memoryNodeCache.setConn({});
      
})


 



app.post('/hubEntry',async function(req,res){

      //入口参数验证
      let validationRs=await boyHubValidationObj.InputValidator(req.body,'/hubEntry');
      if(validationRs.Result===false){
         
            res.end(JSON.stringify(validationRs));
            return;
      }
      let jsonBody=req.body;  
       
      //1.从HUB的unitNode上获取随机密钥key和随机aes256次数 
      var boyHubCommandParser=new BoyHubCommandParser();
      
      boyHubCommandParser.cmdParseAndExecution(memoryNodeCache,jsonBody,function(result){
        
         //3.被请求的hub unit向cmd节点发送带有密钥key和aes256随机次数的响应。+//7.Hub获取到board回发的报文后转发给CMD，一个操作流完成。
         res.end(JSON.stringify(result));

      })
       
          

     
         

})

 //2.2.Hub unit的其它节点接收并缓存密钥与随机加密次数KV map
 app.post('/securityCacheReceiver',async function(req,res){

      //入口参数验证
      let validationRs=await boyHubValidationObj.InputValidator(req.body,'/securityCacheReceiver');
      if(validationRs.Result===false){
         
            res.end(JSON.stringify(validationRs));
            return;
      }

    
     
      memoryNodeCache.get(req.body.encryptionKey.trim(),function(err,value){
         if(err){
             console.log('pos1:',err);
            
         }
         else if (value===undefined||value===null||value===""){
                memoryNodeCache.set(req.body.encryptionKey.trim(),req.body.encryptionTimes,{ttl:conf.platformArch.encryptionKeyTtl},function(err,ok){
                 if(err){
                     console.log("NodeCacheOperator error:",err);
                     res.end(JSON.stringify({result:false}));
                 }
                 if(ok==="OK"){
                     
                     res.end(JSON.stringify({result:true}));
                     memoryNodeCache.get(req.body.encryptionKey.trim(),function(err,value){
                        if(err){
                           console.log('pos2:',err);
                           
                        }
                        console.log("aes key & times comes from other node has been stored under local node successfully:The key is--",req.body.encryptionKey.trim()," the value is:",value);
                     })
                     
                 }else{
                  res.end(JSON.stringify({result:false}));
                 }
             });
             
         }else{
                  res.end(JSON.stringify({result:true}));
                  memoryNodeCache.get(req.body.encryptionKey.trim(),function(err,value){
                     if(err){
                        console.log('pos2:',err);
                        
                     }
                     console.log("aes key & times comes from other node has been stored under local node successfully:The key is--",req.body.encryptionKey.trim()," the value is:",value);
                  })
         }
       });


 })
//readme api
app.post('/readMe',async function(req,res){
    
        //入口参数验证
       let validationRs=await boyHubValidationObj.InputValidator(req.body,'/readMe');
       if(validationRs.Result===false){
          
            res.end(JSON.stringify(validationRs));
            return;
       } 

       //进入执行入口
        let jsonBody=req.body; 
        switch(jsonBody.type.toString()){
             case 'osInfo':
                res.end(JSON.stringify(selfIntroduce.getNodeOSInfo()));
                break;
             case 'mem':
                res.end(JSON.stringify(selfIntroduce.getCurrentNodeMem()));
                break;
             case 'battery':
                res.end(JSON.stringify(selfIntroduce.getCurrentNodeBattery()));
                break;
             case 'crystalCluster':
             
               if(req.body.httpMode!=undefined){
                  selfIntroduce.getCurrentCrystalCluster(res,req.body.httpMode,req.body.infoType);
               }else{
                  selfIntroduce.getCurrentCrystalCluster(res,conf.platformArch.crystalCluster.httpDefaultMode,req.body.infoType);
               }
                break;
            case 'seekNodeSelectionVoteResult':
                 
                   crystalClusterCommonRules_interact.timelyNodeSelectionVoteResultSeek(function(rows){

                   res.end(JSON.stringify(rows));
                })
                break;
            case 'seekMasterNodeVoteResult':
                 
                   crystalClusterCommonRules_interact.seekMasterNodeVoteResult(function(row){

                   res.end(JSON.stringify(row));
                })
                break;
             default:
                res.end('Wrong Command type!Please double check your command.')
        }
   

})

 