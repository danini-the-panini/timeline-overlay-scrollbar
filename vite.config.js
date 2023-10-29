/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      input: {
        main: './src/main.ts',
        simplebar: './src/simplebar.ts',
        overlay: './src/overlay.ts'
      }
    }
  }
}