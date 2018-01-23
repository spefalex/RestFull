/**
 * EntrepriseController
 *
 * @description :: Server-side logic for managing Entreprises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mailer = require("nodemailer");
var twilio = require("twilio");
var smtpTransport = mailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "keymada17@gmail.com",
    pass: "keymada1234"
  }
});

var express = require("express");
var app = express();
var server = require("http").Server(app);

var server= app.listen(4444);
var io = require('socket.io').listen(server);


var moment = require("moment");

module.exports = {



  /**
   * `EntrepriseController.create()`
   */
  createInstitution: function(req, res) {

    let nom = req.param("nom"),

      motDePasse = req.param("motDePasse"),
      localisation = req.param("localisation"),
      adresse = req.param("adresse"),
      ville = req.param("ville"),
    
      presentation = req.param("presentation"),
      dateCreation = req.param("dateCreation"),
      nombreSalarie = req.param("nombreSalarie"),
      domaine = req.param("domaine"),
      logo = req.param("logo"),
      code = req.param("code"),

      telephone = req.param("telephone"),
      email = req.param("email"),
      idUtilisateurAvis = req.param("idUtilisateurAvis"),
      nomUtlisateurAvis = req.param("nomUtlisateurAvis"),
      commentaireAvis = req.param("commentaireAvis"),
      noteAvis = req.param("noteAvis"),
      idEvenement = req.param("idEvenement"),
      siteWeb = req.param("siteWeb"),
      photoUtilisateurAvis = req.param("photoUtilisateur"),
      datePublicationAvis = req.param("datePublicationAvis"),
      typeEtablisment = req.param("typeEtablisment"),
      idUtilisateurAbonnes = req.param("idUtilisateurAbonnes");
      idUtilisateurAvis = req.param("idUtilisateurAvis"),
    Institutions.count({
      email: email
    }).exec(function countCB(error, found) {

      Institutions.find({
        telephone: telephone
      }).exec(function(err, phone) {

        var verifPhone = phone.length;


        var verifMail = +found;
        console.log(found);



        if (verifMail == 1 && verifPhone == 0) {
          res.header("Access-Control-Allow-Origin", "*");
          res.json({
            message: "Adresse e-maiL déjà éxiste"
          });

        } else if (verifMail == 0 && verifPhone == 1) {
          res.json({
            message: "numero mobile déjà existé"
          });
        } else if (verifMail == 1 && verifPhone == 1) {
          res.json({
            message: "adresseMail et numero Mobile déjà éxisté"
          });
        } else {
          Institutions.create({
            logo: logo,
            nom: nom,
            presentation: presentation,
            localisationInstitution: [{

              ville: ville,
              adresse: adresse,
            }],
            dateCreation:dateCreation,
            nombreSalarie: nombreSalarie,
            
            email: email,
            motDePasse: motDePasse,
            siteWeb:siteWeb,
            telephone: telephone,
            Identifiant: [email, telephone],
            domaine: domaine,
            code: code,
            statusCompte: "VALID",

            typeEtablisment: typeEtablisment,
            avisInsitutions: [{
              idUtilisateurAvis: idUtilisateurAvis,
              photoUtilisateurAvis:photoUtilisateurAvis,
              nomUtlisateurAvis: nomUtlisateurAvis,
              commentaireAvis: commentaireAvis,
              noteAvis: noteAvis,
              datePublicationAvis:datePublicationAvis
            }],

          

          }).exec(function(err, institution) {
            if (err) {
              return res.serverError(err);
            }

            function randomString(length, chars) {
              var result = "";
              for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
              return result;
            }


            var code = Math.floor(1000 + Math.random() * 9000);
            console.log(code);

            institution.code = code;
            institution.save();

            var mail = {
              from: "keymada17@gmail.com",
              to: email,
              subject: "Code de confirmation pour votre compte institutions KeyMada",
              html: "<p> Voici votre code : " + code + "</p>"
            };

            res.header("Access-Control-Allow-Origin", "*");

            smtpTransport.sendMail(mail, function(error, response) {
              if (error) {
                console.log("Erreur lors de l'envoie du mail!");
                console.log(error);
                res.json({
                  message: "Erreur lors de l'envoie du mail,veuillez le ressayer"
                });
              } else {

                console.log("Mail envoyé avec succès!");
                res.json({
                  message: "email de confirmation"
                });
              }
              smtpTransport.close();
            });

            // res.json({ message: 'OK'});
          });


        }
      });
    }); //Fin fct count

  },

  //publier offre

  createOffre: function(req, res) {


    let

    tags = req.param("tags").replace(/\s/g, "").split(",");
    typeContrat = req.param("typeContrat"),
    titreEmploi = req.param("titreEmploi"),
    description = req.param("description"),
    id = req.param("id"); // identificateur institutions Obect Id
    profilsRequis = req.param("profilsRequis"),
    idUtilisateurSauvegarder = req.param("idUtilisateurSauvegarder"),
domaine = req.param('domaine'),
    idUtilisateurPostuler = req.param("idUtilisateurPostuler");
    cv = req.param("cv");
    lm = req.param("lm");
    dateLimite = req.param("dateLimite");

    Institutions.findOne({
      id: id
    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }
      
      var name = institution.nom;
      var logo = institution.logo;
      var localisation = institution.localisationInstitution;
       var adresse = institution.localisationInstitution[0].adresse;

       console.log(adresse)
     


      institution.save(function(err) {});

      Emploies.create({

        nomInstitution: name,
        statusEmploi: "TRUE",
        titreEmploi: titreEmploi,
        description:description,
        logo:logo,
        typeContrat: typeContrat,
        profilsRequis: profilsRequis,
        domaine: domaine,
        tagsEmploi: tags,
        dateLimite: dateLimite,
        idInstitution: id,
        adresse:localisation,
        postuler: [{

          idUtilisateurPostuler: idUtilisateurPostuler,
          cv: cv,


        }],

        sauvegardeEmploi:[{
            idUtilisateurSauvegarder: idUtilisateurSauvegarder

        }]


      }).exec(function(err, Emploie) {
        if (err) {
          return res.serverError(err);
        }

        
      });

      io.emit('server-send', "news");
      res.json({
        message: "Bien ajouter :) "
      });
    });

  },


  //publier événement
  createEvenement: function(req, res) {


    let

      tags = req.param("tags").replace(/\s/g, "").split(","),
      photoEvenement = req.param("photoEvenement").replace(/\s/g, "").split(","),
      nomEvenement = req.param("nomEvenement"),
     
      lieuEvenement = req.param("lieuEvenement"),
      detailsEvenement = req.param("detailsEvenement"),
      dateDebut = req.param("dateDebut"),
      genreEvenement = req.param("genreEvenement"),
      dateFin = req.param("dateFin"),
      heureDebut = req.param("heureDebut"),
      categorieEvenement = req.param("categorieEvenement"),
      heureFin = req.param("heureFin"),
      idUtilisateurParticipant = req.param("idUtilisateurParticipant"),
      idUtilisateurSauvegarder = req.param("idUtilisateurSauvegarder"),
      id = req.param("id"); // identificateur institutions Obect Id



    Institutions.findOne({
      id: id
    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find this institution, sorry.");
      }
     
     console.log(institution)
     var name = institution.nom;
      var ville = institution.localisationInstitution[0].ville;
      var adresse = institution.localisationInstitution[0].adresse;

     


      Evenements.create({
        idInstitution: id,
        nomInstitution: name,
        
        nomEvenement: nomEvenement,
        photoEvenement: photoEvenement,
        lieuEvenement: lieuEvenement,
        villeInsitution: ville,
        dateDebut:dateDebut,
        dateFin:dateFin,
        heureDebut:heureDebut,
        heureFin:heureFin,
        categorieEvenement:categorieEvenement,
        genreEvenement: genreEvenement, // payant ou gratuit
        detailsEvenement: detailsEvenement,
        
        adresse: adresse,
        tagsEvenements: tags,
        
        statusEvenements: "TRUE",
        
        participant: [{

          idUtilisateurParticipant: idUtilisateurParticipant,

        }],
        
        sauvegardeEvenement: [{

          idUtilisateurSauvegarder: idUtilisateurSauvegarder,

        }]
        

      }).exec(function(err, Emploie) {
        if (err) {
          return res.serverError(err);
        }

        console.log("OK");
      });
      res.json({
        message: "Bien ajouter :) "
      });
    });

  },
  //utilisateur poster offre
  postuleOffre: function(req, res) {


    let

      idUtilisateurPostule = req.param("idUtilisateurPostule"),
      cv = req.param("cv"),
      id = req.param("id"); // identificateur emploie à postuler Object Id 


    Emploies.findOne({
      id: id
    }).exec(function(err, emploie) {
      if (err) {
        return res.serverError(err);
      }
      if (!emploie) {
        return res.notFound("Could not find Finn, sorry.");
      }


      Utilisateurs.findOne({
        id: idUtilisateurPostule
      }).exec(function(err, utilisateur) {
        if (err) {
          return res.serverError(err);
        }
        if (!utilisateur) {
          return res.notFound("Could not find Finn, sorry.");
        }

        var verif = utilisateur.emploieMatch.filter(function(value) {
          return value.idEmploieMatch == id;
        });

        console.log(verif.length);

        var out = verif.length;

        if (out == 0) {

          utilisateur.emploieMatch.push({
            idEmploieMatch: id
          });

          utilisateur.save(function(err) {});


          emploie.Postuler.push({
            idUtilisateurPostule: idUtilisateurPostule,
            cv: cv
          });

          emploie.save(function(err) {});

          console.log(emploie);
          res.json({
            message: "bien ENREGISTRER"
          });

        } else


          res.json({
          message: "Vous avez déjà postuler sur cette offre"
        });

      });

    });

  },


  //Mofidication contenu offre

  modifierOffreInstituions: function(req, res) {

    let
      titreEmploi = req.param("titreEmploi"),

      idInstitution = req.param("idInstitution"),

      typeContrat = req.param("typeContrat"),
      idOffreEmploie = req.param("idOffreEmploie"), // obejctId emploie 
      dateLimite= req.param("dateLimite"),
      description= req.param("description"),

      tags = req.param("tags").replace(/\s/g, "").split(","),

      profilsRequis = req.param("profilsRequis");

    Emploies.find({ id: idOffreEmploie
    }).exec(function(err, emploie) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

      

      emploie[0].titreEmploi = titreEmploi;
      emploie[0].tagsEmploi = tags;
      emploie[0].dateLimite= dateLimite;
      emploie[0].description= description;
      emploie[0].typeContrat = typeContrat;
      emploie[0].profilsRequis = profilsRequis;

      emploie[0].save(function(err) {});
 res.json({
        message: "bien modifier"
      });




    });



  },

