/* eslint-disable */
const fs = require('fs');

const fileName = '/home/node/app/testOutput.json';

if (!fs.existsSync(fileName)) {
  console.log('No test output file');
  process.exit(1);
}

const outputFile = fs.readFileSync(fileName, 'utf8');

if (!outputFile) {
  console.log('Empty or Invalid content');
  process.exit(1);
}

const obj = JSON.parse(outputFile);

console.log({
  numFailedTests: obj.numFailedTests,
  numFailedTestSuites: obj.numFailedTestSuites,
  numPassedTestSuites: obj.numPassedTestSuites,
  numPassedTests: obj.numPassedTests,
  numPendingTestSuites: obj.numPendingTestSuites,
  numPendingTests: obj.numPendingTests,
  numRuntimeErrorTestSuites: obj.numRuntimeErrorTestSuites,
  numTodoTests: obj.numTodoTests,
  numTotalTestSuites: obj.numTotalTestSuites,
  numTotalTests: obj.numTotalTests,
  success: obj.success,
});

if (obj.numFailedTests === 0 && obj.numFailedTestSuites === 0) {
  console.log('Succeeded');
  process.exit();
}

console.log('Test Failed');
process.exit(1);
