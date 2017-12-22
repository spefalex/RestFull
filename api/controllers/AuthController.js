const bcrypt = require("bcrypt-nodejs");
module.exports = {
	index(req, res) {
		const eMail = req.param("eMail");
		const motDePasse = req.param("motDePasse");
		const code = req.param("code");
		if (!eMail || !motDePasse) {
			return res.json(401, { err: "email et password vide" });
		}


		Utilisateurs.findOne({
			Identifiant: eMail
		}).exec((err, utilisateurs) => {
			if (err) {
				return res.serverError(err);
			}
			if (!utilisateurs) {
				return res.json({ message: "Identifiant non trouvé" });
			}

 
			bcrypt.compare(motDePasse, utilisateurs.motDePasse, (err, match) => {
				if (err) console.log(err);
				if (match) {
					if (utilisateurs.code == "") {
						return res.json({
							utilisateurs: utilisateurs.id,
							pdp: utilisateurs.photoUtilisateur,
							message:"OK",
							token: jwToken.issue({ message: "good" })
						}); 
					} return res.json(401, { message: "veuillez activé votre compte " }); 
				} 
				return res.json(401, { message: "mot de passe incorecte" });
			});
		});
	},
	Confirmation(req, res) {
		const eMail = req.param("eMail");
		const motDePasse = req.param("motDePasse");
		const code = req.param("code");
   

		Utilisateurs.findOne({ Identifiant: [eMail] }, (err, user) => {
			if (!user) {
				console.log(user);
				return res.json(401, { message: "invalid email ou password" });
			}

			if (user.code == code) {
				Utilisateurs.comparePassword(motDePasse, user, (err, valid) => {
					if (err) {
						return res.json(403, { message: "interdit" });
					}

					if (!valid) {
						return res.json(401, { message: "invalid email ou password" });
					} 

					user.code = "";
					user.save();
					res.json({
						user: user.id,
						token: jwToken.issue({ message: "OK" })
					});
				});
			} 

else if(user.code == '') {
return res.json({ message: "Votre compte est déjà activé" });

}
			else {
				return res.json({ message: "Votre code est incorecte" });
			}
		});
	}

  
};