/* */



// test requete 

 test: function(req, res) {

  
  res.header("Access-Control-Allow-Origin", "*");
  Utilisateurs.find({

select:['emploieMatch'], where:{"emploieMatch.idEmploieMatch":"5a17ac660383ba6c1a98a8e3"}}).exec(function(err, results) {



results.forEach(function(entry) {
  
  var data =entry.emploieMatch;


  data.forEach(function(resfi) {
    

    if(resfi.idEmploieMatch == "5a17ac660383ba6c1a98a8e3")



    {

console.log(results.length);

resfi.typeContrat = "TEST FINALE";
resfi.dateLimite = "22-22-2222";
resfi.titreEmploie= "Emploie NEWS";


for (var i=0; i<results.length; i++){
results[i].save();
}

    }



});



});


    res.json(results);


    });
  },


  findOffre: function(req, res) {

    let

      
      idOffre = req.param('idOffre');


    Emploies.findOne({
      id: idOffre
    }).exec(function(err, offres) {
      if (err) {
        return res.serverError(err);
      }
      if (!offres) {
        return res.notFound("Could not find Finn, sorry.");
      }

      res.json({
        offre:offres
      });
    });

  },

 findUtilisateurs: function(req, res) {

    let

      
      idUser = req.param('idUser');


    Utilisateurs.findOne({
      id: idUser
    }).exec(function(err, users) {
      if (err) {
        return res.serverError(err);
      }
      if (!users) {
        return res.notFound("Could not find Finn, sorry.");
      }

      res.json({
        users:users
      });
    });

  },


   findEvenements: function(req, res) {

    let

      
      idEvenement = req.param('idEvenement');


    Evenements.findOne({
      id: idEvenement
    }).exec(function(err, events) {
      if (err) {
        return res.serverError(err);
      }
      if (!events) {
        return res.notFound("Could not find Finn, sorry.");
      }

      res.json({
        events:events
      });
    });

  },
   findFormations: function(req, res) {

    let

      
      idFormation = req.param('idFormation');


    Formations.findOne({
      id: idFormation
    }).exec(function(err, formations) {
      if (err) {
        return res.serverError(err);
      }
      if (!formations) {
        return res.notFound("Could not find Finn, sorry.");
      }

      res.json({
        formations:formations
      });
    });

  },
