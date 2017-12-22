/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  
Create: function(req, res) {

Event.create(req.params.all()).exec(function (err, finn){
  if (err) { return res.serverError(err); }


  return res.ok();
});


  },
};

