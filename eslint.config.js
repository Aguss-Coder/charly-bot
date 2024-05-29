import globals from "globals"
import eslintJs from "@eslint/js"
import typescriptEslint from "typescript-eslint"
import typescriptParser from "@typescript-eslint/parser"
import typescriptPlugin from "@typescript-eslint/eslint-plugin"

export default [
  ...typescriptEslint.configs.recommended,
  { languageOptions: { globals: globals.node } },
  { ignores: ["dist/**/*.js"] },
  {
    files: ["src/**/*.ts"],
    ignores: ["eslint.config.js"],
    plugins: { '@typescript-eslint': typescriptPlugin },
    languageOptions: {
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: { ecmaVersion: 2020, project: ["./tsconfig.json"] },
    },

    rules: {
      ...eslintJs.configs.recommended.rules,
    }
  }
]