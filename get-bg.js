const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/sequence/ezgif-frame-001.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const idx = 0; // Top left pixel
    const r = this.data[idx];
    const g = this.data[idx + 1];
    const b = this.data[idx + 2];
    const a = this.data[idx + 3];
    const hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    console.log("BACKGROUND_COLOR:", hex);
  });
