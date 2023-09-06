module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "./.eslintrc-auto-import.json",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    // '@antfu'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "vue/multi-word-component-names": [
    //   "error",
    //   {
    //     ignores: ["default"],
    //   },
    // ],
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "no-undef": 0,
  },
  // files: ["*.ts", "*.tsx", "*.vue"],
};
