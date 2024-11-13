export default {
  root: 'src',
  base: "/stream-bounce/",
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: 'src/index.html',
    },
  },
}