const path = require('path')

const config = {}
config.secret = process.env.PIXORE_SECRET || 'super duper secret for pixore'

config.MONGODB_URI = process.env.MONGODB_URI
config.PORT = Number(process.env.PORT) || 8000
config.isDev = process.env.NODE_ENV === 'development'
config.isTest = process.env.NODE_ENV === 'test'
config.ROOT_PATH = path.join(__dirname, '..', '..', '..', '..')
config.CLIENT_PATH = path.join(config.ROOT_PATH, 'src', 'client')
config.APP_PATH = path.join(config.CLIENT_PATH, 'index.js')
config.MODULES_PATH = path.join(config.ROOT_PATH, 'node_modules')
config.ASSETS_PATH = path.join(config.CLIENT_PATH, 'assets')
config.TEMPLATE_PATH = path.join(config.CLIENT_PATH, 'templates')
config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'production.pug')

module.exports = config
