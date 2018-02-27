const mailer = require("nodemailer");
const twilio = require("twilio");
const fs = require ("fs");
var path = require('path');
var express = require("express");
var app = express();
var server = require("http").Server(app);
var moment = require("moment");
var server= app.listen(3333);
var io = require('socket.io').listen(server);

//var io = require('socket.io-client')('http://192.168.0.96:1337');

const smtpTransport = mailer.createTransport("SMTP", {
  service: "Gmail",
  auth   : {
    user: "keymada17@gmail.com",
    pass: "keymada1234"
  }
});

var express = require("express");
var app = express();
var server = require("http").Server(app);

module.exports = {
  /**
   * It will create a new user .
   */


  create(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let nomUtilisateur = req.param("nomUtilisateur"),
      prenomUtilisateur = req.param("prenomUtilisateur"),
      anneNaissance = req.param("anneNaissance"),
      sexe = req.param("sexe"),
      centreInteret = req.param("centreInteret").replace(/\s/g, "").split(","),
      photoUtilisateur = req.param("photoUtilisateur"),
      numeroMobile = req.param("numeroMobile"),
      adresseMail = req.param("adresseMail"),
      motDePasse = req.param("motDePasse"),
      typeRencontre = req.param("typeRencontre"),
      localisation = req.param("localisation"),
      aPropos = req.param("aPropos"),
      poste = req.param("poste"),
      code = req.param("code"),
      nomSociete = req.param("nomSociete"),
      diplome = req.param("diplome"),
      filiere = req.param("filiere"),
      nomEtablissement = req.param("nomEtablissement");
      idEvenementMatcher = req.param("idEvenementMatcher");
      idEvenementSauvegarder= req.param("idEvenementSauvegarder");
      idEvenementIgnorer = req.param("idEvenementIgnorer");
      idFormationSauvegarder = req.param("idFormationSauvegarder");
      idFormationIgnorer = req.param("idFormationIgnorer");
      idEmploiMatcher = req.param("idEmploiMatcher");
      idEmploiSauvegarder = req.param("idEmploiSauvegarder");
      idEmploiIgnorer = req.param("idEmploiIgnorer");   
      idInstitutionSuivi = req.param("idInstitutionSuivi");
      idUtilisateurBloquer = req.param("idUtilisateurBloquer");
      idUtilisateurMatcher = req.param("idUtilisateurMatcher");
      idUtilisateurIntersser = req.param ("idUtilisateurIntersser");
     cv = req.param("cv");

    const age = (new Date()).getFullYear() - anneNaissance;

    Utilisateurs.count({
      Identifiant: adresseMail
    }).exec((error, found) => {
      Utilisateurs.find({
        numeroMobile
      }).exec((err, phone) => {
        const verifPhone = phone.length;


        const verifMail = +found;
        console.log(found);


        if (verifMail == 1 && verifPhone == 0) {
          res.header("Access-Control-Allow-Origin", "*");
          res.json({
            message: "Adresse e-maiL déjà éxiste"
          });
        } else if (verifMail == 0 && verifPhone == 1) {
          res.header("Access-Control-Allow-Origin", "*");
          res.json({
            message: "numero mobile déjà existé"
          });
        } else if (verifMail == 1 && verifPhone == 1) {
          res.header("Access-Control-Allow-Origin", "*");
          res.json({
            message: "adresseMail et numero Mobile déjà éxisté"
          });
        } else {
          Utilisateurs.create({
            nomUtilisateur,
            prenomUtilisateur,
            anneNaissance,
            age,
            sexe,
            photoUtilisateur: photoUtilisateur,
            numeroMobile, 
            adresseMail,
            motDePasse,
            localisation,
            aPropos,
            centreInteret,
            Identifiant: [adresseMail, numeroMobile],
            code,
            statusCompte    : "VALIDE",
            
            informationEmploie: [{
              nomSociete,
              poste

            }],

            Filtre: [{
              rencontre:false,
              emploies:true,
              evenements:false,
              formation:false

            }],

            derniereFormation: [{
              diplome,
              filiere,
              nomEtablissement


            }],
            evenementMatcher: [],

             evenementSauvegarder: [],
            


             evenementIgnorer: [],

            institutionSuivi: [],

           

            formationSauvegarder: [],

            formationIgnorer: [],
            formationParticiper : [],

            emploiMatcher: [],

            emploiSauvegarder: [],


            emploiIgnorer: [],

             idUtilisateurIntersser: [],

            utilisateurMatcher: [],

            utilisateurBloquer: [],
            cv: [{
              cv


            }],
             

             typeRencontre:typeRencontre

          }).exec((err, utilisateur) => {
            if (err) {
              return res.serverError(err);
            }
            function randomString(length, chars) {
              let result = "";
              for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
              return result;
            }


           
            var code = Math.floor(1000 + Math.random() * 9000);
            console.log(code);

            utilisateur.code = code;
            utilisateur.save();

            const mail = {
              from   : "keymada17@gmail.com",
              to     : adresseMail,
              subject: "Code de confirmation compte KeyMada",
              html   : `<p> Voici votre code : ${code}</p>`
            };

            res.header("Access-Control-Allow-Origin", "*");

            smtpTransport.sendMail(mail, (error, response) => {
              if (error) {
                console.log("Erreur lors de l'envoie du mail!");
                console.log(error);
                res.json({
                  message: "Erreur lors de l'envoie du mail,veuillez le ressayer"
                });
              } else {
                console.log("Mail envoyé avec succès!");
                res.header("Access-Control-Allow-Origin", "*");
                res.json({
                  message: "email de confirmation",
                  idUtilisateur: utilisateur.id
                });
              }
              smtpTransport.close();
            });

            // res.json({ message: 'OK', token: jwToken.issue({id: utilisateur.id})});
          });
        }
      });
    }); // Fin fct count
  },
  /*

res.header("Access-Control-Allow-Origin", "*");
res.json({ message: 'OK', token: jwToken.issue({id: _utilisateur.id})});

*/
  findAll(req, res) {
    Utilisateurs.find().exec((err, utilisateur) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(
          utilisateur
        );
      }
    });
  },
  
  findTag(req, res) {
    Tags.find().exec((err, tags) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(
          tags
        );
      }
    });
  },

 findConversationol(req, res) {

  let

      idUser2 = req.param('idUser2')
      idUser1= req.param('idUser1');
     Messages.find({

"idUser1":"5a420bdac2ba920b19d5f75b","idUser2":"5a44894ec4cb2bd81bc3547a"}).exec((err, message) => {
      if (err) {
        res.send(400);
      } else {0
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          message:message.id
        }
        );
      }
    });
  },
