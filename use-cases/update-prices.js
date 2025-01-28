exports.updatePrice = async function (providerService, priceService) {
    while (true) {
        const response = await providerService.getNextPage()
        const { items, nextToken } = response.data
        priceService.updateItems(items)
        if(!nextToken) break;
    }
}