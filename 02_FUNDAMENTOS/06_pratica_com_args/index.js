const minimist = require('minimist')

// modulo interno
const meuModulo = require('./soma').soma

// modulo externo
const args = minimist(process.argv.slice(2))

//const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)