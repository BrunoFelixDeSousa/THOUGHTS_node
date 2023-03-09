const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemysql', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL!')
} catch (error) {
    console.log(`Não foi possivel conectar: ${error}`)
}

exports.default = sequelize