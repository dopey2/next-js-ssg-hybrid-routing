const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            const app_fr_regex = new RegExp("/fr/app/*");
            const app_en_regex = new RegExp("/en/app/*");

            if(pathname === "/") {
                await app.render(req, res, '/fr', query);
            } else if(app_fr_regex.test(pathname)) {
                await app.render(req, res, '/fr/app', query);
            } else if(app_en_regex.test(pathname)) {
                await app.render(req, res, '/en/app', query)
            } else {
                await handle(req, res, parsedUrl)
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    })
    .once('error', (err) => {
        console.error(err)
        process.exit(1)
    })
    .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`)
    })
});
