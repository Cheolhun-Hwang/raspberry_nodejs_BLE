var bleno = require('bleno');
var util = require('util');

const name = 'AVA_raspberry_model';
const UUID = 'ffffffffffffffffffff000000000000';
var BlenoPrimaryService = bleno.PrimaryService;

var AuthCharacteristic = require('./ble-AuthCharacteristic.js');
var WifiCharacteristic = require('./ble-WifiCharacteristic.js');
var LEDCharacteristic = require('./ble-LEDCharacteristic.js');
var RadioCharacteristic = require('./ble-RadioCharacteristic.js');

function AvaService(){
	bleno.PrimaryService.call(this, {
		uuid : UUID,
		characteristics : [
			new AuthCharacteristic(),
			new WifiCharacteristic(),
			new LEDCharacteristic(),
			new RadioCharacteristic()
		]
	});
};

util.inherits(AvaService, BlenoPrimaryService);

bleno.on('stateChange', function(state){
	console.log('Ava Bleno Server On\n');
	console.log('State : ' + state);

	if(state === 'poweredOn'){
		bleno.startAdvertising(name, [UUID]);
	}else{
		bleno.stopAdvertising();
	}
});

bleno.on('advertisingStart', function(err){
	console.log('Advertising...\n');
	console.log('state : '+(err ? 'Error : ' + err : 'Success!!') +'\n');
	if(!err){
		bleno.setServices([
			new AvaService()
		]);
	}
});
