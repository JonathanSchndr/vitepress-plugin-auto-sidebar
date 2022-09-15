import dts from 'vite-plugin-dts';

export default {
  build: {
    minify: true,
    sourcemap: false,
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'umd'],
      entry: './src/vitepress-plugin-auto-sidebar.ts',
      name: 'vitepress-plugin-auto-sidebar'
    },
  },
  plugins: [dts()]
}
