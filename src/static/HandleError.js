const HttpCodes = require('../static/HttpCodes')

module.exports = function HandleError(err, res) {
    if (err.code && err.code == 420) {
		res.status(HttpCodes.application_exception).json({
			error: err
		})
		return
	}
	res.status(HttpCodes.internal_server_error).json({
		error: { code: 500, message: 'Erro interno do servidor... ' + err.message }
	})
	return
}