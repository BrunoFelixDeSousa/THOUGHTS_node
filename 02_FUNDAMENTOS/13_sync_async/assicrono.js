const fs = require('fs')

console.log('inicio')

fs.writeFile('arquivo.txt', 'ola1', function(err) {
    setTimeout(function() {
        console.log('arquivo criado 1!');
    }, 3000)
});

fs.writeFile('arquivo.txt', 'ola2', function(err) {
    setTimeout(function() {
        console.log('arquivo criado 2!');
    }, 1000)
});

fs.writeFile('arquivo.txt', 'ola3', function(err) {
    setTimeout(function() {
        console.log('arquivo criado 3!');
    }, 2000)
});

console.log('fim')