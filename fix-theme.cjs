const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/bg-green-100(?!\d)/g, 'bg-green-500/10');
content = content.replace(/bg-blue-100(?!\d)/g, 'bg-blue-500/10');
content = content.replace(/bg-gray-100(?!\d)/g, 'bg-secondary');
content = content.replace(/bg-gray-50(?!\d)/g, 'bg-secondary');

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
