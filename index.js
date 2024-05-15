#! /usr/bin/env node
import inquirer from "inquirer";
const answer = await inquirer.prompt([{
        type: "number",
        name: "num1",
        message: "Enter the first number"
    },
    {
        type: "number",
        name: "num2",
        message: "Enter the second number"
    },
    {
        type: "list",
        name: "operator",
        message: "Which operation would you like to perform",
        choices: ["Addition", "Subtraction", "Multiplication", "Division"]
    }
]);
if (answer.operator == "Addition") {
    console.log(`${answer.num1} + ${answer.num2} = `, answer.num1 + answer.num2);
}
else if (answer.operator == "Subtraction") {
    console.log(`${answer.num1} - ${answer.num2} = `, answer.num1 - answer.num2);
}
else if (answer.operator == "Multiplication") {
    console.log(`${answer.num1} * ${answer.num2} = `, answer.num1 * answer.num2);
}
else {
    console.log(`${answer.num1} / ${answer.num2} = `, answer.num1 / answer.num2);
}
