// Usage: node script/encrypt-portfolio.js <password>
// Encrypts portfolio/src/index-work.html
// and writes to portfolio/aa6c900a6eaa4f1b9a2975c98c594332/index-work.html

const { execSync } = require('child_process');
const path = require('path');

const SRC  = path.join(__dirname, '../portfolio/src/index-work.html');
const DEST = path.join(__dirname, '../portfolio/aa6c900a6eaa4f1b9a2975c98c594332/index-work.html');

const password = process.argv[2];
if (!password) { console.error('Usage: node script/encrypt-portfolio.js <password>'); process.exit(1); }

try {
  execSync(`npx pagecrypt "${SRC}" "${DEST}" "${password}" --iterations 2e6`, { stdio: 'inherit' });
  console.log(`Encrypted → ${DEST}`);
} catch (e) {
  console.error('Encryption failed:', e.message);
  process.exit(1);
}
