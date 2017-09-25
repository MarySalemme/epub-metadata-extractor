var EPub = require('epub');
var fs = require('fs');

var testPath = '/Users/marysalemme/Desktop/Dev/tech-tests/epub-metainformation-extraction/test_epubs';

function getFileNamesByExtension(path, ext) {
  var files = fs.readdirSync(path);
  return files.filter(file => file.endsWith(ext));
}

function forEachFile(path, ext, callback) {
  getFileNamesByExtension(path, ext).forEach(filteredFile => callback(path + "/" + filteredFile));
}

function extractMetadata(filePath) {
  var epub = new EPub(filePath);
  epub.on('end', function(){
    info = epub.metadata;
    book_title = info.title;
    book_contributors = [];
    book_contributors.push(info.creator);
    fs.mkdirSync(prepareFilePath(filePath) + '/');
    fs.writeFile(prepareFilePath(filePath) + "/index.json", prepareMetadata(book_title, book_contributors), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log('File has been created');
    })
  })
  epub.parse();
}

function prepareFilePath(filePath) {
  return filePath.replace('.epub', '');
}

function prepareMetadata(title, contributors) {
  return JSON.stringify({
           "title": title,
           "contributors": contributors
         }, null, 4);
}

var epubs = getFileNamesByExtension(testPath, '.epub');

epubs.forEach(epub => extractMetadata(testPath + "/" + epub));