findInfoInstitutions: function(req, res) {

    let

    
      idInstitution = req.param('idInstitution');


    Institutions.findOne({
      id: idInstitution
    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }

      res.json({
        institutions:institution
      });
    });

  },

  findEmploie: function(req, res) {


    let

      id_offre = req.param("id_offre");
    id_entreprise = req.param("id_entreprise");

    /* var criteria = _.mapValues(req.query, function(val) {

       {id_offre: {contains:id_offre} id_entreprise: {contains: id_entreprise}}
       return {contains: val};
     })*/
    // criteria is {campaignID: {contains:'foo'}, cell: {contains: '42'}}
    Emploie.find({
      id_offre: id_offre,
      id_entreprise: id_entreprise
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }
      res.json(data);
    });

  },

  supprimerOffreInstitutions: function(req, res) {


    let

    idOffreEmploi = req.param("idOffreEmploi"); // Object Id :poop:
  

    Emploies.find({
      id: idOffreEmploi
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

      data[0].statusEmploi = "FALSE";
      data[0].save(function(err) {});

      res.json({
        message: data
      });
    });

  },

    supprimerFormationInstitutions: function(req, res) {


    let

    idFormation = req.param("idFormation"); // Object Id :poop:
  

    Formations.find({
      id: idFormation
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

      data[0].statusFormation = "FALSE";
      data[0].save(function(err) {});

      res.json({
        message: data
      });
    });

  },

  supprimerEvenementsInstitutions: function(req, res) {


    let

    idEvenement= req.param("idEvenement"); // Object Id :poop:
  

    Evenements.find({
      id: idEvenement
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

      data[0].statusEvenements = "FALSE";
      data[0].save(function(err) {});

      res.json({
        message: data
      });
    });

  },

  //listé offre d'un institution en cours en précisant son identité
  readOffreInstitutions: function(req, res) {


    let

    idInstitution = req.param("idInstitution"); // identificateur Object ID
    Emploies.find({
      idInstitution: idInstitution,
      statusEmploi: "TRUE"
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

console.log(data);

      res.json(data);
    });

  },
