var wifi = require('pi-wifi');

wifi.check('p2p-dev-wlan0', (err, result)=>{
	if(err){
		return console.error(err.message);
	}
	console.log(result);
});

/*wifi.setCurrentInterface('p2p-dev-wlan0', (err)=>{
	if(err){
		return console.error(err.message);
	}else{
		wifi.scan((err, networks)=>{
			if(err){
				return console.error(err.message);
			}else{
				console.log(networks);
			}
		});
	}
});
*/

var networkDetails = {
	ssid : 'KWN_413',
	username : 'ava_app',
	password : '',
}


wifi.connectOpen('KWN_413', (err)=>{
	if(err){
		return console.error(err.message);
	}else{
		console.log('connected OK!');
	}
});
/*
wifi.connect('islab', '20460629', (err)=>{
	if(err){
		return console.error(err.message);
	}else{
		console.log('Connected!!');
	}
});
*/
