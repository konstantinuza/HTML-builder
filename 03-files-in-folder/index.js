const fs = require('fs');
const path = require('path');

fs.readdir('secret-folder', { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join('secret-folder', file.name);
      const fileName = path.parse(filePath).name;
      const fileExt = path.parse(filePath).ext.slice(1);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        console.log(`${fileName} - ${fileExt} - ${(stats.size / 1024).toFixed(3)}kb`);
      });
    }
  });
});

