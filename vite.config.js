import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  root: "src",
  build: {
    outDir: "../build",
    emptyOutDir: true,
    rollupOptions: {
      external: ['aws-amplify'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Splits code coming from node_modules into separate chunks
            const name = id.toString().split('node_modules/')[1].split('/')[0].toString();
            // This example treats each node_modules library as a separate chunk
            return name;
          }
        }
      }
    }
  },
  plugins: [
    svgr({ svgrOptions: { ref: true } }),
    react(),
    VitePWA({
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  resolve: {
    alias: {
      // Define any aliases here
    },
  },
});















// import { defineConfig } from "vite";
// import svgr from "vite-plugin-svgr";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   root: "src",
//   build: {
//     outDir: "../build",
//     emptyOutDir: true,
//   },
//   plugins: [
//     svgr({ svgrOptions: { ref: true } }),
//     react(),
//     VitePWA({
//       workbox: {
//         clientsClaim: true,
//         skipWaiting: true,
//       },
//     }),
//   ],
// });