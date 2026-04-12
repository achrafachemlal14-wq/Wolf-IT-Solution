const fs = require('fs');
const path = require('path');
const https = require('https');

// Verified Unsplash Photo IDs for tech
const ids = {
  computers: [
    "1517336714731-489689fd1ca8", "1525547719571-a2d4ac8945e2", "1496181133206-80ce9b88a853", "1587202372634-32705e3bf49c",
    "1488590528505-98d2b5aba04b", "1498050108023-c5249f4df085", "1531297484001-80022131f5a1", "1544244015-0df4b3ffc6b0",
    "1550009158-9ebf69173e03", "1517694712202-14dd9538aa97", "1519345182560-ef497147ec33", "1537498425277-c283d32ef9db",
    "1542744173-8e7e53415bb0", "1499951360447-b19be8fe80f5", "1611339052210-e24185993375", "1520333789090-1afc82db536a",
    "1587614382346-4ec7063f9abe", "1511467687858-23d96c32e4ae", "1593640408182-31c70c8268f5", "1515378791036-0648a3ef77b2"
  ],
  phones: [
    "1598327105666-5b89351aff97", "1511707171634-5f897ff02aa9", "1592899677977-9c10ca588bbd", "1556656793-062ff9f1b517",
    "1580910051074-3eb694886505", "1565849904461-04a58ad377e0", "1523206489230-c012c64b2b48", "1585060544812-6b45903c1341",
    "1567581935884-3349723552ca", "1533228892549-373cd88dd096", "1574944985070-8f3ebc6b79d2", "1601784551446-20c9e07cdbdb",
    "1605236453806-6ff36851218e", "1591337676887-a217a6c1e0bb", "1512941937669-90a1b58e7e9c", "1510557880182-3d4d3cba35a5",
    "1546054454-aa26e2b734c7", "1536412597336-ade7b023ecbc", "1573148195900-7845dcb9b127", "1525598912247-557c4140dfb6"
  ],
  speakers: [
    "1545454675-3531b543be5d", "1505740420928-5e560c06d30e", "1558085324-2f298b28c714", "1470225620780-dba8ba36b745",
    "1524368535928-5b5e00ddc76b", "1589003020612-61a65e8fbc20", "1608155686393-8fdd966d7b4d", "1544832509-0ee1b1420d75",
    "1512446813927-456022d5934b", "1459749411177-042180ec7739", "1583394838336-acd977730f8a", "1564424224827-cd24b891fb2e",
    "1550524514-43285183ac1d", "1511671782779-c97d3d27a1d4", "1529154030432-690197fd998a", "1517048676732-d65bc937f952",
    "1543599538-a59fa99b7348", "1612196808214-b8e1d6145a8c", "1580238053495-b9720401fd45", "1554188248-986adbb73be4"
  ],
  cables: [
    "1558494949-ef010ccdcc32", "1563770660941-20978e87081b", "1615525961311-53697e684061", "1591488320449-011701bb6704",
    "1605462863863-10d9e47e15ee", "1526733158272-11144009ecd2", "1589492477829-5e65395b66cc", "1544006659-f0b21884cb1d",
    "1592225438351-99800624bbad", "1619130777085-303a7493df53", "1533038590840-1cde6e6690a1", "1480072723304-5021e468de15",
    "1504270997636-07ddfbd48945", "1555664424-778a1e5e1b48", "1540654364814-5957d533cc29", "1511376339414-f446059e7949",
    "1551735102-1ecae3ebee53", "1491933382434-500287f9b54b", "1516738901171-ec6c36142c67", "1563770275815-467406a0df02"
  ]
};

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadImage(res.headers.location, destPath)); 
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const cat in ids) {
    const dir = path.join(__dirname, 'public', 'images', cat);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    console.log(`Downloading ${cat}...`);
    for (let i = 0; i < ids[cat].length; i++) {
        const id = ids[cat][i];
        const dest = path.join(dir, `${i + 1}.jpg`);
        // Using w=500 for fast loading
        const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=70`;
        try {
            await downloadImage(url, dest);
            console.log(`Saved ${cat}/${i + 1}.jpg`);
        } catch (e) {
            console.error(`Error on ${cat}/${i+1}.jpg: ${e.message}`);
        }
    }
  }
  console.log("Done downloading 80 images locally!");
})();
