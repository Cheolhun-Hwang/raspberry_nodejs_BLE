var wifi_conf = require('rpi-wifi-connection');
var wifi = new wifi_conf();


wifi.connect({ssid : 'islab', psk:'20460629'}).then(()=>{
	console.log('conneted!!');
}).catch((err)=>{
	console.log(err);
});

wifi.scan().then((ssids)=>{
	console.log(ssids);
}).catch((err)=>{
	console.log(err);
});


wifi.getStatus().then((_status)=>{
	console.log(_status);
}).catch((err)=>{
	console.log(err);
});

