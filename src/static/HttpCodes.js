class HttpCodes {

	static get success() {
		return 200
	}

	static get bad_request() {
		return 400
	}

	static get unauthorized() {
		return 401
	}

	static get not_found() {
		return 404
	}

	static get awaiting_liberation() {
		return 419
	}

	static get application_exception() {
		return 420
	}

	static get internal_server_error() {
		return 500
	}

}

module.exports = HttpCodes

