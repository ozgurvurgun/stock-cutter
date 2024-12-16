export default class StockCutter {
    constructor(stockLength, stockWeight) {
        this.stockLength = stockLength;
        this.stockWeight = stockWeight;
        this.usedStocks = 0;
        this.totalWaste = 0;
        this.totalCutLength = 0;
        this.stockList = [];
    }

    cut(parts) {
        const remainingParts = parts.map(part => ({ ...part })).sort((a, b) => b.length - a.length);
        const oversizedParts = remainingParts.filter(part => part.length > this.stockLength);
        if (oversizedParts.length > 0) {
            console.log("Parts that do not fit in stock:", oversizedParts);
            oversizedParts.forEach(part => {
                part.quantity = 0;
            });
        }
    
        while (remainingParts.some(part => part.quantity > 0)) {
            this.cutSingleStock(remainingParts);
        }
    
        return {
            usedStocks: this.usedStocks,
            totalWaste: this.totalWaste,
            totalCutLength: this.totalCutLength,
            stockWeight: this.usedStocks * this.stockWeight,
            stockList: this.stockList
        };
    }
    

    cutSingleStock(parts) {
        let currentStock = this.stockLength;
        let cuts = [];

        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            while (part.quantity > 0 && part.length <= currentStock) {
                cuts.push(part.length);
                currentStock -= part.length;
                part.quantity--;
            }
        }

        if (cuts.length > 0) {
            this.usedStocks++;
            this.totalWaste += currentStock;
            this.totalCutLength += cuts.reduce((sum, length) => sum + length, 0);

            const groupedCuts = this.groupCuts(cuts);
            this.stockList.push({
                cuts: groupedCuts,
                waste: currentStock
            });
        }
    }

    groupCuts(cuts) {
        const grouped = {};
        cuts.forEach(cut => {
            grouped[cut] = (grouped[cut] || 0) + 1;
        });

        return Object.entries(grouped).map(([length, count]) =>
            count > 1 ? `${length}*${count}` : `${length}`
        );
    }

    printResults() {
        console.log(`Stok uzunluğu: ${this.stockLength} mm`);
        console.log(`Kullanılan stok sayısı: ${this.usedStocks}`);
        console.log(`Kullanılan stok ağırlığı: ${this.usedStocks * this.stockWeight}`);
        console.log(`Toplam fire: ${this.totalWaste} mm`);
        console.table(
            this.stockList.map((stock, index) => ({
                "Stok #": index + 1,
                "Kesilen Parçalar": stock.cuts.join(', '),
                "Fire (mm)": stock.waste
            }))
        );
        console.log(`Toplam kesilen parça uzunluğu: ${this.totalCutLength} mm`);
        console.log(`Toplam fire: ${this.totalWaste} mm`);
    }
}
