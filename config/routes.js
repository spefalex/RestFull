/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

'POST /Matcher/Offre': 'UtilisateursController.matcherOffre',
'POST /News/Tags': 'UtilisateursController.NewTags',
'POST /utilisateurs/Inscrire': 'UtilisateursController.create',
'GET /testTag': 'UtilisateursController.findTags',
'POST /institutions/Inscrire': 'InstitutionsController.createInstitution',
'POST /Sauvegarder/Offre': 'UtilisateursController.sauvegarderOffre', 
'POST /Sauvegarder/Formation': 'UtilisateursController.sauvegarderFormation',
'POST /Sauvegarder/Evenements': 'UtilisateursController.sauvegardeEvenement',
'POST /Participe/Formation': 'UtilisateursController.participeFormation',
'POST /Ignorer/Offre': 'UtilisateursController.ignorerOffre',
'POST /Envoye/Message' : 'UtilisateursController.insertMessage',
'POST /Ignorer/Formation': 'UtilisateursController.ignorerFormation',
'POST /Ignorer/Evenement': 'UtilisateursController.ignorerEvenement',
'POST /demande/rencontre': 'UtilisateursController.demandeRencontre',
'POST /accepte/rencontre': 'UtilisateursController.accepteRencontre',
'POST /Ignorer/Rencontre': 'UtilisateursController.ignorerRencontre',
'POST /Nouveau/Offre': 'InstitutionsController.createOffre',
'POST /Nouveau/Evenement': 'InstitutionsController.createEvenement',
'POST /Nouveau/Formation': 'InstitutionsController.createFormation',
'POST /Matcher/Evenement': 'UtilisateursController.matcherEvenement',
'POST /testtest': 'UtilisateursController.insertTest',
'GET /lireTags': 'UtilisateursController.findTag', 
'GET /lireUtilisateurs/Interesser': 'UtilisateursController.lireUtilisateursInteresser', 
'GET /lireContact/Utilisateurs': 'UtilisateursController.lireContact', 
'GET /lire/Utlisateurs': 'UtilisateursController.findAll', 
'GET /supprimer/Offre': 'InstitutionsController.supprimerOffreInstitutions',
'GET /supprimer/Evenements': 'InstitutionsController.supprimerEvenementsInstitutions',
'GET /supprimer/Formations': 'InstitutionsController.supprimerFormationInstitutions',
'GET /LireEmploie/Matcher': 'UtilisateursController.lireEmploiMatcher',
'GET /LireEmploie/Sauvegarder': 'UtilisateursController.lireEmploiSauvegarder',
'GET /LireEvenement/Matcher': 'UtilisateursController.lireEvenementsMatcher',
'GET /LireEvenement/Sauvegarder': 'UtilisateursController.lireEvenementsSauvegarder',
'GET /LireFormation/Sauvegarder': 'UtilisateursController.lireFormationSauvegarder',
'GET /all': 'UtilisateursController.findUSER',
'POST /CreateEvent': 'EventController.create',
'GET /lireOffre': 'InstitutionsController.findOffre',
'GET /lireEvents': 'InstitutionsController.findEvenements',
'GET /lireFormations': 'InstitutionsController.findFormations',
'GET /lireinformation/Utilisateur': 'InstitutionsController.findUtilisateurs',
'GET /Informations/Institution': 'InstitutionsController.findInfoInstitutions',
'GET /Filtre': 'UtilisateursController.FiltreAcceuil',
'POST /Filtre/Emplois': 'UtilisateursController.FiltreEmploie',
'POST /Avis/Institution': 'InstitutionsController.AvisInstitutions',
 'GET /read/Avis': 'InstitutionsController.readAvis',
 'GET /read/Avis/Info': 'InstitutionsController.readAvisInfo',

  'POST /read/Convsa': 'UtilisateursController.findConversation',

'GET /photo': 'UtilisateursController.findPhoto',
'GET /photo2': 'UtilisateursController.findPhoto2',
'POST /pet': 'PetController.insertPet',
'POST /insert': 'PetController.insertUser',
//'POST /readpet': 'PetController.FindPet',
'PUT /miseAjour/Offre': 'InstitutionsController.modifierOffreInstituions',
'PUT /miseAjour/Evenements': 'InstitutionsController.modifierEvenementsInstitutions',
'PUT /miseAjour/Formations': 'InstitutionsController.modifierFormationsInstitutions',

'GET /lire/Offre': 'InstitutionsController.readAllOffreInstitutions',
'GET /lire/Offre/institutions': 'InstitutionsController.readOffreInstitutions',
'POST /postule/offre': 'InstitutionsController.postuleOffre',
'GET /find': 'UtilisateursController.findAll',

'POST /Log': 'AuthController.index',
'POST /Login/Institution': 'AuthInstitutionController.index',
'POST /Log/Confirmation': 'AuthController.Confirmation',


'GET /Acceuil/Utilisateur': 'UtilisateursController.AcceuilUtilisateur',
'GET /Informations/Utilisateur': 'UtilisateursController.InformationUtilisateur',
'GET /Acceuils/Utilisateurs': 'UtilisateursController.AcceuilsUtilisateur',
'GET /Acceuils/Evenements': 'UtilisateursController.AcceuilsEvenements',
'GET /Acceuils/Formations': 'UtilisateursController.AcceuilsFormations', 
'GET /Acceuils/Rencontre': 'UtilisateursController.AcceuilsRencontre',



};
