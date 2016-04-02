var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fblogin";
function handle_searchrequest(msg, callback){
	var res = {};
	console.log("In handle search request:"+msg.firstname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fblogin');
	coll.find({"firstname":{$ne:msg.firstname}},{firstname:1, _id:0}).toArray(function(err, user){
			if (user)
			{
				var list=[];
				res.code = "200";
				res.value = "Success search";
				for(var i=0;i<user.length;i++)
				{
					list[i]=user[i].firstname;
				}
				res.list=list;
			} 
			else
			{
				res.code = "401";
				res.value = "Failed search";
			}
			callback(null, res);
		});
});	
}
exports.handle_searchrequest = handle_searchrequest;