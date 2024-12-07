import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import tailwindConfig from '../tailwind.config.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, './components');
const componentFiles = fs
  .readdirSync(componentsDir)
  .filter(file => file.endsWith('.css'));

let combinedCSS = componentFiles
  .map(file => fs.readFileSync(path.join(componentsDir, file), 'utf-8'))
  .join('\n');

// Run Tailwind on combinedCSS
postcss([tailwindcss(tailwindConfig)])
  .process(combinedCSS, { from: undefined })
  .then(result => {
    // result.css is now final CSS without unresolved directives
    fs.writeFileSync(
      path.resolve(__dirname, 'generatedComponents.js'),
      `export default ${JSON.stringify(result.css)};`,
    );
    console.log('Build complete: generatedComponents.js created');
  })
  .catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });
