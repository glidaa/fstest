import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: "src",
  build: {
    outDir: "../build",
    emptyOutDir: true,
    rollupOptions: {
      external: ['aws-amplify'], 
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