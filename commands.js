const inquirer = require("inquirer");
const Conf = require("conf");
const chalk = require("chalk");
const { discovery, api } = require("node-hue-api");

const {
	getLights,
	askQuestion,
	getBaseAPIRoute,
	updateLightStates,
} = require("./utils");

const findHueBridgeIP = async () => {
	const discoveryResults = await discovery.nupnpSearch();

	if (discoveryResults.length === 0) {
		console.log(chalk.redBright.bold("Failed to find any Hue Bridges"));
		return null;
	} else {
		// Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
		return discoveryResults[0].ipaddress;
	}
};

const connectCommand = async () => {
	// Ask for IP
	console.log(chalk.green.bold("Detecting IP Address..."));
	const ipAddress = await findHueBridgeIP();
	if (!ipAddress) return;

	// Save new IP
	const config = new Conf();
	config.set("IP_ADDRESS", ipAddress);
	console.log(chalk.green.bold(`Hue Bridge Found: ${ipAddress}`));

	// Create SDK instance of API (unauthenticated)
	const unauthenticatedApi = await api.createLocal(ipAddress).connect();

	// Emit prompt
	console.log(
		chalk.blueBright.bold(
			"\nPress the Link button on your Hue Bridge, then press enter on your keyboard."
		)
	);
	await askQuestion("...");

	let createdUser;
	try {
		// Create Hue User
		createdUser = await unauthenticatedApi.users.createUser(
			"hey-hue",
			"hey-hue-client"
		);
		config.set("USERNAME", createdUser.username);
		console.log(chalk.green.bold("Successfully connected to Hue Bridge"));
	} catch (err) {
		if (err.getHueErrorType() === 101) {
			console.error(
				"The Link button on the bridge was not pressed. Please press the Link button and try again."
			);
		} else {
			console.error(`Unexpected Error: ${err.message}`);
		}
	}
};

const toggleLightBrightnessCommand = async (brightness, all) => {
	// Check that CLI is configured
	const BASEROUTE = getBaseAPIRoute();
	if (!BASEROUTE) return;

	// Get list of lights
	const lightOptions = await getLights();

	// If "all" is specified in args, turn on/off all lights
	if (all) {
		const lightIds = lightOptions.map((light) => light.id);
		return updateLightStates(lightIds, "bri", brightness);
	}

	// Format Question
	const question = {
		type: "list",
		name: "light",
		message: `Choose which lights to turn ${
			brightness === 0 ? "dim" : "brighten"
		}`,
		choices: lightOptions.map((light) => light.label).concat("All"),
	};

	// Ask user which light to dim/brighten
	inquirer.prompt(question).then((answers) => {
		const lightName = answers.light;
		const lightId = lightName.split("-")[0].trim();

		// Update light(s)
		if (lightId === "All") {
			const lightIds = lightOptions.map((light) => light.id);
			updateLightStates(lightIds, "bri", brightness);
		} else {
			updateLightStates([lightId], "bri", brightness);
		}
	});
};

const toggleLightOnCommand = async (on, all) => {
	// Check that CLI is configured
	const BASEROUTE = getBaseAPIRoute();
	if (!BASEROUTE) return;

	// Get list of lights
	const lightOptions = await getLights();

	// If "all" is specified in args, turn on/off all lights
	if (all) {
		const lightIds = lightOptions.map((light) => light.id);
		return updateLightStates(lightIds, "on", on);
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
			updateLightStates(lightIds, "on", on);
		} else {
			updateLightStates([lightId], "on", on);
		}
	});
};

module.exports = {
	toggleLightOnCommand,
	connectCommand,
	toggleLightBrightnessCommand,
};
