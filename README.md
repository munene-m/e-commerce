# e-commerce

--Still work in progress--

This project is built using Vue.js and Tailwind CSS and is an e-commerce website where users can shop for various items in various categories. The admin/shop owner can add items to the website and make changes to items in the inventory as well as delete items. 
This repository represents the client-side of the application and it is connected to a Node.js server that stores data in a MongoDB database.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
