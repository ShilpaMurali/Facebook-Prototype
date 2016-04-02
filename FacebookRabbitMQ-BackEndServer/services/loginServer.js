var mongo = require("./mongo");
var bcrypt = require('bcrypt-nodejs');
var mongoURL = "mongodb://localhost:27017/fblogin";
function handle_signinrequest(msg, callback){
	var res = {};
	console.log("In handle request:"+ msg.email);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fblogin');
	coll.findOne({email: msg.email}, function(err, user){
		if (user)
		{
			if(bcrypt.compareSync(msg.password,user.password))
			{
				console.log(user.password);
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = "Success Login";
				console.log(user.firstname);
				res.session=user.firstname;
				console.log("Session"+res.session);
			} else
			{
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(null, res);
		}
	});
});	
}
function handle_signuprequest(msg, callback){
	var res = {};
	console.log("In handle request:"+ msg.email);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fblogin');
		coll.insert({email:msg.email,password:bcrypt.hashSync(msg.password, null, null),firstname:msg.firstname,lastname:msg.lastname},function(err,user)
		{
			res.code = "200";
			res.value = "Success Signup";
			res.session=msg.firstname;
			callback(null, res);
		});
	});
}
exports.handle_signinrequest = handle_signinrequest;
exports.handle_signuprequest = handle_signuprequest;
