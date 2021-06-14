const arvish = require('arvish')

const {env} = process

arvish.config.set(env.config_variable, env.config_value)
