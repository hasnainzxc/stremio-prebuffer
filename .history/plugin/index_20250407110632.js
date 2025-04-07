const { addonBuilder } = require("stremio-addon-sdk");
const builder = new addonBuilder({
  id: "org.smartbuffer.bufferaddon",
  version: "1.0.0",
  name: "Smart Buffer",
  description: "Streams episodes with prebuffering support",
});

const baseURL = "http://localhost:3000"; // Local companion server

builder.defineStreamHandler(({ id }) => {
  const episodeNumber = parseInt(id.split(":").pop(), 10);
  const localPath = `${baseURL}/episode_${episodeNumber}.mp4`;

  return Promise.resolve({
    streams: [
      { title: "SmartBuffered", url: localPath }
    ]
  });
});

module.exports = builder.getInterface();
