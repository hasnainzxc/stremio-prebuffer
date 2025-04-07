const fs = require('fs');
const axios = require('axios');
const path = require('path');

const CACHE_DIR = path.join(__dirname, 'cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

const streamBase = "https://your-streaming-source.com"; // Replace with real stream source

const CURRENT_EPISODE = 1;
const BUFFER_COUNT = 2;

async function downloadEpisode(epNum) {
  const url = `${streamBase}/episode_${epNum}.mp4`; // Placeholder URL
  const outPath = path.join(CACHE_DIR, `episode_${epNum}.mp4`);
  if (fs.existsSync(outPath)) return;

  console.log(`Downloading episode ${epNum}...`);
  const res = await axios({ url, responseType: 'stream' });
  const writer = fs.createWriteStream(outPath);
  res.data.pipe(writer);

  return new Promise(resolve => writer.on('finish', resolve));
}

async function startDownloader() {
  for (let i = 1; i <= BUFFER_COUNT; i++) {
    await downloadEpisode(CURRENT_EPISODE + i);
  }
}

module.exports = { startDownloader };
