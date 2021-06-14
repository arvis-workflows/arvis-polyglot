const arvish = require('arvish')

const workflow = require('./lib');

(async () => {
	try {
		const out = await workflow(arvish.input)

		if (out) {
			arvish.output(out)
		}
	} catch (err) {
		const messages = []

		if (err.tip) {
			messages.push(err.tip)
		}

		messages.push('Activate this item to try again.')
		messages.push('⌘L to see the stack trace')

		arvish.output([{
			title: `Error: ${err.message}`,
			subtitle: messages.join(' | '),
			autocomplete: err.autocomplete ? err.autocomplete : '',
			icon: {
				path: arvish.icon.error
			},
			valid: false,
			text: {
				largetype: err.stack,
				copy: err.stack
			}
		}])
	}
})()
