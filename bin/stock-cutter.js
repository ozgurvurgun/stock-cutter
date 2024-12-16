import StockCutter from "../src/StockCutter.js";

const parts = [
  { length: 5000, quantity: 2 },
  { length: 450, quantity: 30 },
  { length: 12000, quantity: 5 }
];

const stockLength = 12000;
const stockWeight = 24;

const cutter = new StockCutter(stockLength, stockWeight);
const results = cutter.cut(parts);
cutter.printResults();