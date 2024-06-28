// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: ['@prettier/plugin-pug'],

  printWidth: 120,
  singleQuote: true,
  useTabs: true,
  tabWidth: 2,
  pugAttributeSeparator: "none",
};