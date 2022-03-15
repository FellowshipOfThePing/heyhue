const readline = require("readline");
const chalk = require("chalk");
const axios = require("axios");
const Conf = require("conf");

// Prompt Utils

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
	// Emit prompt
	console.log(chalk.redBright.bold(`\n${prompt}`));
	const ans = await askQuestion("(y/N): ");

	// Parse prompt response
	if (ans && (ans.toLowerCase() === "y" || ans.toLowerCase() === "yes")) {
		return true;
	}
	return false;
};

const getBaseAPIRoute = () => {
	// Get credentials from config
	const config = new Conf();
	const USERNAME = config.get("USERNAME");
	const IP_ADDRESS = config.get("IP_ADDRESS");

	// If on isn't present, notify user and return null
	if (!USERNAME || !IP_ADDRESS) {
		console.log(
			chalk.redBright.bold(
				"Hue Bridge connection not configured. Run `hue connect` to configure."
			)
		);
		return null;
	}

	// Return base address for API requests
	return `http://${IP_ADDRESS}/api/${USERNAME}`;
};

// API Utils

const getLights = async () => {
	// Get list of lights from API
	const lightsResponse = await requestGet("/lights");
	if (!lightsResponse) return;

	// Format/sort lights by ID
	const lights = Object.entries(lightsResponse).sort((a, b) => a[0] - b[0]);
	return lights.map(([key, value]) => ({
		id: key,
		label: `${key} - ${value.name}`,
	}));
};

const toggleLightsWithIds = (ids, on) => {
	const promises = [];
	ids.forEach((id) => {
		promises.push(requestPut(`/lights/${id}/state`, { on }));
	});
	Promise.all(promises);
};

// Network Utils

const requestGet = async (endpoint, requireBaseRoute = true) => {
	let BASEROUTE = "";
	if (requireBaseRoute) {
		BASEROUTE = getBaseAPIRoute();
		if (!BASEROUTE) return;
	}

	try {
		const res = await axios.get(`${BASEROUTE}${endpoint}`);
		return res.data;
	} catch (err) {
		console.log(err.message);
	}
};

const requestPut = async (endpoint, body, requireBaseRoute = true) => {
	let BASEROUTE = "";
	if (requireBaseRoute) {
		BASEROUTE = getBaseAPIRoute();
		if (!BASEROUTE) return;
	}

	try {
		const res = await axios.put(`${BASEROUTE}${endpoint}`, body);
		return res.data;
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	requestGet,
	requestPut,
	getLights,
	askQuestion,
	commandConfirmed,
	getBaseAPIRoute,
	toggleLightsWithIds,
};
