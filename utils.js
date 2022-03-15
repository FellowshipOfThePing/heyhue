const readline = require("readline");
const chalk = require("chalk");
const axios = require("axios");
const Conf = require("conf");

const askQuestion = (query) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			rl.close();
			resolve(ans);
		})
	);
};

const commandConfirmed = async (prompt) => {
	console.log(chalk.redBright.bold(`\n${prompt}`));
	const ans = await askQuestion("(y/N): ");

	// Parse prompt response
	if (ans && (ans.toLowerCase() === "y" || ans.toLowerCase() === "yes")) {
		return true;
	}
	return false;
};

module.exports = {
	askQuestion,
	commandConfirmed,
};
