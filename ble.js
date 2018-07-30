var bleno = require('bleno');
var util = require('util');

var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacter = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

var GetIPCharacter = function(){
	GetIPCharacter.super_.call(this, {
		uuid : "fffffffffffffffffffffffffffffff1",
		properties: ['read', 'write', 'notify'],
		descriptors:[
			new BlenoDescriptor({
				uuid : 'ffffffffffffffffffffffffffffff01',
				value : 'Now IP is : 192.89.9.127'
			}),
			new BlenoDescriptor({
				uuid : 'ffffffffffffffffffffffffffffff02',
				value : new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00])
			})
		]
	});

	this._value = Buffer(0);
	this._updateValueCallback = null;
};

util.inherits(GetIPCharacter, BlenoCharacter);

GetIPCharacter.prototype.onReadRequest = function(offset, callback){
	console.log('Get IP Character Method : Read\n');
	console.log('Offset : ' + offset +'\n');
	console.log('Value : ' + this._value.toString('hex')+'\n');

	callback(this.RESULT_SUCCESS, this._value);
};

GetIPCharacter.prototype.onWriteRequest = function(data, offset, withoutResponse, callback){
	this._value = data;
	console.log('Get IP Character Method : Write\n');
	console.log('Offset : '+ offset+'\n');
	console.log('Value : ' + this._value+'\n');
	console.log('Hex Value : '+ this._value.toString('hex')+'\n');
	if(this._updateValueCallback){
		console.log('Get IP Character Notification!! -- onWrite\n');
		this._updateValueCallback(this._value);
	}

	callback(this.RESULT_SUCCESS);
};

GetIPCharacter.prototype.onSubScribe = function(maxValueSize, updateValueCallback){
	console.log('Get IP Character Method : SubScribe\n');
	this._updateValueCallback = updateValueCallback;
};

GetIPCharacter.prototype.onUnsubscribe = function(){
	console.log('Get IP Character Method : UnSubScribe\n');
	this._updateValueCallback = null;
};

bleno.on('stateChange', function(state){
	console.log('Bleno Server On\n');
	console.log('State : ' + state);

	if(state === 'poweredOn'){
		bleno.startAdvertising('raspberry-AVA', ['fffffffffffffffffffffffffffffff0']);
	}else{
		bleno.stopAdvertising();
	}
});

bleno.on('advertisingStart', function(err){
	console.log('Advertising...\n');
	console.log('state : '+(err ? 'Error : ' + err : 'Success!!') +'\n');
	if(!err){
		bleno.setServices([
			new BlenoPrimaryService({
				uuid : 'fffffffffffffffffffffffffffffff0',
				characteristics : [
					new GetIPCharacter()
				]
			})
		]);
	}
});
