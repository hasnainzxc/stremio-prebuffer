const { startDownloader } = require('./downloader');
const { startServer } = require('./server');

(async () => {
  startServer(); // serves downloaded videos
  startDownloader(); // watches current episode and downloads next
})();
