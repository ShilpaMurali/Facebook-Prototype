var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.search=function(req,res){
	var json_responses={};
	var firstname=req.session.username,code,value;
	console.log("In handle search request:"+firstname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fblogin');
	coll.find({"firstname":{$ne:firstname}},{firstname:1, _id:0}).toArray(function(err, user){
			if (user)
			{
				var list=[];
				code = "200";
				value = "Success search";
				for(var i=0;i<user.length;i++)
				{
					list[i]=user[i].firstname;
				}
				listFInal=list;
				json_responses={"statusCode":code,"list":listFInal};
				res.send(json_responses);
			} 
			else
			{
				code = "401";
				value = "Failed search";
				json_responses={"statusCode":code};
				res.send(json_responses);
			}
		});
	});	
};
