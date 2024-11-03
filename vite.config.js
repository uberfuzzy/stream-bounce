export default {
  root: 'src',
  base: "./",
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: 'src/index.html',
    },
  },
}