exports.getName=function(req,res){
	var json_responses;
	if (typeof req.session.username !== 'undefined')
	{
			json_responses = {"statusCode" : 200,"username" :req.session.username};
			res.send(json_responses);
			//console.log("Sent");
	}
	else 
	{
		json_responses = {
			"statusCode" : 401
		};
	}
};