# pdf-compare
Simple PDF comparison library which utilize pdf-image and pixelmatch libraries to compare PDF files and create difference images as output 
# Quick Guide
Build image:
`docker build --rm -t pdf-compare:latest -f Dockerfile .`
Run container with 3 volumes: folder with actual PDFs, with expected PDFs and folder for difference images.
`docker run -v "$(pwd)/actual:/test-app/actual" -v "$(pwd)/expected:/test-app/expected" -v "$(pwd)/diffs:/test-app/diffs" -i pdf-compare:latest`

Images with differences will appear in diffs folder if there any.

Note: actual and expected PDFs must have same names in order to be compared. Otherwise they will be ignored.