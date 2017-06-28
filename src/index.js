const merry = require('merry');
const got = require('got');
const bankai = require('bankai');

const app = merry();
const assets = bankai('./src/components/index.js', {});

app.route('GET', '/', (req, res) => {
  assets.html().pipe(res);
});

app.route('GET', '/bundle.css', (req, res) => {
  assets.css().pipe(res);
});

app.route('GET', '/bundle.js', (req, res) => {
  assets.js().pipe(res);
});

app.route('GET', '/favicon.ico', (req, res, ctx) => {
  ctx.send(404, ' ', { 'Content-Type': 'text/plain' });
});

app.route('GET', '/ping', (req, res, ctx) => {
  ctx.send(200, 'pong', { 'Content-Type': 'text/plain' });
});

app.route('GET', '/health', (req, res, ctx) => {
  got.stream.get('https://registry.npmjs.org').on('error', (error) => {
    ctx.send(500, error);
  }).pipe(res);
});

app.route('POST', '/xxx', (req, res, ctx) => {
  ctx.send(500, 'Not implemented.');
});

app.route('default', (req, res, ctx) => {
  ctx.log.info('Route doesnt exist');
  ctx.send(404, 'Page not found.', { 'Content-Type': 'text/plain' });
});

app.listen(3000);
