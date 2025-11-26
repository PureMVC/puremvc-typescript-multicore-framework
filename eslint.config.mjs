import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      parser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off"
    },
    ignores: ["dist/**"],
  },
];
