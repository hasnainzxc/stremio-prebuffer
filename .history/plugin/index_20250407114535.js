const { addonBuilder } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "org.smartbuffer.bufferaddon",
  version: "1.0.0",
  name: "Smart Buffer",
  description: "Streams episodes with prebuffering support",
  resources: ["stream"],
  types: ["series"],
  idPrefixes: ["series:"],
  catalogs: []   // Optional: Empty for now
});

const baseURL = "http://localhost:3000"; // Your companion app URL

// Define the stream handler
builder.defineStreamHandler(({ id }) => {
  const episodeNumber = parseInt(id.split(":").pop(), 10);
  const localPath = `${baseURL}/episode_${episodeNumber}.mp4`;

  return Promise.resolve({
    streams: [
      { title: "SmartBuffered", url: localPath }
    ]
  });
});

// **Serve the plugin using the built-in HTTP server**:
builder.getInterface().serveHTTP({ port: 7000 }, () => {
  console.log("Stremio plugin running at http://localhost:7000/manifest.json");
});
