const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker': path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.entry.js'),
    },
  },
};