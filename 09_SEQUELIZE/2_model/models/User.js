/*
Este código é um exemplo de um modelo definido usando a biblioteca Sequelize para Node.js. O Sequelize
 é uma ORM (Object-Relational Mapping) que permite mapear objetos JavaScript para tabelas de um banco
 de dados relacional, simplificando o processo de consulta, inserção, atualização e exclusão de dados.
 */
const { DataTypes } = require('sequelize')

/*
O código começa importando o módulo DataTypes da biblioteca Sequelize e o módulo de conexão do banco
de dados definido em ../db/conn.
 */
const db = require('../db/conn')

/*
Em seguida, é definido um modelo de usuário chamado "User" utilizando o método define() do objeto de
 conexão do banco de dados (db). Esse modelo representa uma tabela de usuários que terá três colunas:
  "name" (nome), "occupation" (ocupação) e "newsletter" (boletim informativo).
 */
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

/*
Por fim, o modelo "User" é exportado para ser usado em outras partes do aplicativo.
 */
module.exports = User