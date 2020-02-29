'use strict'
var validator=require('validator');
 
var boyHubCommon=require('./boyHubCommon');
var QueueValidator=(function(){
    
    
    
    
    return function() {
         
        this.InputValidator=function(body,router){
            
            let validatorResult=[];
            switch(router)
            {
               
              case '/readMe':
                //结构验证
                if(body.type===undefined)
                {
                    validatorResult.push({RequestResponseId:boyHubCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    validatorResult.push({Result:true});
                }
                break;
              case '/hubEntry':
                if(body.type===undefined||body.cmd===undefined)
                {
                    validatorResult.push({RequestResponseId:boyHubCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                    if(body.type==="encryption"&&body.cmd==="getEncryptionString"&&(body.encryptionTimes===undefined||body.encryptionKey===undefined)){
                       
                        validatorResult.push({RequestResponseId:boyHubCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})

                    }
                    validatorResult.push({Result:true});
                }
                break;
              case '/securityCacheReceiver':
                if(body.encryptionKey===undefined||body.encryptionTimes===undefined)
                {
                    validatorResult.push({RequestResponseId:boyHubCommon.getUUID(),Result:false,Description:'报文结构错误,请检查核对!'})
                }else{
                     if(typeof body.encryptionTimes!=="number"){
                        validatorResult.push({RequestResponseId:boyHubCommon.getUUID(),Result:false,Description:'报文数据类型错误,请检查核对!'})
                     }
                    validatorResult.push({Result:true});
                } 
                break;
            }

            return validatorResult[0];
        }


    
    }
})();

module.exports=QueueValidator;