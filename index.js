#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Welcome message
console.log(chalk.whiteBright.bgCyan.bold("<---------- Welcome To Haya Sikander's Simple Calculator ---------->"));
const answer = await inquirer.prompt([
    {
        type: "number",
        name: "num1",
        message: chalk.cyan("Enter the first number:"),
    },
    {
        type: "number",
        name: "num2",
        message: chalk.cyan("Enter the second number:"),
    },
    {
        type: "list",
        name: "operator",
        message: chalk.redBright("Which operation would you like to perform?"),
        choices: [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
        ],
    }
]);
if (answer.operator === "Addition") {
    console.log(chalk.green(`${answer.num1} + ${answer.num2} = `) + chalk.white.bold(answer.num1 + answer.num2));
}
else if (answer.operator === "Subtraction") {
    console.log(chalk.yellow(`${answer.num1} - ${answer.num2} = `) + chalk.white.bold(answer.num1 - answer.num2));
}
else if (answer.operator === "Multiplication") {
    console.log(chalk.cyan(`${answer.num1} * ${answer.num2} = `) + chalk.white.bold(answer.num1 * answer.num2));
}
else {
    if (answer.num2 !== 0) {
        console.log(chalk.red(`${answer.num1} / ${answer.num2} = `) + chalk.white.bold(answer.num1 / answer.num2));
    }
    else {
        console.log(chalk.red.bold("Error: Division by zero is not allowed."));
    }
}
// Exit message
console.log(chalk.whiteBright.bold("\nThank you for using the Simple Calculator! Have a great day!"));

