const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu;

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!filePath.includes('node_modules')) {
        results = results.concat(walk(filePath));
      }
    } else if (filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const targetFiles = walk(backendDir);

targetFiles.forEach((fileFullPath) => {
  let content = fs.readFileSync(fileFullPath, 'utf8');
  let originalContent = content;
  
  // 1. Remove emojis
  content = content.replace(emojiRegex, '');

  // 2. Safe variable expansions
  content = content.replace(/\berr\b/g, 'error');
  content = content.replace(/\bapps\b/g, 'applications');
  content = content.replace(/\bappDoc\b/g, 'applicationDocument');
  
  // Replace `a =>` with `application =>` where context makes sense in map functions
  content = content.replace(/\ba\s*=>/g, 'application =>');
  content = content.replace(/\(a\)\s*=>/g, '(application) =>');
  content = content.replace(/\ba\./g, 'application.');

  if (content !== originalContent) {
    fs.writeFileSync(fileFullPath, content, 'utf8');
    console.log(`Updated ${fileFullPath.replace(__dirname, '')}`);
  }
});

console.log('Backend simplification complete!');
