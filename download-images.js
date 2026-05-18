const fs = require('fs');
const path = require('path');
const https = require('https');

const fileIds = [
  "1D2nblFP_UM6LUIOsHbkoZGBQf6i3zcEM",
  "1-JfrZaXYyaRqLH5nire57uFNFr-tcp3Q",
  "1f_FYqE2fXvAEo0ExbtHwDqZLglHWOez3",
  "1ptJ9kb3H5b1eRjj2YwWnR3yhQ9DBt5tF",
  "1B9ItsEIbzhWyfs_SXY5na4qdIJU37t_c",
  "14bRDYbHWSyEmOLZj70c5pcl-E507qDKu",
  "1xjsgV_e4M0sHsvzjZNUF0atolJ1ZLXj7",
  "133hsmJrIB1CPmM29Y-CAXfh1IMVt51LM",
  "1PGlqjTCiQoLUzdnWSCa_jfaE8gulrEFq",
  "1JuUMzlWUNe7SPFoO3HgrjzHZ9ULIW0Vh",
  "1UWi5Q2Ohx9LB2LrpNAv7T5pP6RJs4XFR",
  "1SiTugHhj220mk0UwYrXJqKmc9taj5uVL",
  "1FW-PGtHJQ84w7sSNw6fdqtXiMZuyn3i_",
  "1z3Dn6cEbHja1rUiaH4qSdkEERUIHaCnf",
  "1k6OCfkUBT3D4Olmgje1a1BFw7V1NShg4"
];

const targetDir = path.join(__dirname, 'public', 'portfolio');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function download() {
  for (let i = 0; i < fileIds.length; i++) {
    const id = fileIds[i];
    const url = `https://lh3.googleusercontent.com/d/${id}=w1000`;
    const dest = path.join(targetDir, `design_${i + 1}.jpg`);
    console.log(`Downloading ${id} to ${dest}...`);
    
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 303) {
           https.get(res.headers.location, (res2) => {
             const file = fs.createWriteStream(dest);
             res2.pipe(file);
             file.on('finish', () => { file.close(); resolve(); });
           }).on('error', reject);
        } else {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }
      }).on('error', reject);
    });
  }
  console.log("Done!");
}

download().catch(console.error);