readAvis: function(req, res) {

    let

    
      idInstitution = req.param('idInstitution');
   
    Institutions.findOne({
      id: idInstitution
    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }
/*
console.log(institution.avisInsitutions.length)

var verif = institution.avisInsitutions.filter(function(value) {
          return value.note == 3;
        });

console.log(verif.length) */
      res.json({
        institutions:institution.avisInsitutions
      });
    }); 



  },
readAvisInfo: function(req, res) {

    let

    
      idInstitution = req.param('idInstitution');


    Institutions.findOne({
      id: idInstitution,

    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }

var x= [];
var y= [];
y.push(institution.avisInsitutions)
 

 for(var i = 0 ; i<institution.avisInsitutions.length; i++ ) {
   x.push(institution.avisInsitutions[i].idUtilisateur)
 }
// read info Utilisateurs 
 Utilisateurs.find({
     select: ['photoUtilisateur', 'nomUtilisateur']
   })
   .where({id: x})
     .exec(function(err, user){
   y.push(user)
res.json({
        institutions:y
      });

   });
      
    });

  },

  // listé tous les offres des institutions en cours (instituions connécté)

  readAllOffreInstitutions: function(req, res) {

    Emploies.find({

     
      status: "TRUE",
     "Postuler.idUtilisateurPostule":"59c4c4565e904ce41bd2d974"
    }).exec(function(err, data) {
      if (err) {
        return res.json({
          error: "true"
        });
      }

      console.log(data.length);
      
      res.json(data);
    });

  },


