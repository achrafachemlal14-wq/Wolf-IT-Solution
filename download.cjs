const fs = require('fs');
const path = require('path');
const https = require('https');

const queries = {
  computers: 'laptop computer desktop',
  phones: 'smartphone iphone android',
  speakers: 'audio speaker studio monitor',
  cables: 'ethernet usb cable wire'
};

const dirs = ['computers', 'phones', 'speakers', 'cables'];
dirs.forEach(d => {
  const p = path.join(__dirname, 'public', 'images', d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

async function downloadImages() {
  for (const [category, query] of Object.entries(queries)) {
    console.log(`Fetching 20 images for ${category}...`);
    try {
      const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=20`;
      const data = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
      });

      if (!data.results) {
         console.log(`Failed to parse data for ${category}`);
         continue;
      }

      let count = 1;
      for (const item of data.results) {
         if (count > 20) break;
         const imgUrl = item.urls.small; // regular, small, thumb
         await new Promise((resolve, reject) => {
            const dest = path.join(__dirname, 'public', 'images', category, `${count}.jpg`);
            const file = fs.createWriteStream(dest);
            https.get(imgUrl, (response) => {
               response.pipe(file);
               file.on('finish', () => {
                  file.close(resolve);
               });
            }).on('error', reject);
         });
         console.log(`Saved ${category}/${count}.jpg`);
         count++;
      }
    } catch(err) {
      console.error(err);
    }
  }
}

downloadImages();
