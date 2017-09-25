var EPub = require("epub");
var epub = new EPub(epubfile);

epub.on("end", function(){
	info = epub.metadata;
  contributors = [];
  contributors.push(info.creator);
  title = info.title;
  console.log(title, contributors);
});
epub.parse();