AvisInstitutions(req,res) {
const idUtilisateur = req.param("idUtilisateur");
const pdp = req.param("pdp");
const prenomUtilisateurs = req.param("prenomUtilisateurs");
const idInstitution = req.param("idInstitution");
const note = req.param("note");
const avis = req.param("avis");
const datePublicationAvis =  moment().format('MMMM Do YYYY, h:mm:ss a'); 

  Institutions.findOne({
      id: idInstitution
    }).exec(function(err, entreprise) {
      if (err) {
        return res.serverError(err);
      }
      if (!entreprise) {
        return res.notFound("Could not find Finn, sorry.");
      }
console.log(entreprise)

entreprise.avisInsitutions.push({pdp,prenomUtilisateurs,idUtilisateur,note,avis,datePublicationAvis})
 entreprise.save(function(err) {});
io.on("connection", function(socket){


console.log("log" +socket.id);
socket.on("sendAvis", function(data){

console.log("Appli mobile says:" +data);

io.emit("send-avis",data);
});
});
res.json(entreprise)
    });

},

  //methode setNull idOffreEmploie dans la collection institutions
  deleteOffre: function(req, res) {


    let
      id_offre = req.param("id_offre"),
      id_entreprise = req.param("id_entreprise");


    Entreprise.findOne({
      id_entreprise: id_entreprise
    }).exec(function(err, entreprise) {
      if (err) {
        return res.serverError(err);
      }
      if (!entreprise) {
        return res.notFound("Could not find Finn, sorry.");
      }


      delete entreprise.OffreEmploie[id_offre];


      entreprise.save(function(err) {});
      res.json({
        message: "Bien supprimer"
      });


      // a= entreprise.OffreEmploie.length;
      //console.log(a);
    });


    console.log("here");

  },


  /**
   * `EntrepriseController.find()`
   */

  finde: function(req, res) {
    Entreprise.find({}, {
      nom: "HasinaSpexeSociete"
    }).exec(function(err, entreprise) {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          results: entreprise.location
        });

      }
    });
  },  
  createFormation: function(req, res) {


    let

      tags = req.param("tags").replace(/\s/g, "").split(",");
      nomFiliere = req.param("nomFiliere"),
      logo=req.param("logo");
      typeFormation = req.param("typeFormation"),
      id = req.param("id"); // identificateur institutions Obect Id
      lieuDeFormation = req.param("lieuDeFormation");
      diplomeDeLivre = req.param("diplomeDeLivre");
      idUtilisateur = req.param("idUtilisateur");
      domaineFormation= req.param("domaineFormation");
      dateDebutFormation = req.param("dateDebutFormation");
      dateFinFormation= req.param("dateFinFormation");
      descriptionFormation= req.param("descriptionFormation");


    Institutions.findOne({
      id: id
    }).exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }
      
      var name = institution.nom;
      
      var ville = institution.localisationInstitution[0].ville;
      var type = institution.typeEtablisment;
    

      institution.save(function(err) {});

      Formations.create({

        nomInstitution: name,
        typeEtablisment: type,
        idInstitution: id,
        nomFiliere: nomFiliere,
        typeFormation: typeFormation,
        descriptionFormation:descriptionFormation,
        diplomeDeLivre: diplomeDeLivre,
        dateDebutFormation: dateDebutFormation,
        dateFinFormation: dateFinFormation,
        logo:logo,
        lieuDeFormation: lieuDeFormation,
        ville:ville,
        domaineFormation: domaineFormation,
        tagsFormation: tags,
        
        
        participantFormation: [{

          idUtilisateurParticipantFormation: idUtilisateur,

        }],
        statusFormation: "VALID"

      }).exec(function(err, Emploie) {
        if (err) {
          return res.serverError(err);
        }

        console.log("OK");
      });
      res.json({
        message: "Bien ajouter :) "
      });
    });

  },



  modifierEvenementsInstitutions: function(req, res) {

    let
      lieuEvenement = req.param("lieuEvenement"),

      nomEvenement = req.param("nomEvenement"),

      

      idEvenement = req.param("idEvenement"),

      tags = req.param("tags").replace(/\s/g, "").split(",");

      photoEvenement= req.param("photoEvenement").replace(/\s/g, "").split(",");
      dateFin = req.param("dateFin");

      dateDebut = req.param("dateDebut"),

      idInstitution = req.param("idInstitution"),

      heureFin = req.param("heureFin"),

      heureDebut = req.param("heureDebut"),
      categorieEvenement= req.param("categorieEvenement"),
      detailsEvenement = req.param("detailsEvenement"),
      genreEvenement = req.param("genreEvenement");

       Evenements.find({ id: idEvenement }).exec(function(err, evenement) {
      if (err) {
        return res.json({
          error: "true"
        });
      }


      evenement[0].lieuEvenement = lieuEvenement;
      evenement[0].dateDebut = dateDebut;
      evenement[0].tagsEvenements = tags;
      evenement[0].photoEvenement = photoEvenement;
      evenement[0].nomEvenement = nomEvenement;
      
      evenement[0].dateFin = dateFin;
      evenement[0].heureDebut = heureDebut;
      evenement[0].heureFin = heureFin;
      evenement[0].detailsEvenement = detailsEvenement;
      evenement[0].genreEvenement = genreEvenement;

      evenement[0].categorieEvenement = categorieEvenement;
  /*    
*/
      evenement[0].save(function(err) {});


      res.json({
        message: evenement
      });
    });



  },


  modifierFormationsInstitutions: function(req, res) {

    let
      lieuDeFormation = req.param("lieuDeFormation"),

      nomFiliere = req.param("nomFiliere"),

     

      idFormation = req.param("idFormation"),

      tags = req.param("tags").replace(/\s/g, "").split(","),

      dateFin = req.param("dateFin"),

      dateDebut = req.param("dateDebut"),

      

      typeFormation = req.param("typeFormation"),

      descriptionFormation = req.param("descriptionFormation"),
      diplomeDeLivre= req.param("diplomeDeLivre"),
      domaineFormation = req.param("domaineFormation");
      
       Formations.find({ id: idFormation }).exec(function(err, formation) {
      if (err) {  
        return res.json({
          error: "true"
        });
      }
     formation[0].lieuDeFormation = lieuDeFormation;
      formation[0].tagsFormation = tags;
      
      formation[0].dateDebutFormation = dateDebut;

      console.log(dateDebut)
      
      
        formation[0].nomFiliere = nomFiliere;
      formation[0].descriptionFormation = descriptionFormation;
      formation[0].typeFormation = typeFormation;
      formation[0].diplomeDeLivre = diplomeDeLivre;

      formation[0].dateFinFormation = dateFin;
      formation[0].domaineFormation= domaineFormation;
      formation[0].save();
      
       
     
     



      res.json({
        message: formation
      });
    });



  },

};