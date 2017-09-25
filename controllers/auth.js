const User = require('../models/user.js');
const jwt = require('jwt-simple');
const config = require('../config.js');

function createUserToken(user){
	let timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = function(req, res, next){
	let email = req.body.email;
	let password = req.body.password;
	
	if (!email || !password){
		return res.status(418).send({ error: 'You must provide email and password' });
	}

	User.findOne({ email: email }, function(err, existingUser){
		if(err){
			return next(err);
		} //Handle search error

		if(existingUser){
			// return res.status(418).send(err);
			return res.status(418).send('Email is in use');
		} //Handles existing users

		
		let user = new User({
			email: email,
			password: password
		});

		//To save the record of the DB
		user.save(function(err){
			if (err){
				return next(err);
			}
			//Respond to request indicating the user was created
			res.json({ token: createUserToken(user) });
		});
	});
}

exports.signin = function(req, res, next){
	res.send({ token: createUserToken(req.user) });
}