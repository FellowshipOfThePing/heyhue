module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "import", "prettier"],
	rules: {
		quotes: ["error", "double"],
		semi: ["error", "always"],
		eqeqeq: 1,

		"linebreak-style": ["error", "unix"],
		"object-shorthand": 2,
		"func-style": ["error", "expression"],
		"default-param-last": 2,
		"nonblock-statement-body-position": 2,
		"spaced-comment": 1,
		"capitalized-comments": [
			"error",
			"always",
			{
				ignorePattern:
					"if|for|let|const|try|^.*=.*$|console|import|use.*$|set.*$",
				ignoreInlineComments: true,
				ignoreConsecutiveComments: true,
			},
		],

		"no-unused-vars": 1,
		"no-var": 2,
		"no-new-object": 2,
		"no-useless-escape": 2,
		"no-param-reassign": 1,
		"no-duplicate-imports": 2,
		"no-multi-assign": 2,
		"no-unneeded-ternary": 2,
		"no-underscore-dangle": 2,
		"no-constant-condition": 1,

		"import/no-mutable-exports": 2,
		"import/first": 2,

		"prefer-arrow-callback": 2,
		"prefer-const": 1,
		"prefer-object-spread": 2,
		"prefer-template": 2,

		"prettier/prettier": 2,

		"react/display-name": 1,
		"react/prop-types": 0,
		"react/jsx-filename-extension": [2, { extensions: [".js"] }],
		"react/self-closing-comp": 2,
	},
	globals: {
		paragon: "writable",
		heap: "writable",
		mixpanel: "writable",
		amplitude: "writable",
	},
	overrides: [
		{
			files: ["src/commands/*"],
			rules: {
				"react/display-name": "off",
			},
		},
	],
};
