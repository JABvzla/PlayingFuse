exports.MemorySymbolService = class MemorySymbolService {
    data = {}

    updateItems(items) {
        this.data = { ...this.data, ...this.#mapperObject(items) }
    } 

    getCurrentPrice(symbol) {
        return this.data[symbol]?.price
    }

    #mapperObject = (list) => {
        return list.reduce((acc, obj) => {
            if (!obj.symbol) return acc;
            return { ...acc, [obj.symbol]: obj };
        }, {});
    };
}