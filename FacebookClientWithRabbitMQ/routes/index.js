
/*
 * GET home page.
 */

exports.index = function(req, res){
 if(req.session.username){
	 res.render('Header', { title: 'Express' });
 }
 else
  res.render('login', { title: 'Express' });
};
exports.partials=function(req,res){
	var filename = req.params.filename;
	if(!filename) return; // might want to change this
	res.render("partials/" + filename );

};