findConversation: function(req, res) {

    let

    idUser2 = req.param('idUser2')
    idUser1=  req.param('idUser1');
    
   console.log(idUser1)
   console.log(idUser2)
    Messages.find({
     idUser1: idUser1, idUser2:idUser2,
     
   })
   .exec(function(err, institution) {
      if (err) {
        return res.serverError(err);
      }
      if (!institution) {
        return res.notFound("Could not find Finn, sorry.");
      }


if(institution.length == 0 ) {

   console.log(institution.length)
   Messages.find({
idUser1: idUser2, idUser2: idUser1
    

   } ).exec((err, message) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(
         message
        );
      }
    });



} else  {
      res.json(
        institution
      );
      }
    }); 



  },
  findUSER(req, res) {
    Utilisateurs.find({select:['Filtre.rencontre']}).exec((err, user) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json(
         user
        );
      }
    });
  },

   findPhoto(req, res) {
    let

    
    idUser1=  req.param('idUser1');
    Utilisateurs.find({ id:idUser1}).exec((err, user) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
         photo1:user[0].photoUtilisateur
        }
        );
      }
    });
  },

   findPhoto2(req, res) {
    let

    idUser2 = req.param('idUser2')
   
    Utilisateurs.find({id:idUser2}).exec((err, user) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
        photo2:user[0].photoUtilisateur
        }
        );
      }
    });
  },

 lireEmploiMatcher(req, res) {

   const id = req.param("idUtilisateurs");
    Emploies.find({"postuler.idUtilisateursPostuler":id, sort: 'createdAt DESC'}).exec((err, emploie) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        console.log(emploie.length)
        res.json(
          emploie
        );
      }
    });
  },
 
 lireUtilisateursInteresser(req, res) {

   const id = req.param("idUtilisateurs");
    Utilisateurs.findOne({id:id}).exec((err, utilisateur) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        var idFind= utilisateur.idUtilisateurIntersser;
        console.log(idFind)
        
      Utilisateurs.find({id:idFind}).exec(function (err, utilisaka){
  if (err) {
    return res.serverError(err);
  }
  sails.log('Wow, there are %d users named Finn.  Check it out:', utilisaka.length, utilisaka);
  return res.json(utilisaka);

});




      }
    });
  },

   lireContact(req, res) {

   const id = req.param("idUtilisateurs");
    Utilisateurs.findOne({id:id}).exec((err, utilisateur) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        var idFind= utilisateur.utilisateurMatcher;
        console.log(idFind)
        
      Utilisateurs.find({id:idFind}).exec(function (err, utilisaka){
  if (err) {
    return res.serverError(err);
  }
  sails.log('Wow, there are %d users named Finn.  Check it out:', utilisaka.length, utilisaka);
  return res.json(utilisaka);

});




      }
    });
  },

