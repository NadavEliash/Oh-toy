export const dashboardService = {
    getPricesPerLabel,
    // getStockPercentage,
    // getRandomStats
}

function getPricesPerLabel(toys, labels) {
    const toysPerLabel = labels.map(label => toys.filter(toy => toy.labels.includes(label)))
    const pricesPerLabel = toysPerLabel.map(toys => toys.map(toy => toy.price))
    const averagePrices = pricesPerLabel.map(prices => getAveragePrice(prices))
    
    return averagePrices
}


function getAveragePrice(prices) {
    const sum = prices.reduce((acc, currentValue) => acc + currentValue, 0)
    return sum / prices.length
}