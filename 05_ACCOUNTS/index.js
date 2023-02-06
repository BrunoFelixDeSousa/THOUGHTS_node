// modulos externos
import inquirer from "inquirer";
import chalk from "chalk";
// modulo interno
import fs from "fs"

console.log("Iniciando o Account")

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'o que você deseja?',
            choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair'],
        },
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar conta') {
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar saldo') {
            getAccountBalance()
        }else if (action === 'Sacar') {
            withdraw()
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('obrigado por usar o Account'))
            process.exit()
        }
    })
    .catch((err) => console.log(err))
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir!'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:'
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if ( !fs.existsSync('accounts') ) {
            fs.mkdirSync('accounts')
        }

        if ( fs.existsSync(`accounts/${accountName}.json`) ) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome.'))
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            function(err) {
                console.log(err)
            }
        )

        console.log(chalk.green('Parabens sua conta foi criado!!'))


        operation()
    })
    .catch((err) => console.log(err))
}

// add an amount to user account
function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?: '
        }
    ])
    .then( (answer) => {

        const accountName = answer['accountName']
        // verify if account exists
        if ( !checkAccount(accountName) ) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?:'
            }
        ])
        .then( (answer) => {
            
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()
        } )
    } )
    .catch(err => console.log(err))
}

function checkAccount( accountName ) {
    if( !fs.existsSync(`accounts/${accountName}.json`) ) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!.'))
        return false
    }

    return true
}

function getAccount( accountName ) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)

}

function addAmount( accountName, amount ) {
    const accountData = getAccount(accountName)
    
    if ( !amount ) {
        console.log(
            chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
        )

        return deposit()
    }

    accountData.balance =parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(
        chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta!`)
    )
}

// show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?:'
        }
    ]) 
    .then((answer) => {
        const accountName = answer['accountName']

        if( !checkAccount(accountName)) {
            return(getAccountBalance())
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(
            `Ola, o saldo da sua conta é de R$ ${accountData.balance}`
        ))
        operation()
    })
    .catch(err => console.log(err))
}

function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?:'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
        )
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponivel'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi realizado um saqe de ${amount} da sua conta`))
    operation()
}