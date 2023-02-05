import chalk from "chalk"

const nota = 5

if (nota >= 7) {
    console.log(chalk.green('parabens! você está aprovado.'))
} else {
    console.log(chalk.bgRed('Reprovado.')) 
}
