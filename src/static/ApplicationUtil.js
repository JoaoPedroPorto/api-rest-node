class ApplicationUtil {

	static createHash(length) {
		const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
		let text = ''
		length = length || 6
		for (let i = 0; i < length; i++) {
			text += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return text
	}
}

module.exports = ApplicationUtil
