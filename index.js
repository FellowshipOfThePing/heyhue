#! /usr/bin/env node

const chalk = require("chalk");
const { program, Argument } = require("commander");

const {
	toggleLightOnCommand,
	connectCommand,
	toggleLightBrightnessCommand,
} = require("./commands");

program
	.command("connect")
	.description("Configure CLI connection to Hue Bright")
	.action(connectCommand);

program
	.command("on")
	.addArgument(new Argument("[all]", "turn on all lights"))
	.description("Turn on selected light")
	.action((all) => toggleLightOnCommand(true, all));

program
	.command("off")
	.addArgument(new Argument("[all]", "turn off all lights"))
	.description("Turn off selected light")
	.action((all) => toggleLightOnCommand(false, all));

program
	.command("dim")
	.addArgument(new Argument("[all]", "dim all lights"))
	.option("-l, --light <string>", "specify brightness level (0-255)")
	.description("Dim selected light")
	.action((all, options) => {
		const { light } = options;
		if (light) {
			if (!isNaN(light)) {
				toggleLightBrightnessCommand(parseInt(light), all);
			} else {
				console.log(
					chalk.redBright.bold("Invalid light parameter supplied")
				);
			}
		} else {
			toggleLightBrightnessCommand(0, all);
		}
	});

program
	.command("bright")
	.addArgument(new Argument("[all]", "brightemn all lights"))
	.option("-l, --light", "specify brightness level (0-255)")
	.description("Brighten selected light")
	.action((all, options) => {
		const { light } = options;
		if (light) {
			if (!isNaN(light)) {
				toggleLightBrightnessCommand(parseInt(light), all);
			} else {
				console.log(
					chalk.redBright.bold("Invalid light parameter supplied")
				);
			}
		} else {
			toggleLightBrightnessCommand(255, all);
		}
	});

program.parse();