insertTest: function (req,res) {

//console.log(req.file('avatar'))

req.file('avatar').upload({
  dirname:"/var/www/html/IMAGES"
},function (err, uploadedFiles) {
  if (err) return res.negotiate(err);
console.log(uploadedFiles);
console.log(uploadedFiles[0].fd);

res.json(uploadedFiles[0].fd);
});


  },

   lireEvenementsMatcher(req, res) {

   const id = req.param("idUtilisateurs");
    Evenements.find({"participant.idUtilisateurParticipant":id}).exec((err, evenement) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        console.log(evenement.length)
        res.json(
          evenement
        );
      }
    });
  },


     lireEvenementsSauvegarder(req, res) {

   const id = req.param("idUtilisateurs");
    Evenements.find({"sauvegardeEvenement.idUtilisateurSauvegarder":id}).exec((err, evenement) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        console.log(evenement.length)
        res.json(
          evenement
        );
      }
    });
  },

    lireFormationSauvegarder(req, res) {

   const id = req.param("idUtilisateurs");
    Formations.find({"participantFormation.idUtilisateurParticipantFormation":id}).exec((err, formation) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        console.log(formation.length)
        res.json(
          formation
        );
      }
    });
  },




   lireEmploiSauvegarder(req, res) {

   const id = req.param("idUtilisateurs");
    Emploies.find({"sauvegardeEmploi.idUtilisateurSauvegarder":id, sort: 'createdAt DESC'}).exec((err, emploie) => {
      if (err) {
        res.send(400);
      } else {
        res.header("Access-Control-Allow-Origin", "*");

        console.log(emploie.sa)
        res.json(
          emploie
        );
      }
    });
  },

  findCount(req, res) {
    const firstName = req.param("first_name");


    User.count({
      first_name: req.param("first_name")
    }).exec((error, found) => {
      if (error) {
        return res.serverError(error);
      }
      res.json({
        found
      });
    });
  },


  AcceuilUtilisateur(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

      const tags = utilisateur.centreInteret;
      const localisation = utilisateur.localisation;

      const ignorer = utilisateur.emploiIgnorer;

      console.log(ignorer);

      if (tags.length == 0) {
        Evenements.find({
          ville: localisation
        }).exec((err, evenement) => {
          res.json({
            evenement
          });
        });
      } else {
        Emploies.find({
          tags
        }).exec((err, results) => {

          if(results.length == 0) { res.json({message:'accune offre emploie correspond à votre centre interet '})}
          res.json({
            results
          });
        });
      }
    });
  },

 FiltreEmploie(req, res) {
    
    const id = req.param("id");
    const typeContrat = req.param('typeContrat').replace(/\s/g, "").split(",");
    const centreInteret = req.param("centreInteret").replace(/\s/g, "").split(",");
  
 Utilisateurs.findOne({
      id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

    
      const ignorer = utilisateur.emploiIgnorer;
      const sauvegarder = utilisateur.emploiSauvegarder;
 
      const ignorerVrai = ignorer.concat(sauvegarder);
     
      console.log(ignorerVrai)
      console.log(utilisateur.prenomUtilisateur)
      console.log(typeContrat)
       console.log(centreInteret)
    

    Emploies.find({
          
          id:{'!':ignorerVrai},
          or : [

         {tagsEmploi: centreInteret}, 

          {typeContrat:typeContrat}
        


         ]
        
        }).exec((err, emploies) => {

if(emploies.length == 0) { res.json({message:'accune offres correspond à votre critére de recherche '})} 
        
else {
          res.json({
            emploies:emploies
          }
          
          );
           }
          
        });
      
    });
  },



