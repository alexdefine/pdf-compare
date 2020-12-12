const PDFImage = require("pdf-image").PDFImage;
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const path = require('path');

exports.compare = async function compare(compareOptions) {
    console.log(`Actual PDF Path: ${compareOptions.actualPdfPath}`);
    console.log(`Expected PDF Path: ${compareOptions.expectedPdfPath}`);

    const actualFiles = fs.readdirSync(compareOptions.actualPdfPath).filter(x => x.endsWith('.pdf'));
    console.log(`Actual PDFs: ${actualFiles}`);

    const expectedFiles = fs.readdirSync(compareOptions.expectedPdfPath).filter(x => x.endsWith('.pdf'));;
    console.log(`Expected PDFs: ${actualFiles}`);

    const preparedFiles = actualFiles.filter(x => expectedFiles.includes(x));
    console.log(`Actual PDfs with correspondent Expected PDFs: ${preparedFiles}`);

    const allDiffs = preparedFiles.map(async (x) => {
        var actualPdf = new PDFImage(path.join(compareOptions.actualPdfPath, x));
        var expectedPdf = new PDFImage(path.join(compareOptions.expectedPdfPath, x));
    
        const actualImages = await actualPdf.convertFile();
        const expectedImages = await expectedPdf.convertFile();
    
        const diffImages = [];
    
        for (let i = 0; i < actualImages.length; i++) {
            const img1 = PNG.sync.read(fs.readFileSync(actualImages[i]));
            const img2 = PNG.sync.read(fs.readFileSync(expectedImages[i]));
    
            const { width, height } = img1;
            const diff = new PNG({ width, height });
    
            const result = pixelmatch(
                img1.data,
                img2.data,
                diff.data,
                width,
                height,
                { threshold: compareOptions.threshold });
    
    
            if (result > 0) {
                const diffName = path.join('diffs', `${x.replace('.pdf', '')}_diff_${i + 1}.png`);
    
                fs.writeFileSync(diffName, PNG.sync.write(diff));
                diffImages.push(diffName);

                console.log(`Difference images for ${x}: ${diffImages}`);

                return {
                    file: x,
                    diffs: diffImages
                };
            }
        }
    });

    return (await Promise.all(allDiffs)).filter(x => x !== undefined);
}