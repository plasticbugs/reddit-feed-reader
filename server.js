const serve = require('serve');

const server = serve(__dirname + '/dist', {
  port: 3000,
  ignore: ['node_modules']
})