const arvish = require('@jopemachine/arvish')
const languages = require('@vitalets/google-translate-api/languages')

module.exports.capitalize = x =>
	x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()

module.exports.hasOwnProperty = (obj, prop) =>
	Object.hasOwnProperty.call(obj, prop)

module.exports.langNames = Object.keys(languages)
	.filter(lang => lang !== 'auto')
	.map(code => languages[code])
	.filter(x => typeof x === 'string')
	.map(x => x.toLowerCase())

module.exports.CachedList = class CachedList {
	constructor(key) {
		this.key = key

		if (!arvish.cache.has(this.key)) {
			arvish.cache.set(this.key, [])
		}
	}

	get all() {
		return arvish.cache.get(this.key)
	}

	append(item) {
		const old = arvish.cache.get(this.key)
		arvish.cache.set(this.key, old.concat(item))

		return this
	}
}

module.exports.tryAsync = async (fn, catcher) => {
	try {
		const result = await fn()
		return result
	} catch (error) {
		return catcher(error)
	}
}
