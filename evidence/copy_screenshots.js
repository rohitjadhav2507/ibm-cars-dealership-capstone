const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'screenshots');
const destDir = path.join(__dirname, '..', 'submission_evidence', 'screenshots');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied ${file}`);
  }
});
console.log('All screenshots synced to submission_evidence/screenshots/');
