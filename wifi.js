var wifi = require('node-wifi');

var wifiList;

wifi.init({
	iface : null	//network interface, choose a random wifi interface if set to null
});

wifi.scan((err, networks)=>{
	if(err){
		console.log(err);
	}else{
		wifiList = networks;
		console.log(wifiList);
	}
});


