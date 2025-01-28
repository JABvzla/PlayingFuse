const http = require('http');
const { FuseService } = require('./services/fuse-service');
const { MemorySymbolService } = require('./services/memory-symbol-service');
const { updatePrice } = require('./use-cases/update-prices');
const { buySymbol } = require('./use-cases/buy-symbol');

const providerService = new FuseService();
const priceService = new MemorySymbolService()

async function init() {
    await updatePrice(providerService, priceService)
    setInterval(async () => {
        await updatePrice(providerService, priceService)
    }, 5 * 60 * 1000);
}
init()

const server = http.createServer(async (req, res) => {

    if (req.method !== 'POST' || !req.url.startsWith('/stocks/')) return res.end();

    const [, , symbol, action] = req.url.split('/');
    if (!symbol || action !== 'buy') return res.end();

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
        try {
            const { price, quantity } = JSON.parse(body);
            const response = await buySymbol(price, quantity, symbol, providerService, priceService);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(e.message)
        }
    });
});

server.listen(3000, () => {
    console.log('Server listen on', 3000);
});