#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

let currentBalance: number = 10000;
const pin = 12345;

console.log(
  chalk.red.bold("<-------  Welcome to Haya Sikander's ATM  ------->")
);

async function promptPin(): Promise<number> {
  let response = await inquirer.prompt([
    {
      type: "number",
      name: "pincode",
      message: "Enter your pin number",
    },
  ]);
  return response.pincode;
}

async function promptOperation(): Promise<string> {
  let response = await inquirer.prompt([
    {
      type: "list",
      name: "operation",
      message: "What would you like to do?",
      choices: ["Deposit", "Withdraw", "Check Balance"],
    },
  ]);
  return response.operation;
}

async function promptAmount(message: string): Promise<number> {
  let response = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: message,
    },
  ]);
  return response.amount;
}

async function promptYesNo(message: string): Promise<string> {
  let response = await inquirer.prompt([
    {
      type: "list",
      name: "question",
      message: message,
      choices: ["Yes", "No"],
    },
  ]);
  return response.question;
}

async function handleDeposit() {
  let amount = await promptAmount("What amount would you like to deposit?");
  currentBalance += amount;
  console.log(chalk.green(`Your amount was successfully deposited`));
  if (
    (await promptYesNo("Would you like to check your current balance?")) ===
    "Yes"
  ) {
    console.log(chalk.blue(`Your current balance is ${currentBalance}`));
  } else {
    console.log(chalk.red("Thank you for using our ATM!"));
  }
}

async function handleWithdrawal() {
  let amount = await promptAmount("What amount would you like to withdraw?");
  if (amount <= currentBalance) {
    currentBalance -= amount;
    console.log(chalk.green(`Your withdrawal was successful`));
  } else {
    console.log(chalk.red("You don't have enough money in your account!"));
    if ((await promptYesNo("Would you like to apply for a loan?")) === "Yes") {
      let loanAmount = await promptAmount("How much would you like to borrow?");
      currentBalance += loanAmount;
      console.log(
        chalk.green(
          `Your loan has been approved and your current balance is ${currentBalance}`
        )
      );
      if (
        currentBalance >= amount &&
        (await promptYesNo(
          "Would you like to continue your process of withdrawal?"
        )) === "Yes"
      ) {
        currentBalance -= amount;
        console.log(chalk.green("Your withdrawal was successful"));
      } else {
        console.log(chalk.red("Your transaction was cancelled!"));
      }
    } else {
      console.log(chalk.red.bold("Withdrawal unsuccessful!"));
    }
  }

  if (
    (await promptYesNo("Would you like to check your current balance?")) ===
    "Yes"
  ) {
    console.log(chalk.blue(`Your current balance is ${currentBalance}`));
  } else {
    console.log(chalk.red("Thank you for using our ATM!"));
  }
}

async function main() {
  let pincode = await promptPin();

  if (pincode === pin) {
    console.log(chalk.green.bold("Your pin is correct"));
    let operation = await promptOperation();

    if (operation === "Deposit") {
      await handleDeposit();
    } else if (operation === "Withdraw") {
      await handleWithdrawal();
    } else {
      console.log(chalk.blue(`Your current balance is ${currentBalance}`));
    }
  } else {
    console.log(chalk.red("Invalid input! Please try again."));
    pincode = await promptPin();

    if (pincode === pin) {
      console.log(chalk.green.bold("Your pin is correct"));
      let operation = await promptOperation();

      if (operation === "Deposit") {
        await handleDeposit();
      } else if (operation === "Withdraw") {
        await handleWithdrawal();
      } else {
        console.log(chalk.blue(`Your current balance is ${currentBalance}`));
      }
    } else {
      console.log(chalk.red("Invalid input! Login unsuccessful"));
    }
  }
}

main();

