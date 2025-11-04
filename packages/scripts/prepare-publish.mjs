#!/usr/bin/env node

import fs from 'node:fs';

const pkgPath = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.files = ['css/*', 'dist/*', 'README.md'];

function stripDevBranch(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.development) delete obj.development;
    for (const k of Object.keys(obj)) stripDevBranch(obj[k]);
  }
}

stripDevBranch(pkg.exports);

// if (pkg.exports?.["./css"]) {
//   pkg.exports["./css"] = "./dist/style.css";
// }

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
console.log('[prepare-publish] exports stripped for publish');
