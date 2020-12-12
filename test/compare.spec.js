const compare = require('../compare').compare;
const expect = require('chai').expect;
const CompareOptions = require('../compareOptions').CompareOptions;

describe('Compare function test', () => {
    it('should return empty array when comparing identical PDFs', async () => {
        const options = new CompareOptions();
        options.actualPdfPath = './actual';
        options.expectedPdfPath = './actual';

        const result = await compare(options);
        console.log(result);

        expect(result.length).to.be.equal(0);
    });

    it('should return array with differences when comparing different PDFs', async () => {
        const options = new CompareOptions();
        options.actualPdfPath = './actual';
        options.expectedPdfPath = './expected';

        const result = await compare(options);
        console.log(result);

        expect(result.length > 0).to.be.true;
    });
});