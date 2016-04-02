var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.search=function(req,res){
	var json_responses;
	var i,cnt=0;
	var msg_payload={"firstname":req.session.username};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('search_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"list" :results.list};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Search");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};