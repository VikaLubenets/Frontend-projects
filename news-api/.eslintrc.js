module.exports = {
    "plugins": ["prettier", "import", "@typescript-eslint"],
    "parser": "@typescript-eslint/parser",
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    "parserOptions": {
        "project": path.join(__dirname, "tsconfig.json"),
        "tsconfigRootDir": __dirname,
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "prettier/prettier": "error",
        "class-methods-use-this": "off",
        "no-unused-vars": "off", 
        "no-debugger": "off",
        "no-console": 0,
    },
    "root": true,
    "ignorePatterns": ["webpack.config.js"]
}
