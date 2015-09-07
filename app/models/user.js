var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema=mongoose.Schema({
	users: {
		fullname:{ type: String,required: true },
        gender:{ type: String,required: true },
        typeOfUser:{ type: String,required: true },
        phno:{ type: Number, unique: true, required: true },
        email:{ type:String , unique: true, required: true },
		password:{ type:String,required: true },
        rePassword:{ type:String,required: true },
        address:{ type:String},
        proofOfPerson:{ type:String}
	}
	
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//
// checking if password is valid
userSchema.methods.validPassword = function(password,dbpassword) {
    return bcrypt.compareSync(password,dbpassword);
};
module.exports = mongoose.model('NormalUser',userSchema);