AcceuilsUtilisateur(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
         res.header("Access-Control-Allow-Origin", "*");
        return res.notFound("Could not find Finn, sorry.");
      }

      const tags = utilisateur.centreInteret;
      const localisation = utilisateur.localisation;
      const ignorer = utilisateur.emploiIgnorer;
      const sauvegarder = utilisateur.emploiSauvegarder;
      const matcher=utilisateur.emploiMatcher;

      const ignorerVrai = ignorer.concat(sauvegarder,matcher);
      console.log(tags);
      console.log(matcher);

      console.log(ignorerVrai)
      
    
      console.log(sauvegarder)

    Emploies.find({
          tagsEmploi: tags,
          id:{'!':ignorerVrai}, 
          sort: 'createdAt DESC'
        }).exec((err, emploies) => {

if(emploies.length == 0) {
 res.header("Access-Control-Allow-Origin", "*");
 res.json({message:'accune offre emploie correspond à votre centre interet '})}
        
else {

   res.header("Access-Control-Allow-Origin", "*");
          res.json({
            emploies:emploies
          }
          
          );
          }
        });
      
    });
  },


AcceuilsEvenements(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id:id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

      const tags = utilisateur.centreInteret;
      const localisation = utilisateur.localisation;
      console.log(tags);
      const ignorer = utilisateur.evenementIgnorer;
      const matcher= utilisateur.evenementMatcher;
      const sauvegarder = utilisateur.evenementSauvegarder;

      const ignorerVrai = ignorer.concat(matcher,sauvegarder);
      console.log(ignorerVrai);
      console.log(utilisateur.nomUtilisateur);

    Evenements.find({
          tagsEvenements: tags,
          id:{'!':ignorerVrai}

        }).exec((err, events) => {

if(events.length == 0) { res.json({message:'accune Evenements correspond à votre centre interet '})} 

  else {
          res.json({
            events:events
          }
          
          );
          }
        });
      
    });
  },


  AcceuilsFormations(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

      const tags = utilisateur.centreInteret;
      const formationSauvegarder = utilisateur.formationSauvegarder;
      const formationParticiper = utilisateur.formationParticiper;
      console.log(tags);
      const ignorer = utilisateur.formationIgnorer;

      const ignorerVrai = ignorer.concat(formationSauvegarder,formationParticiper);
      console.log(ignorerVrai);
      console.log(utilisateur.nomUtilisateur);

    Formations.find({
          tagsFormation: tags,
          id:{'!':ignorerVrai}

        }).exec((err, formations) => {

if(formations.length == 0) { res.json({message:'accune formations correspond à votre centre interet '})} 

  else {
          res.json({
            formations:formations
          }
          
          );
          }
        });
      
    });
  },




   AcceuilsRencontre(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id:id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

      const tags = utilisateur.centreInteret;
      const localisation = utilisateur.localisation;
      const typeRencontre = utilisateur.typeRencontre;

      console.log(tags);
      console.log(id)
      console.log(localisation);
      console.log(typeRencontre)
      const ignorer = utilisateur.utilisateurBloquer;
      const interese = utilisateur.idUtilisateurIntersser;
      const matcher= utilisateur.utilisateurMatcher;

      const ignorerVrai=ignorer.concat(matcher);
      console.log(ignorerVrai);
      console.log(utilisateur.nomUtilisateur);



    Utilisateurs.find({
       
       id:{'!':ignorerVrai},

       or : [

         {centreInteret: tags}, 

          {localisation:localisation},
         { typeRencontre:typeRencontre}


         ]
         

          

        }).exec((err, user) => {

if(user.length == 0) { res.json({message:'accune personne correspond à votre centre interet '})} 

  

  else {
          res.json({
            user:user
          }
          
          );
          }
        });
      
    });
  },

