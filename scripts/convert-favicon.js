const fs = require('fs');
const path = require('path');
async function run() {
  const mod = await import('png-to-ico');
  const pngToIco = mod.default || mod;

  const input = path.join(__dirname, '..', 'public', 'logo.png');
  const output = path.join(__dirname, '..', 'public', 'favicon.ico');

  try {
    const buf = await pngToIco(input);
    fs.writeFileSync(output, buf);
    console.log('WROTE', output);
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
}

run();
