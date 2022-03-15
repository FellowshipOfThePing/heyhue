#! /usr/bin/env node

// Note - Use `yarn global add file:$PWD` or `yarnSelf` to self-install

const { program, Argument } = require("commander");

const { toggleLightOnCommand, connectCommand } = require("./commands");

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

// Example - No args
// program
// 	.command("current")
// 	.description("Print current config name")
// 	.action(currentCommand);

// Example - required args
// program
// 	.command("resetZendesk")
// 	.addArgument(new Argument("<tenant_id>", "id of tenant to reset"))
// 	.description(
// 		"Clear all Zendesk data from a tenant and disconnect Paragon integration"
// 	)
// 	.action(resetZendeskCommand);

// Example - optional args
// program
// 	.command("logoutUsers")
// 	.addArgument(new Argument("[userId]", "id of user to log out"))
// 	.description(
// 		"Delete all access_tokens, logging all (or just specified) users out."
// 	)
// 	.action(logoutUsers);

// Example - with choices
// program
// 	.command("describe")
// 	.addArgument(
// 		new Argument("<type>", "type of entity to describe").choices([
// 			"tenants",
// 			"ctas",
// 			"cta_phases",
// 			"cta_todos",
// 			"accounts",
// 			"contacts",
// 			"cta_templates",
// 			"cta_template_phases",
// 			"cta_template_todos",
// 		])
// 	)
// 	.addArgument(new Argument("<id>", "id of entity to describe"))
// 	.description("Describe an entity from the given table, with the given id")
// 	.action(describeCommand);

program.parse();
