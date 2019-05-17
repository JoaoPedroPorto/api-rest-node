const UserModel = require('../models/User')

class UserDAO {

    static save(userReq) {
		const user = new UserModel(userReq)
		return user.save().catch(err => {
			throw err
		})
	}

	static findSelectSort(query, select, sort) {
		return UserModel.find(query)
			.select(select)
			.sort(sort)
			.catch(err => {
				throw err
			})
	}

	static findOneAndUpdate(query, update) {
		return UserModel.findOneAndUpdate(query, update, { new: true }).catch(err => {
			throw err
		})
	}

	static findOne(query) {
		return UserModel.findOne(query).catch(err => {
			throw err
		})
	}

}

module.exports = UserDAO