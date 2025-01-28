const MAX_THRESHOLD = 0.02

function validateThresholdDiference(currentPrice, userPrice) {
    const priceDifference = Math.abs(currentPrice - userPrice);
    const threshold = currentPrice * MAX_THRESHOLD;
    if (priceDifference > threshold) throw new Error("MAX_THRESHOLD_EXCEEDED");
}

exports.buySymbol = async function (userPrice, quantity, symbol, providerService, priceService) {
    const currentPrice = await priceService.getCurrentPrice(symbol);
    validateThresholdDiference(currentPrice, userPrice)

    return providerService.buy(userPrice, quantity, symbol);
};