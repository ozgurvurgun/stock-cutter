import StockCutter from "../src/StockCutter.js";

// A simple comparison function
function assertEqual(actual, expected, testName) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ ${testName} passed`);
    } else {
        console.error(`❌ ${testName} failed`);
        console.error(`   Expected: ${JSON.stringify(expected, null, 2)}`);
        console.error(`   Actual:   ${JSON.stringify(actual, null, 2)}`);
    }
}

// Test 1: Main test case
function testStockCutterBasicScenario() {
    const parts = [
        { length: 5000, quantity: 2 },
        { length: 450, quantity: 30 },
        { length: 12000, quantity: 5 }
    ];

    const stockLength = 12000;
    const stockWeight = 24;

    const cutter = new StockCutter(stockLength, stockWeight);
    const results = cutter.cut([...parts]);

    const expected = {
        usedStocks: 7,
        totalWaste: 500,
        totalCutLength: 83500,
        stockWeight: 168,
        stockList: [
            { cuts: ["12000"], waste: 0 },
            { cuts: ["12000"], waste: 0 },
            { cuts: ["12000"], waste: 0 },
            { cuts: ["12000"], waste: 0 },
            { cuts: ["12000"], waste: 0 },
            { cuts: ["450*4", "5000*2"], waste: 200 },
            { cuts: ["450*26"], waste: 300 }
        ]
    };

    assertEqual(results, expected, "Basic Scenario");
}

// Test 2: No parts at all
function testNoParts() {
    const parts = [];

    const stockLength = 12000;
    const stockWeight = 24;

    const cutter = new StockCutter(stockLength, stockWeight);
    const results = cutter.cut([...parts]);

    const expected = {
        usedStocks: 0,
        totalWaste: 0,
        totalCutLength: 0,
        stockWeight: 0,
        stockList: []
    };

    assertEqual(results, expected, "No Parts");
}

// Test 3: Parts that do not fit into stock
function testPartsTooBig() {
    const parts = [
        { length: 15000, quantity: 1 }
    ];

    const stockLength = 12000;
    const stockWeight = 24;

    const cutter = new StockCutter(stockLength, stockWeight);
    const results = cutter.cut([...parts]);

    const expected = {
        usedStocks: 0,
        totalWaste: 0,
        totalCutLength: 0,
        stockWeight: 0,
        stockList: []
    };

    assertEqual(results, expected, "Parts Too Big");
}

// Test 4: Optimization with very small parts
function testManySmallParts() {
    const parts = [
        { length: 100, quantity: 50 }
    ];

    const stockLength = 1000;
    const stockWeight = 10;

    const cutter = new StockCutter(stockLength, stockWeight);
    const results = cutter.cut([...parts]);

    const expected = {
        usedStocks: 5,
        totalWaste: 0,
        totalCutLength: 5000,
        stockWeight: 50,
        stockList: [
            { cuts: ["100*10"], waste: 0 },
            { cuts: ["100*10"], waste: 0 },
            { cuts: ["100*10"], waste: 0 },
            { cuts: ["100*10"], waste: 0 },
            { cuts: ["100*10"], waste: 0 }
        ]
    };

    assertEqual(results, expected, "Many Small Parts");
}

// Run all tests
function runTests() {
    console.log("Running tests...\n");
    testStockCutterBasicScenario();
    testNoParts();
    testPartsTooBig();
    testManySmallParts();
}

runTests();
