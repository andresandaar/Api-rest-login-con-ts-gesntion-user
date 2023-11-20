{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint", "import", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": "error",
    "import/no-unresolved": [
      "error",
      {
        "plugins": [
          "module-resolve",
          {
            "alias": {
              "@routes": "./src/routes",
              "@constrollers": "./src/controllers",
              "@config": "./src/confing"
            }
          }
        ]
      }
    ]
  }
}