const fs = require('fs');
const path = require('path');

const targetFiles = [
  "frontend/src/components/Sidebar.jsx",
  "frontend/src/pages/university/ManagePrograms.jsx",
  "frontend/src/pages/university/UniversityApplications.jsx",
  "frontend/src/pages/public/Register.jsx",
  "frontend/src/pages/student/ProgramList.jsx",
  "frontend/src/pages/public/Login.jsx",
  "frontend/src/pages/student/ProgramDetail.jsx",
  "frontend/src/pages/public/Landing.jsx",
  "frontend/src/pages/student/MyApplications.jsx"
];

const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu;

targetFiles.forEach((relativePath) => {
  const fileFullPath = path.join(__dirname, relativePath);

  if (fs.existsSync(fileFullPath)) {
    let content = fs.readFileSync(fileFullPath, 'utf8');

    // 1. Remove emojis
    content = content.replace(emojiRegex, '');

    // 2. Replace thick multiline decorative comments with normal block comments
    // Example: 
    // /* ──────────────────
    //    CSS
    // ────────────────── */
    content = content.replace(/\/\*\s*─+\s*\n\s*(.*?)\s*\n\s*─+\s*\*\//g, '/* $1 */');

    // 3. Replace thick inline decorative comments
    // Example: /* ── HEADER ── */
    content = content.replace(/\/\*\s*─+\s*(.*?)\s*─+\s*\*\//g, '/* $1 */');

    // 4. Safe variable expansions (word-bounded, usually safe in React maps and catches)
    // Replace err with error
    content = content.replace(/\berr\b/g, 'error');
    content = content.replace(/\bsetErr\b/g, 'setError');

    // Replace res with response
    content = content.replace(/\bres\b([.\s=])/g, 'response$1');

    // Write modified content back
    fs.writeFileSync(fileFullPath, content, 'utf8');
    console.log(`Updated ${relativePath}`);
  } else {
    console.log(`Skipped ${relativePath} - File not found.`);
  }
});
console.log('Simplification complete!');
