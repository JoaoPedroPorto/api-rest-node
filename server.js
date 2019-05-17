require('dotenv').config()
const http = require('http')
const api = require('./api')
const httpServer = http.createServer(api)

httpServer.listen(3000, () => {
	console.log('Servidor rodando em localhost:3000')
	console.log('Para derrubar o servidor: control + c')
})
