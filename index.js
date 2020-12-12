const compare = require('./compare').compare;
const CompareOptions = require('./compareOptions').CompareOptions;

async function comparePdf() {
    const options = new CompareOptions();
    options.actualPdfPath = './actual';
    options.expectedPdfPath = './expected';

    const result = await compare(options);
    console.log(result);
}

comparePdf();