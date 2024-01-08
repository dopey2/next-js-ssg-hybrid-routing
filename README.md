This repository serve as a proof of concept and as template for a next js statical generated web app with both server routing and client routing.
We won't cover yet SSR in this topic only SSG, but the principle should be the same.

### Glossary
**SSG**: Static site generation. Like the old days <br/>
**CSR**: Client side rendering. <br/>
**SPA**: Single page application. Usually an SPA is also does also **CSR** <br/>
**SSR**: Server side rendering. Not covered in this template (not yet)

## Core Features

- Hybrid Rendering SSG & CSR
- Hybrid Routing:
  - Server side routing 
  - Client side routing implemented as React Components build on top of window.history & inspired from react-router-dom
- Custom DEV server (server.js) to handle redirection for client routes only
- Locale based routes eg: **/fr/app**, **/en/app** 
- Tailwind CSS with hot reload during dev mode
- Custom eslint rules configuration
- Typescript sources

## How to ?

### Start dev server

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npm run dev, launches 2 commands in parallel:
1) **tailwind:dev** --> watch for changes in your src and rebuild the tailwind.output.css with only used classes from tailwind
2) **next:dev** -->  launch a custom nextjs server (server.js). This is required for the client routes redirection. If the user visit **/fr/app/featA** first the server redirect this url to **/fr/app** and let the client handle the redirection.
___

### Build
```bash
npm run build
# or
yarn build
```

___

### Test your output

```bash
# only after npm run build
npm run serve
# or
yarn serve
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npm run serve also does few custom task. Before starting the static server it calls **./script/defineRedirections.js**.
The script writes a configuration file in **out/serve.json** which is used as the default configuration file for the package **serve**. The custom configuration does the same thing as the custom server, it handle redirections.
___



## Other helpfull informations

### Site Map

| paths         | route type                  | code mapping                   |
|---------------|-----------------------------|--------------------------------|
| /fr           | Static                      | ./src/app/[lang]/page.tsx      |
| /fr/app       | Static                      | ./src/app/[lang]/app/page.tsx  |
| /fr/app/featA | Dynamic, client side only   | ./src/app/feat/featA/index.tsx |
| /fr/app/featB | Dynamic, client side only   | ./src/app/feat/featB/index.tsx |

Same for <strong>/en</strong>


### Requesting server route vs client route explanations

<strong>*</strong> = first visit;

| from          | to            | does a GET request ? | requested  resources  |
|---------------|---------------|----------------------|-----------------------|
| *             | /fr           | YES                  | out/fr.html           |
| *             | /fr/app       | YES                  | out/fr/app.html       |
| *             | /fr/app/featA | YES                  | out/fr/app.html       |
| *             | /fr/app/featB | YES                  | out/fr/app.html       |
| /fr           | /fr/app       | YES                  | out/fr/app.html       |
| /fr           | /fr/app/featA | YES                  | out/fr/app.html       |
| /fr           | /fr/app/featB | YES                  | out/fr/app.html       |
| /fr/app       | /fr/app/featA | NO                   | Client side generated |
| /fr/app       | /fr/app/featB | NO                   | Client side generated |
| /fr/app/featA | /fr/app/featB | NO                   | Client side generated |
| /fr/app/featB | /fr/app/featA | NO                   | Client side generated |

