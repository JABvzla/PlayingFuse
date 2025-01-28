exports.FuseService = class FuseService {
    apiKey = 'nSbPbFJfe95BFZufiDwF32UhqZLEVQ5K4wdtJI2e';
    headers = { 'x-api-key': this.apiKey, 'Content-Type': 'application/json' };
    baseUrl = 'https://api.challenge.fusefinance.com';
    token = '';

    async #fetchData(url, options = {}) {
        const response = await fetch(url, { headers: this.headers, ...options });
        if (!response.ok) throw new Error(`FUSE_SERVICE_REQUEST_FAILED: ${response.statusText}`);
        return response.json();
    }

    async buy(price, quantity, symbol) {
        const url = `${this.baseUrl}/stocks/${symbol}/buy`;
        return this.#fetchData(url, {
            method: 'POST',
            body: JSON.stringify({ price, quantity })
        });
    }

    async get(nextToken) {
        const url = `${this.baseUrl}/stocks?nextToken=${nextToken}`;
        return this.#fetchData(url);
    }

    async getNextPage() {
        const response = await this.get(this.token);
        if (response.data?.nextToken) this.token = response.data.nextToken;
        return response;
    }
}