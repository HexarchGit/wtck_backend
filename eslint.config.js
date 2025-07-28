const prettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        process: "readonly",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Пример правил из твоего старого конфига:
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_|next" }],
      "no-console": ["error", { allow: ["error"] }],
      // Правила prettier (выключают конфликтующие стилистические правила)
      ...prettier.rules,
    },
  },
];
