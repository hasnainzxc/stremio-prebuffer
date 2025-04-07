const { addonBuilder } = require("stremio-addon-sdk");
const http = require("http");

const builder = new addonBuilder({
  id: "org.smartbuffer.bufferaddon",
  version: "1.0.0",
  name: "Smart Buffer",
  description: "Streams episodes with prebuffering support",
  resources: ["stream"],
  types: ["series"],
  idPrefixes: ["series:"],
  catalogs: []
});

const baseURL = "http://localhost:3000"; // Companion app base URL

builder.defineStreamHandler(({ id }) => {
  const episodeNumber = parseInt(id.split(":").pop(), 10);
  const localPath = `${baseURL}/episode_${episodeNumber}.mp4`;

  return Promise.resolve({
    streams: [
      { title: "SmartBuffered", url: localPath }
    ]
  });
});

// ✅ Serve using built-in Node.js HTTP server
const interface = builder.getInterface();
const server = http.createServer(interface.getMiddleware());
server.listen(7000, () => {
  console.log("Stremio plugin running at http://localhost:7000/manifest.json");
});
