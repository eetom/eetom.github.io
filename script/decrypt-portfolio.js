// Usage: node script/decrypt-portfolio.js <password>
// Decrypts portfolio/aa6c900a6eaa4f1b9a2975c98c594332/index-work.html
// and writes source to portfolio/src/index-work.html

const fs = require('fs');
const path = require('path');
const crypto = require('crypto').webcrypto;

const SRC_OUT = path.join(__dirname, '../portfolio/src/index-work.html');
const ENCRYPTED = path.join(__dirname, '../portfolio/aa6c900a6eaa4f1b9a2975c98c594332/index-work.html');

async function decrypt(password) {
  const html = fs.readFileSync(ENCRYPTED, 'utf8');

  const match = html.match(/<pre[^>]+data-i="([^"]+)"[^>]*>([\s\S]+?)<\/pre>/);
  if (!match) throw new Error('Could not find encrypted payload in file.');

  const iterations = Number(match[1]);
  const raw = Buffer.from(match[2].trim(), 'base64');

  const salt       = raw.slice(0, 32);
  const iv         = raw.slice(32, 48);
  const ciphertext = raw.slice(48);

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  const result = new TextDecoder().decode(decrypted);
  fs.mkdirSync(path.dirname(SRC_OUT), { recursive: true });
  fs.writeFileSync(SRC_OUT, result, 'utf8');
  console.log(`Decrypted → ${SRC_OUT}`);
}

const password = process.argv[2];
if (!password) { console.error('Usage: node script/decrypt-portfolio.js <password>'); process.exit(1); }

decrypt(password).catch(e => { console.error('Decryption failed:', e.message); process.exit(1); });
