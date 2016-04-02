exports.getSessionData = function(req, res) {

	var json_response;

	if (typeof req.session.username !== 'undefined') {
		console.log("Session data"+req.session.username);
		json_response = {
			"statusCode" : 200,
			"username" : req.session.username
		};
		res.render('homepage');
	} else {
		json_response = {
			"statusCode" : 401
		};
		res.send(json_response);
	}
};