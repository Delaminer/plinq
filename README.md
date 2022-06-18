# Plinq

To build the extension, run `npm run build-linux` for Linux or `npm run build-mac` for MacOS (Window users must use WSL and choose the Linux option).
**Note:** This also builds the Next.JS output, which is not needed if you are developing the pure extension. If you do not need to build the Next JS server, you can then instead use `npm run build-fast-linux` or `npm run build-fast-mac` .

The built folder is `extension_out`. In Chrome Extensions, Select "Load Unpacked" and select that folder.
