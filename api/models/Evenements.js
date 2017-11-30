/**
 * Entreprise.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	nomEvenement: {type:'string'},
  	photoEvenement: {type:'array'},
  	lieuEvenement: {type:'string'},
  	ville: {type:'string'},
  	dateDebut: {type:'date'},
  	dateFin: {type:'date'},
  	heureDebut: {type:'string'},
  	heureFin: {type:'string'},
  	categorieEvenement: {type:'string'},
  	detailsEvenement: {type:'string'},
  	tagsEvenement: {type:'string'},
  	idInstitution: {type:'string'},
  	idEvenement: {type:'string'},
  	nomInstitution: {type:'string'},
},

};

