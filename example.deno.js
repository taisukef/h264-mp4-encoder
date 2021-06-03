import { HME } from "./h264-mp4-encoder.es.js";

const encoder = await HME.createH264MP4Encoder();

// Must be a multiple of 2.
encoder.width = 100;
encoder.height = 100;
encoder.initialize();
// Add a single gray frame, the alpha is ignored.
for (let i = 0; i < 255; i++) {
    encoder.addFrameRgba(new Uint8Array(encoder.width * encoder.height * 4).fill(i))
}
// For canvas:
// encoder.addFrameRgba(ctx.getImageData(0, 0, encoder.width * encoder.height).data);
encoder.finalize();
const uint8Array = encoder.FS.readFile(encoder.outputFilename);
console.log(uint8Array);

await Deno.writeFile(encoder.outputFilename, uint8Array);

encoder.delete();
