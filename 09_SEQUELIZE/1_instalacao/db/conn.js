// Importa a classe Sequelize da biblioteca Sequelize. Isso permite
// que o código use as funcionalidades fornecidas pela biblioteca Sequelize.
import { Sequelize } from "sequelize";

// Cria uma nova instância da classe Sequelize, que representa uma conexão
// com o banco de dados MySQL. Os argumentos fornecidos são o nome do
// banco de dados, o nome de usuário, a senha e um objeto com alguma
//s opções, como o host e o tipo de banco de dados.
const sequelize = new Sequelize('nodemysql', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
})

// Tenta autenticar a conexão com o banco de dados usando o método
// authenticate() da instância do Sequelize. Se a conexão for bem-sucedida,
// uma mensagem de sucesso é exibida no console. Se a conexão falhar,
// uma mensagem de erro é exibida no console.
try {
    sequelize.authenticate()
    console.log('Conectamos com o Sequelize!')
} catch (error) {
    console.error('Não foi possível conectar:', error)
}

// Exporta a instância do Sequelize criada para que ela
// possa ser usada em outros módulos do código que
// precisem acessar o banco de dados. Isso permite
// que a conexão seja reutilizada em diferentes partes
// do código, em vez de criar uma nova conexão toda vez que for necessária.
module.exports = sequelize
