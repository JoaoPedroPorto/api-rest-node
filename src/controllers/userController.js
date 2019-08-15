// LIBS
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// UTIL
const ApplicationUtil = require('../static/ApplicationUtil')

// DAO
const UserDAO = require('../DAO/UserDAO')

// ENUM
const Enum = require('../constant/Enum')

// STATIC AND CODES HTTP
const HttpCodes = require('../static/HttpCodes')
const HandleError = require('../static/HandleError')

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : undefined
        if (!id) throw { code: 420, message: 'Existem parâmetros que não foram passados na requisição...' }
        const query = { 
            _id: id,
            status: {
				$not: /^INACTIVE*/
			}
        }
		const update = {
            $set: {
                status: Enum.STATUS.INACTIVE
			}
		}
		const userUpdated = await UserDAO.findOneAndUpdate(query, update)
		if (!userUpdated) throw { code: 420, message: 'Não foi possível atualizar usuário, pois o mesmo não existe ou se encontra excluído...' }
        res.status(HttpCodes.success).json({
            message: 'Usuário excluído com sucesso!'
        })
    } catch (err) {
        HandleError(err, res)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : undefined
        const name = req.body.name ? req.body.name.trim() : undefined
        if (!id || !name) throw { code: 420, message: 'Existem parâmetros que não foram passados na requisição.' }
        const query = { 
            _id: id,
            status: {
				$not: /^INACTIVE*/
			}
        }
		const update = {
            $set: {
                name: name,
                status: Enum.STATUS.ACTIVE
			}
		}
		const userUpdated = await UserDAO.findOneAndUpdate(query, update)
		if (!userUpdated) throw { code: 420, message: 'Não foi possível atualizar usuário, pois o mesmo não existe ou se encontra excluído...' }
        res.status(HttpCodes.success).json({
            message: 'Usuário atualizado com sucesso!'
        })
    } catch (err) {
        HandleError(err, res)
    }
}

exports.listAllUsers = async (req, res) => {
    try {
        const query = {
			status: {
				$not: /^INACTIVE*/
			}
		}
		const select = {
			_id: 1,
			name: 1,
            mail: 1,
            status: 1
		}
		const sort = { name: 1 }
		const users = await UserDAO.findSelectSort(query, select, sort)
        res.status(HttpCodes.success).json({
            message: 'Listagem de usuários retornada com sucesso!',
            data: users
        })
    } catch (err) {
        HandleError(err, res)
    }
}

exports.createUser = async (req, res) => {
    try {
        let { name, mail } = req.body
        name = name ? name.trim() : undefined
        mail = mail ? mail.trim() : undefined
        if (!name || !mail) throw { code: 420, message: 'Existem parâmetros que não foram passados na requisição.' }
        const query = {
            mail: mail,
        }
        const user = await UserDAO.findOne(query)
        if (user && user.status !== 'INACTIVE') throw { code: 420, message: 'E-mail já vinculado a um usuário ativo do sistema...' }
        const password = ApplicationUtil.createHash(8)
        const hash = await bcrypt.hash(password, 10)
        if (!hash) throw { code: 420, message: 'Não foi possível gerar a senha para o usuário...' }
        if (user) { // EDITA USUARIO
            const update = {
                $set: {
                    name: name,
                    status: Enum.STATUS.PENDING,
                    password: hash
                }
            }
            const userUpdated = await UserDAO.findOneAndUpdate(query, update)
            if (!userUpdated) throw { code: 420, message: 'Não foi possível criar o usuário...' }
            res.status(HttpCodes.success).json({
                message: 'Usuário incluído com sucesso!'
            })
            return 
        }
        // CRIA USUARIO
        const newUser = {
            _id: new mongoose.Types.ObjectId(),
            name: name,
            mail: mail,
            password: hash,
            status: Enum.STATUS.PENDING 
        }
        const userSaved = await UserDAO.save(newUser)
        if (!userSaved) throw { code: 420, message: 'Não foi possível criar o usuário.' }
        res.status(HttpCodes.success).json({
			message: 'Usuário incluído com sucesso!'
		})
    } catch (err) {
        HandleError(err, res)
    }
}