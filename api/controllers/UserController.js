/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	



  Create: function(req, res) {

User.create(req.params.all()).exec(function (err, finn){
  if (err) { return res.serverError(err); }


  return res.ok();
});


  },

  New: function(req, res) {
  
  Event.findOne(
  req.params("evenementsMatcher")
).exec(function (err, event){
  if (err) {
    return res.serverError(err);
  }
  if (!finn) {
    return res.notFound('Could not find evet, sorry.');
  }

  return res.json(finn);
});
  },
};

