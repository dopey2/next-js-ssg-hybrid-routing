This repository serves as a proof of concept and a template for a Next.js web app featuring both server-side and client-side routing. While this topic focuses on static site generation (SSG) and not server-side rendering (SSR), the principles remain the same.


## Table of Contents
- [Glossary](#glossary)
- [Core Features](#core-features)
- [How to Use](#how-to-use)
  - [Start Dev Server](#start-dev-server)
  - [Build](#build)
  - [Test Your Output](#test-your-output)
- [Other Helpful Information](#other-helpful-information)
  - [Site map](#site-map)
  - [Requesting Server Route VS Client Route Explanations](#requesting-server-route-vs-client-route-explanations)
- [Q&A](#qa)
    - [Why Not Use Next.js Built-in Redirection Instead of a Custom Server?](#why-not-use-nextjs-built-in-redirection-instead-of-a-custom-server-)



## Glossary

**SSG**: Static Site Generation </br>
**CSR**: Client-Side Rendering </br>
**SPA**: Single Page Application (typically involves CSR) </br>
**SSR**: Server-Side Rendering (not covered in this template) </br>

## Core Features

- Hybrid Rendering (SSG & CSR)
- Hybrid Routing:
    - Server-Side Routing
    - Client-Side routing implemented as React Components build on top of `window.history` & inspired from
      `react-router-dom`
- Custom Dev server (server.js) to handle redirection for client routes only
- Locale based routes eg: **/fr/app**, **/en/app**
- i18n Configuration
- Tailwind CSS + Material Tailwind React, with hot reload during dev mode
- Custom ESLint  rules configuration
- TypeScript sources

## How to ?

### Start dev server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npm run dev, launches 2 commands in parallel:

1) **tailwind:dev** --> Watches for changes in your source files and rebuilds the `tailwind.output.css` with only used classes from Tailwind.
2) **next:dev** -->  launch a custom nextjs server (server.js). This is required for the client routes redirection. If
   the user visits **/fr/app/featA** first the server redirect this url to **/fr/app** and let the client handle the
   redirection.

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
The script writes a configuration file in **out/serve.json** which is used as the default configuration file for the
package **serve**. The custom configuration does the same thing as the custom server, it handle redirections.
___

## Other helpful information

### Site Map

| paths         | route type                | code mapping                   |
|---------------|---------------------------|--------------------------------|
| /fr           | Static                    | ./src/app/[lang]/page.tsx      |
| /fr/app       | Static                    | ./src/app/[lang]/app/page.tsx  |
| /fr/app/featA | Dynamic, client side only | ./src/feat/featA/index.tsx |
| /fr/app/featB | Dynamic, client side only | ./src/feat/featB/index.tsx |

The same structure applies to <strong>/en</strong>

### Requesting server route vs client route explanations

<strong>*</strong> = first visit;


| from                   | to <br/> <span style="color:blue">CHANGES</span>           | does a GET request ?         | requested  resources  |
|------------------------|------------------------------------------------------------|------------------------------|-----------------------|
| $\text{*}$             | $\color{blue}{\text{/fr}}$                                 | $\color{orange}{\text{YES}}$ | out/fr.html           |
| $\text{*}$             | $\color{blue}{\text{/fr/app}}$                             | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{*}$             | $\color{blue}{\text{/fr/app/featA}}$                       | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{*}$             | $\color{blue}{\text{/fr/app/featB}}$                       | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{/fr}$           | $\text{fr}\color{blue}{\text{/app}}$                       | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{/fr}$           | $\text{fr}\color{blue}{\text{/app/featA}}$                 | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{/fr}$           | $\text{fr}\color{blue}{\text{/app/featB}}$                 | $\color{orange}{\text{YES}}$ | out/fr/app.html       |
| $\text{/fr/app}$       | $\text{fr/app}\color{blue}{\text{/featA}}$                 | $\color{green}{\text{NO}}$   | Client side generated |
| $\text{/fr/app}$       | $\text{fr/app}\color{blue}{\text{/featB}}$                 | $\color{green}{\text{NO}}$   | Client side generated |
| $\text{/fr/app/featA}$ | $\text{fr/app}\color{blue}{\text{/featB}}$                 | $\color{green}{\text{NO}}$   | Client side generated |
| $\text{/fr/app/featB}$ | $\text{fr/app}\color{blue}{\text{/featA}}$                 | $\color{green}{\text{NO}}$   | Client side generated |
| $\text{/fr/app/featA}$ | $\color{blue}{\text{/en}}\color{black}{\text{/app/featA}}$ | $\color{orange}{\text{YES}}$ | out/fr/app.html       |

* The last scenario from **/fr/app/featA** to **/en/app/featA** could be improved via client side routing and lazy
  loading the resources to avoid a page reload. 


## Q&A

### Why not use nextjs built in redirection instead of a custom server ?

Next Js redirection doesn't work with static export.  
See https://nextjs.org/docs/messages/export-no-custom-routes
```js

// output: "export" & redirects are not compatible toghether

const nextConfig = {
    output: "export",
    async redirects() {
        return [{source: '/post/:slug(\\d{1,})', destination: '/news/:slug'}],
    }
}
```
