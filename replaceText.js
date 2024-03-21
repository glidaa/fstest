const fs = require('fs');

// Path to the core.js file
const filePath = './node_modules/highlight.js/lib/core.js';

// Read the content of the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Replace occurrences of 'global' with 'globalFlag'
  const updatedContent = data.replace(/global/g, 'globalFlag');

  // Write the updated content back to the file
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('Text replacement completed.');
  });
});
