const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const User = require("../model/users");

const sharedController = require('./sharedController');

let login = (req, res) => {
	const password = crypto.createHash('sha256').update(req.body.password).digest('base64');
	User.findOne({email: req.body.email, password: password})
	.select({password: 0, carts: 0})
	.then((user) => {
		if (!user) {
			return res.send({success:0, message: "Invalid credentials"});
		}
		const token = jwt.sign(user.toJSON(), "This is the most secure key for tmp", { expiresIn: '9h' });
		res.send({success: 1, loggedInUser: user, token: token});
	})
	.catch((err) => { return res.send({success:0, message: err}); })
}

let registration = async(req, res) => {
	
	// Check if this user already exisits
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send({success: 0, message: 'User already exisits!'}); 
	
	const password = crypto.createHash('sha256').update(req.body.password).digest('base64');
	const userId = await sharedController.getNextSequenceValue('Users');

	req.body["userId"] = userId.counterSeq
	req.body["password"] = password
	
	user = new User(req.body);
	
	await user.save()
	const token = jwt.sign(user.toJSON(), "This is the most secure key for tmp", { expiresIn: '9h' });
	
	res.send({success: 1, loggedInUser: user, token: token});
}

module.exports = {login, registration}