var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./service.conf.json'));

var data = {
};

if (config.service && config.service.username && config.service.password){
  config.service.auth = "Basic " + new Buffer(config.service.username + ":" + config.service.password).toString('base64');
  delete config.service.username;
  delete config.service.password;
  fs.writeFileSync("./service.conf.json",JSON.stringify(config,null,2));
}

if (config.service 
  && config.service.instance 
  && config.service.auth
  && config.service.instance !== '' 
  && config.service.auth !== ''){

  // build the proxy file...
  data = {
    "/api": {
      "target": "https://" + config.service.instance,
      "logLevel": "info",
      "secure": false,
      "headers": {
        "Host": config.service.instance,
        "authorization": config.service.auth
      }
    }
  };

}


fs.writeFileSync("./proxy.conf.json",JSON.stringify(data,null,2));
