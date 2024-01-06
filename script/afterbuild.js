const fs = require("fs");

/**
 * https://github.com/vercel/serve-handler
 * @type {{rewrites: [{destination: string, source: string},{destination: string, source: string}]}}
 */
const serve = {
    "rewrites": [
        { "source": "/fr/app/**", "destination": "/fr/app.html" },
        { "source": "/en/app/**", "destination": "/en/app.html" },
        { "source": "/", "destination": "/fr.html" },
    ],
    unlisted: ["*"]
}

fs.writeFileSync(`${__dirname}/../out/serve.json`, JSON.stringify(serve, null, 2), 'utf8');

