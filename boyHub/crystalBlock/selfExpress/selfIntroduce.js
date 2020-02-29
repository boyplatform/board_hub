var os=require('os');
var boyHubCommon=require('../../src/boyHubCommon');
const BoyHubHttpHelper=require('../../src/boyHubHttpHelper');
var conf = require("../../src/config");



//获取节点OS信息
var getNodeOSInfo=function(){

    var rs={
      cpuArch:os.arch(),
      cpuInfo:os.cpus(),
      freemem:os.freemem(),
      hostName:os.hostname(),
      loadAvg:os.loadavg(),
      networkInterface:os.networkInterfaces(),
      platformtype:os.platform(),
      platformVersion:os.release(),
      osTempDir:os.tmpdir(),
      totalMemory:os.totalmem(),
      osType:os.type(),
      nodeNormalRunedTime:os.uptime()

    };

    return rs;

}

//获取节点内存
var getCurrentNodeMem=function(){

    var mem=process.memoryUsage();
    var format=function(bytes){

        return (bytes/1024/1024).toFixed(2);
    };//format to MB
    var rs={
        totalHeap:format(mem.heapTotal),
        usedHeap:format(mem.heapUsed),
        totalForCurrentProcess:format(mem.rss),
        totalOnV8EngineUsing:format(mem.external),
        usedMemRate:((format(mem.heapUsed)/format(mem.heapTotal)).toFixed(2))

    };

    return rs;
}

//获取节点电池信息
var getCurrentNodeBattery=function(){
    let battery=new Navigator().battery||new Navigator().webkitBattery||new Navigator().mozBattery;
    var rs={
        isPlugin:battery.charging,
        batteryLevel:battery.level,
        batteryUsedTime:battery.dischargingTime
    };

    return rs;    
}

//获取crystal cluster中所有节点的性能信息
var getCurrentCrystalCluster=async function(resp,httpMode,infoType){
   
    let Rs={};
    
    for(let ip in conf.platformArch.crystalCluster){
        if(boyHubCommon.whetherCrystalNodeItem(ip))
         {
            var domainUrl=conf.platformArch.crystalCluster[ip];
            var partialUrl="/readMe";
            var qs=""
            var timeout=conf.platformArch.defaultHttpReqTimeOut;
            var body={
                        'type':infoType  
                    };
            let res=await BoyHubHttpHelper.apiSimpleRequest(httpMode,domainUrl,partialUrl,qs,body,timeout);
            Rs[ip]=res;
         }
    }
    //console.log(Rs);
    resp.end(JSON.stringify(Rs));
  
 }

var getCurrentUnitCluster=async function(resp,httpMode,infoType){
   
    let Rs={};
    
    for(let ip in conf.platformArch.unitCluster){
       if(boyHubCommon.whetherUnitNodeItem(ip))
       {
               var domainUrl=conf.platformArch.unitCluster[ip];
               var partialUrl="/readMe";
               var qs=""
               var timeout=conf.platformArch.defaultHttpReqTimeOut;
               var body={
                         'type':infoType  
                         };
               let res=await BoyHubHttpHelper.apiSimpleRequest(httpMode,domainUrl,partialUrl,qs,body,timeout);
               Rs[ip]=res;
       }
    }
    //console.log(Rs);
    resp.end(JSON.stringify(Rs));
  
  }

 exports.getNodeOSInfo=getNodeOSInfo;
 exports.getCurrentNodeMem=getCurrentNodeMem;
 exports.getCurrentNodeBattery=getCurrentNodeBattery;
 exports.getCurrentCrystalCluster=getCurrentCrystalCluster;
 exports.getCurrentUnitCluster=getCurrentUnitCluster;