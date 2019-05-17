const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdDate: {
        type: Date,
        default: Date.now
	},
	name: {
        type: String,
        required: [ true, 'O campo nome é obrigatório...' ]
    },
	mail: {
		type: String,
		required: [ true, 'O campo e-mail é obrigatório...' ],
        unique: true,
        lowercase: true,
		match: /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: [ true, 'A senha é obrigatória...' ],
		select: false
    },
    status: {
		type: String,
		enum: [ 'ACTIVE', 'INACTIVE', 'PENDING' ]
	}
})

module.exports = mongoose.model('User', userSchema)