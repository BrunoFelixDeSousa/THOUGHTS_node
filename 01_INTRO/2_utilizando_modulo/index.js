const fs = require('fs') // file system

fs.readFile('aarquivo.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        //console.log(err.message)
        return
    }
    console.log(data)
})