const bcrypt = require("bcrypt-nodejs");
module.exports = {
	index(req, res) {
		const eMail = req.param("eMail");
		const motDePasse = req.param("motDePasse");
		const code = req.param("code");
		if (!eMail || !motDePasse) {
			return res.json(401, { err: "email et password vide" });
		}


		Institutions.findOne({
			Identifiant: eMail
		}).exec((err, instititution) => {
			if (err) {
				return res.serverError(err);
			}
			if (!instititution) {
				return res.json({ message: "Identifiant non trouvé" });
			}

 
			bcrypt.compare(motDePasse, instititution.motDePasse, (err, match) => {
				if (err) console.log(err);
				if (match) {
					if (instititution.code == "") {
						return res.json({
							instititution: instititution.id,
							message:"OK",
							token: jwToken.issue({ message: "good" })
						}); 
					} return res.json(401, { message: "veuillez activé votre compte " }); 
				} 
				return res.json(401, { message: "mot de passe incorecte" });
			});
		});
	},
	ConfirmationInstitution(req, res) {
		const eMail = req.param("eMail");
		const motDePasse = req.param("motDePasse");
		const code = req.param("code");
   

		instititution.findOne({ Identifiant: [eMail] }, (err, user) => {
			if (!user) {
				console.log(user);
				return res.json(401, { message: "invalid email ou password" });
			}

			if (user.code == code) {
				instititution.comparePassword(motDePasse, user, (err, valid) => {
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
			} else {
				return res.json({ message: "Votre code est incorecte" });
			}
		});
	}

  
};
