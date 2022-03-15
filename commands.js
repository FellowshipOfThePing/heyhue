const inquirer = require("inquirer");
const Conf = require("conf");
const chalk = require("chalk");

const {
	getLights,
	askQuestion,
	commandConfirmed,
	getBaseAPIRoute,
	toggleLightsWithIds,
} = require("./utils");

const toggleLightOnCommand = async (on, all) => {
	// Check that CLI is configured
	const BASEROUTE = getBaseAPIRoute();
	if (!BASEROUTE) return;

	// Get list of lights
	const lightOptions = await getLights();

	// If "all" is specified in args, turn on/off all lights
	if (all) {
		const lightIds = lightOptions.map((light) => light.id);
		return toggleLightsWithIds(lightIds, on);
	}

	// Format Question
	const question = {
		type: "list",
		name: "light",
		message: `Choose which light to turn ${on ? "on" : "off"}`,
		choices: lightOptions.map((light) => light.label).concat("All"),
	};

	// Ask user which light to turn off
	inquirer.prompt(question).then((answers) => {
		const lightName = answers.light;
		const lightId = lightName.split("-")[0].trim();

		// Turn off light(s)
		if (lightId === "All") {
			const lightIds = lightOptions.map((light) => light.id);
			toggleLightsWithIds(lightIds, on);
		} else {
			toggleLightsWithIds([lightId], on);
		}
	});
};

const connectCommand = async () => {
	// Check if IP already exists in Conf store
	const config = new Conf();
	let settingNewIp = true;
	if (config.get("IP_ADDRESS", null)) {
		const confirmed = await commandConfirmed(
			"You already have an IP address saved. Do you want to replace it?"
		);
		if (!confirmed) settingNewIp = false;
	}

	if (settingNewIp) {
		// Ask for IP
		const ipAddress = await askQuestion(
			"Please enter the IP Address of your Hue Bridge: "
		);

		// Save new IP
		config.set("IP_ADDRESS", ipAddress);
		console.log(chalk.green.bold("New IP Saved!"));
	}

	// Check if username already exists in Conf store
	let settingNewUsername = true;
	if (config.get("USERNAME", null)) {
		const confirmed = await commandConfirmed(
			"You already have a username saved. Do you want to replace it?"
		);
		if (!confirmed) settingNewUsername = false;
	}

	if (settingNewUsername) {
		// Ask for username
		const username = await askQuestion(
			"Please enter an authorized username: "
		);

		// Save new IP
		config.set("USERNAME", username);
		console.log(chalk.green.bold("Username Saved!"));
	}
};

module.exports = {
	toggleLightOnCommand,
	connectCommand,
};
