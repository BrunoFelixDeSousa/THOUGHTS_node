const ur = require('url')
const address = 'https://github.com/BrunoFelixDeSousa'
const parsedUrl = new URL(address)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.href)
console.log(parsedUrl.port)