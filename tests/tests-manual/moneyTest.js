import formatCurrency from "../../scripts/utils/money.js";



// manual testing - open the website and check
// but hard to test every situation and re-test with manual testing

/* 
automated testing - using code to test code

2 types of test cases 
- basic test cases
- edge cases (values that are tricky)

try to test something different each time
group of related tests is called a test suite
*/

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else  {
    console.log('Failed');
}

console.log('works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('Passed');
} else console.log('Failed');

console.log('rounds up');
if (formatCurrency(2000.5) === '20.01') console.log('Passed');
else console.log('Failed');

console.log('rounds down');
if (formatCurrency(2000.4) === '20.00') console.log('Passed');
else console.log('Failed');

/* 
Testing framework - external library that helps write tests easily

we're going to use Jasmine (most frameworks are similar)
just downloaded zip and added to project folder

spec is another name for test in jasmine
specRunner.html does the same job as tests.html here
*/
