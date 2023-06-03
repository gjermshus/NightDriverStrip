// default vite config
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin } from 'vite-plugin-externals';
import compression from "vite-plugin-compression2";

const viteExternals = viteExternalsPlugin({
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'react-router': 'ReactRouter',
    'material-ui': 'MaterialUI',
    '@material-ui': 'MaterialUI',
    "recharts": "Recharts",
    "@mui": "MaterialUI"
});

const viteCompression = compression({
    algorithm: "gzip",
    compressionOptions: { level: 9 },
    threshold: 1024,
    deleteOriginalAssets: true
});


export default defineConfig({
    plugins: [react(), viteExternals, viteCompression],
    server: {
        port: 3000,
    },
    publicDir: './local',
    build: {
        outDir: './dist',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        },
    },
});