FiltreAcceuil(req,res){

    const id = req.param("id");
Utilisateurs.findOne({
  id:id
}).exec(function (err, utilisaka){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisaka) {
    return res.notFound('Could not find Finn, sorry.');
  }

const rencontre= utilisaka.Filtre[0].rencontre;
const emploies= utilisaka.Filtre[0].emploies;
const evenements= utilisaka.Filtre[0].evenements;
const formation= utilisaka.Filtre[0].formation;
const tags = utilisaka.centreInteret;

console.log(tags)

if(rencontre==false && emploies ==true && evenements== false && formation ==false) 


{

  console.log("emploies rery");
 return res.json({message:"emploies rery"});
} 


else if(rencontre==false && emploies ==false && evenements== true && formation ==false) {

  console.log("evenements rery")
  return res.json({message:"evenements rery"});
}

else if(rencontre==false && emploies ==false && evenements== false && formation ==true) {

  console.log("formations rery")
    return res.json({message:"formations rery"});
}

else if(rencontre==true && emploies ==false && evenements== false && formation ==false) {

  console.log("rencontre rery")
    return res.json({message:"rencontre rery"});
}

else if(rencontre==true && emploies ==true && evenements== false && formation ==false) {

  console.log("rencontre feat emploies")
    return res.json({message:"rencontre feat emploies"});
}


else if(rencontre==true && emploies ==false && evenements== true && formation ==false) {

  console.log("rencontre feat evenements")
    return res.json({message:"rencontre feat evenements"});
}

else if(rencontre==true && emploies ==false && evenements== false && formation ==true) {

  console.log("rencontre feat formation")
    return res.json({message:"rencontre feat formation"});
}


else if(rencontre==false && emploies ==true && evenements== true && formation ==false) {

  console.log("emploies feat evenements")
    return res.json({message:"emploies feat evenements"});
}

else if(rencontre==false && emploies ==true && evenements== false && formation ==true) {

  console.log("emploies feat formation")
    return res.json({message:"emploies feat formation"});
}


else if(rencontre==false && emploies ==false && evenements== true && formation ==true) {

  console.log("formation feat evenemnts")
    return res.json({message:"formation feat evenemnts"});
}

else if(rencontre==false && emploies ==true && evenements== false && formation ==true) {

  console.log("formation feat emploies")
    return res.json({message:"formation feat emploies"});
}


else if(rencontre==true && emploies ==true && evenements== true && formation ==false) {

  console.log("rencontre feat emploies feat evenements")
    return res.json({message:"rencontre feat emploies feat evenements"});
}

else if(rencontre==true && emploies ==false && evenements== true && formation ==true) {

  console.log("rencontre feat evenements feat formation")
    return res.json({message:"rencontre feat evenements feat formation"});
}

else if(rencontre==true && emploies ==true && evenements== false && formation ==true) {

  console.log("rencontre feat emploies feat formation")
  return res.json({message:"rencontre feat emploies feat formation"});
}

else if(emploies==true && rencontre ==true && evenements== true && formation ==true) {

  console.log("read all")
    return res.json({message:"read all"});
}

else if(emploies==false && rencontre ==false && evenements== false && formation ==false) {

  console.log("false all")
    return res.json({message:"false all"});
}

else if(formation==true && emploies ==true && evenements== true && rencontre ==false) {

  console.log("formation feat emplois feat evenements")
    return res.json({message:"formation feat emplois feat evenements"});
}

else if(emploies==true && formation ==true && evenements== true && rencontre ==false) {

  console.log("emploes feat formation evenements")
    return res.json({message:"emploes feat formation evenements"});
}
  return res.json(utilisaka);
});
  },



   InformationUtilisateur(req, res) {
    const id = req.param("id");


    Utilisateurs.findOne({
      id
    }).exec((err, utilisateur) => {
      if (err) {
        return res.serverError(err);
      }
      if (!utilisateur) {
        return res.notFound("Could not find Finn, sorry.");
      }

       res.json({
       utilisateur
      });
    });
  },


  Update(req, res) {
    User.update({
      id: req.param("id")
    }, {
      first_name: req.param("first_name")
    }).exec((err, updated) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err) {
        // handle error here- e.g. `res.serverError(err);
        return;
      }

      // console.log('Updated user to have name ' + updated[0].first_name);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
        message: "mise a jour"
      });
    });
  },



 matcherOffre: function(req, res) {


    let

      OffreEmploie = [],
      
      idOffreEmploi = req.param('idOffreEmploi'),
      idUtilisateur = req.param('idUtilisateur'),
      cv = req.param("cv");


      Emploies.findOne({
      id: idOffreEmploi,
     // idOffreEmploie:idOffreEmploie // A.I
    }).exec(function(err, emploies) {
      if (err) {
        return res.serverError(err);
      }
      if (!emploies) {
        return res.notFound('Could not find emploies, sorry.');
      }
     
     //var jsonval = entreprise.OffreEmploie[id_offre];
    // var copy = entreprise.OffreEmploie[id_offre].nom_offre;
  // var company = entreprise.OffreEmploie[id_offre].nom_entreprise;

      console.log(emploies.titreEmploie);
     // console.log(company);

     emploies.postuler.push({idUtilisateursPostuler:idUtilisateur, cv: cv});
     emploies.save();
     

Utilisateurs.findOne({
  id:idUtilisateur
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.emploiMatcher.push(idOffreEmploi);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
    });

  },

 sauvegarderOffre: function(req, res) {


    let

      OffreEmploie = [],
      
      idOffreEmploi = req.param('idOffreEmploi'),
      idUtilisateur = req.param('idUtilisateur');
    


      Emploies.findOne({
      id: idOffreEmploi,
     // idOffreEmploie:idOffreEmploie // A.I
    }).exec(function(err, emploies) {
      if (err) {
        return res.serverError(err);
      }
      if (!emploies) {
        return res.notFound('Could not find emploies, sorry.');
      }
     
     

      console.log(emploies.titreEmploi);

     emploies.sauvegardeEmploi.push({idUtilisateurSauvegarder:idUtilisateur});
     emploies.save();
     

Utilisateurs.findOne({
  id:idUtilisateur
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find Finn, sorry.');
  }
utilisateur.emploiSauvegarder.push(idOffreEmploi);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
    });

  },

 insertMessage: function(req, res) {


    let

    idConvsa = req.param('idConvsa'),
    text= req.param('text'),
    idUtilisateur = req.param('idUtilisateur');
    


var obj = {};
obj[idUtilisateur] = text;

      Messages.findOne({
      id: idConvsa,
     
    }).exec(function(err, message) {
      if (err) {
        return res.serverError(err);
      }
      if (!message) {
        return res.notFound('Could not find emploies, sorry.');
      }
     
     

 io.emit('server-message', "news");
     message.Conversation.push(obj);
     message.save();
     
res.json(message)

    });

  },


   participeFormation: function(req, res) {


    let

      
      
      idFormation = req.param('idFormation'),
      idUtilisateur = req.param('idUtilisateur');
    


      Formations.findOne({
      id: idFormation,
    
    }).exec(function(err, formation) {
      if (err) {
        return res.serverError(err);
      }
      if (!formation) {
        return res.notFound('Could not find formation, sorry.');
      }
     
     


     formation.participantFormation.push({idUtilisateurParticipantFormation:idUtilisateur});
     formation.save();
     

Utilisateurs.findOne({
  id:idUtilisateur
}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find Finn, sorry.');
  }
utilisateur.formationParticiper.push(idFormation);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
    });

  },



 ignorerFormation: function(req, res) {


    let

      
      idFormation= req.param('idFormation'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.formationIgnorer.push(idFormation);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },

   ignorerRencontre: function(req, res) {


    let

      
      idIgnorer= req.param('idIgnorer'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.utilisateurBloquer.push(idIgnorer);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },
 ignorerOffre: function(req, res) {


    let

      OffreEmploie = [],
      
      idOffreEmploi = req.param('idOffreEmploi'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.emploiIgnorer.push(idOffreEmploi);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },


 ignorerEvenement: function(req, res) {


    let

      OffreEmploie = [],
      
      idEvenements = req.param('idEvenements'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.evenementIgnorer.push(idEvenements);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },


//matcher evenement
  matcherEvenement: function(req, res) {


    let

      idUtilisateurParticipant = req.param("idUtilisateurParticipant"),
      id = req.param("id"); // identificateur evenement à participer Object Id 


    Evenements.findOne({
      id: id
    }).exec(function(err, event) {
      if (err) {
        return res.serverError(err);
      }
      if (!event) {
        return res.notFound("Could not find event, sorry.");
      }

      //MISE A JOUR EVENEMENT MATCH dans la collection utilisateurs
      Utilisateurs.findOne({
        id: idUtilisateurParticipant
      }).exec(function(err, utilisateur) {
        if (err) {
          return res.serverError(err);
        }
        if (!utilisateur) {
          return res.notFound("Could not find user, sorry.");
        }

    utilisateur.evenementMatcher.push(id);
          utilisateur.save(function(err) {});
          event.participant.push({
            idUtilisateurParticipant: idUtilisateurParticipant
          });
          event.save(function(err) {});

          console.log(event);


          res.json({
            message: "bien ENREGISTRER"
          });
    
        });

    });

  },


    sauvegardeEvenement: function(req, res) {


    let

      idUtilisateurSauvegarder = req.param("idUtilisateurSauvegarder"),
      id = req.param("id"); // identificateur evenement à participer Object Id 


    Evenements.findOne({
      id: id
    }).exec(function(err, event) {
      if (err) {
        return res.serverError(err);
      }
      if (!event) {
        return res.notFound("Could not find event, sorry.");
      }

      //MISE A JOUR EVENEMENT SAUVEGARDE dans la collection utilisateurs
      Utilisateurs.findOne({
        id: idUtilisateurSauvegarder
      }).exec(function(err, utilisateur) {
        if (err) {
          return res.serverError(err);
        }
        if (!utilisateur) {
          return res.notFound("Could not find user, sorry.");
        }

    utilisateur.evenementSauvegarder.push(id);

          utilisateur.save(function(err) {});
          event.sauvegardeEvenement.push({
            idUtilisateurSauvegarder: idUtilisateurSauvegarder
          });
          event.save(function(err) {});

          console.log(event);
          res.json({
            message: "bien ENREGISTRER"
          });
       }); 
    });
  },


   sauvegarderFormation: function(req, res) {


    let

      
      idFormation= req.param('idFormation'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.formationSauvegarder.push(idFormation);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },
  Delete(req, res) {
    User.destroy({
      id: req.param("id")
    }).exec((err) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        return res.negotiate(err);
      }
      sails.log("OUF");
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
        message: "delete"
      });
    });
  },

  findName(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    User.find({
      first_name: req.param("first_name")
    }).exec((err, results) => {
      const counter = results.length;
      sails.log(counter);


      if (counter == 0) {
        res.json({
          results: "Not"
        });
      } else {
        res.json({
          results
        });
      }
    });
  },




  findTags(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const twilio = require("twilio");


    const client = new twilio("ACad288269f357630c5fbc0aa4ca3f0b83", "94532e0195736d640641d0bb2fb0b256");

    client.messages.create({
      to  : "+261349911706",
      from: "+14245238505",
      body: "Hello KDBR"
    }, (error, message) => {
      if (!error) {
        console.log("Success! The SID for this SMS message is:");
        console.log(message.sid);

        console.log("Message sent on:");
        console.log(message.dateCreated);
      } else {
        console.log(error);
        console.log("Oops! There was an error.");
      }
    });
  },

piho (req,res) {

for(var i=0; i<1000; i++) {
  console.log("a")
  return this.InsertBoucle();
}
},


InsertBoucle(){




Utilisateurs.create(
{
    
    "nomUtilisateur" : "RaSpexe",
    "prenomUtilisateur" : "Hasina Félicien Tinasoa",
    "anneNaissance" : 1994,
    "adresseMail" : "fanjah.16@gmail.com",
    "sexe" : "female",
    "age" : "23",
    "localisation" : "Ambonifahidrano",
    "motDePasse" : "$2a$10$dw67tjkCmiOwdMTBvkSx6u2B/F1LXr9MYYoMle7Wzh0QS/Jz0PLy.",
    "photoUtilisateur" : "",
    "numeroMobile" : "0344167703",
    "code" : "",
    "statusCompte" : "VALIDE",
    "aPropos" : "A boss",
    "centreInteret" : [ 
        "sasa", 
        "solo", 
        "LANONANA", 
        "FOOTBAL", 
        "Biberon"
    ],
    "Identifiant" : [ 
        "fanjah.16@gmail.com", 
        "0344167703"
    ],
    "informationEmploie" : [ 
        {
            "nomSociete" : "NetLink Telecom",
            "poste" : "developpeur"
        }
    ],
    "derniereFormation" : [ 
        {
            "diplome" : "Master 2",
            "filiere" : "Informatique en base de donnes",
            "nomEtablissement" : ""
        }
    ],
    "evenementMatch" : [ 
        {
            "idEvenementMatch" : ""
        }
    ],
    "institutionSuivi" : [ 
        {
            "idInstitution" : ""
        }
    ],
    "evenementSauvegarde" : [ 
        {
            "idEvenementSauvegarde" : ""
        }
    ],
    "formationSauvagrde" : [ 
        {}
    ],
    "emploieMatch" : [ 
        {
            "idEmploieMatch" : ""
        }, 
        {
            "nomInstitution" : "SAOUL",
            "titreEmploie" : "RACT NATIVE +  REDUX + ELIXIR NOSQL MONGODB",
            "typeContrat" : "ANNUEL",
            "idEmploieMatch" : "5a17ac660383ba6c1a98a8e3",
            "dateLimite" : "18-02-1994"
        }
    ],
    "emploieSauvegarde" : [ 
        {
            "idEmploieSauvegarde" : ""
        }
    ],
    "utilisateurMatch" : [ 
        {
            "idUtilisateurMatch" : ""
        }
    ],
    "utilisateurBloque" : [ 
        {
            "idUtilisateurBloque" : ""
        }
    ],
    "cv" : "[object Object]",
    
}

).exec(function (err, finn){
  if (err) { return res.serverError(err); }

  sails.log('Finn\'s id is:', finn.id);
  //return res.json(finn);
})
    

},


NewTags(req,res) {
const nomTags = req.param("nomTags");



Tags.create({nomTags:nomTags}).exec(function (err, finn){
  if (err) { return res.serverError(err); }


else {
 io.emit('server-send', nomTags);
res.json({message: "real time  :)"});

}

});

},


demandeRencontre: function(req, res) {


    let

      
      idDemande= req.param('idDemande'),
      idUtilisateur = req.param('idUtilisateur');
      


  
 Utilisateurs.findOne({id:idDemande}).exec(function (err, usaka){
  if (err) {
    return res.serverError(err);
  }
  if (!usaka) {
    return res.notFound('Could not find user, sorry.');
  }

   var verif = usaka.idUtilisateurIntersser.indexOf(idUtilisateur);
   console.log(verif)
        
        if(verif > -1) {

          res.json({message:"demande deja envoye"})
} else {

usaka.idUtilisateurIntersser.push(idUtilisateur);

 io.emit('server-send', 'send');
usaka.save(function (err) {  });
  res.json(usaka);

}
  
});
  

  


  },
  
  accepteRencontre: function(req, res) {


    let

      
      idAccepte= req.param('idAccepte'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.utilisateurMatcher.push(idAccepte);


var index= utilisateur.idUtilisateurIntersser.indexOf(idAccepte);
io.emit('server-accepte', 'send');
console.log(index)

if (index > -1) {
    utilisateur.idUtilisateurIntersser.splice(index, 1);
}

utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

 Utilisateurs.findOne({id:idAccepte}).exec(function (err, usaka){
  if (err) {
    return res.serverError(err);
  }
  if (!usaka) {
    return res.notFound('Could not find user, sorry.');
  }
usaka.utilisateurMatcher.push(idUtilisateur);
usaka.save(function (err) {  });
  console.log(usaka);
  
});

  Messages.create({

    idUser1:idAccepte,
    idUser2:idUtilisateur,

    Conversation: [{


    }]




  }).exec(function (err, finn){
  if (err) { return res.serverError(err); }

 
});

  },

ignorerRencontre: function(req, res) {


    let

      
      idIgnorer= req.param('idIgnorer'),
      idUtilisateur = req.param('idUtilisateur');
      

 Utilisateurs.findOne({id:idUtilisateur}).exec(function (err, utilisateur){
  if (err) {
    return res.serverError(err);
  }
  if (!utilisateur) {
    return res.notFound('Could not find user, sorry.');
  }
utilisateur.utilisateurBloquer.push(idIgnorer);
utilisateur.save(function (err) {  });
  res.json(utilisateur);
  
});
  

  },

  LoginSprint(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const e_mail = req.param("e_mail");
    const mdp = req.param("password");

    User.find({
      e_mail
    }).exec((err, results) => {
      const counter = results.length;
      sails.log(counter);


      if (counter == 0) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          message: "Identifiant non trouvé"
        });
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        User.find({
          e_mail
        }).exec((err, data) => {
          const pass = data.pop().toObject();
          const verif = pass.password;

          if (verif == mdp) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
              message: "OK",
              token  : jwToken.issue({
                id: e_mail
              })
            });
          } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
              message: "Mauvaise mot de passe"
            });
          }
        });
      }
    });
  }


};
