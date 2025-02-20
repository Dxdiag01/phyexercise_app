const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const images = [
  'logo.png',
  'patient.png',
  'expert.png',
  'feature1.png',
  'feature2.png',
  'feature3.png',
  'feature4.png'
];

const targetDir = path.join(__dirname, '../src/assets/images');

// SVG içeriği
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" version="1.1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
 <rect width="200" height="200" fill="#f0f0f0"/>
 <text x="100" y="100" dominant-baseline="middle" fill="#666" font-family="Arial" font-size="16" text-anchor="middle">PLACEHOLDER_TEXT</text>
</svg>`;

// Her bir resim için placeholder oluştur
images.forEach(imageName => {
  const baseName = path.basename(imageName, '.png');
  const svgPath = path.join(targetDir, `${baseName}.svg`);
  const pngPath = path.join(targetDir, imageName);
  
  // SVG dosyasını oluştur
  const customSvg = svgContent.replace('PLACEHOLDER_TEXT', baseName.toUpperCase());
  fs.writeFileSync(svgPath, customSvg);
  
  // SVG'yi PNG'ye dönüştür
  exec(`npx svgexport ${svgPath} ${pngPath} 2x`, (error) => {
    if (error) {
      console.error(`Error converting ${baseName}: ${error}`);
    } else {
      console.log(`Generated ${imageName}`);
      // SVG dosyasını sil
      fs.unlinkSync(svgPath);
    }
  });
}); 