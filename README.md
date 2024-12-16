# Stock Cutter

**Stock Cutter** is a versatile Node.js library and CLI tool for optimizing stock cutting with minimal waste. It provides detailed reports on used stock, waste, and cut parts.

---

## Features
- Calculates waste and total cuts.
- Supports configurable stock length and weight.
- Outputs detailed results.
- Can be used as a CLI tool or a library for integration into other projects.

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/stock-cutter.git
```

### Navigate to the Project Directory
```bash
cd stock-cutter
```

### Install Dependencies (if needed)
```bash
npm install
```
## Usage

### Run the program directly from the folder: `bin`
```bash
node bin/stock-cutter
```
or
```bash
npm start
```

---

## Running Tests

### About the Tests

This project includes comprehensive unit tests to ensure the reliability of the `StockCutter` library. The tests cover a variety of scenarios, including edge cases, to verify the accuracy of calculations and functionality.

### Test Scenarios Covered:
1. **Basic Scenario**: Verifies correct stock usage, waste, and cut length for a standard set of parts.
2. **No Parts**: Ensures no stocks are used when the parts list is empty.
3. **Oversized Parts**: Confirms that parts larger than the stock length are skipped without errors.
4. **Many Small Parts**: Validates that small parts are optimally distributed across multiple stocks.

### How to Run Tests

To execute the tests, run the following command:

```bash
node tests/StockCutter.test
```
or

```bash
npm test
```

### About the Tests
If all tests pass, you should see an output similar to this:

✅ Basic Scenario passed
✅ No Parts passed
✅ Parts Too Big passed
✅ Many Small Parts passed