'use strict';

var mongoose = require('mongoose');
const commonHelper = require('../helpers/commonHelper');
var Schema = mongoose.Schema;

var User = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		validate: {
			validator: commonHelper.isValidEmail,
			message: props => `${props.value} is not a valid email address!`
		},
		required: [true, 'Email is required']
	},
	firstName: {type: String, minlength: 2, maxlength: 255},
	lastName: {type: String, minlength: 2, maxlength: 255},
	password_hash: { type: String, required: [true, 'Password is required']},
	ipInfo: Object
});

module.exports = mongoose.model('User', User);