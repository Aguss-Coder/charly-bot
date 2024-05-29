import fg from 'fast-glob'
import { build } from 'esbuild'


await build({
  entryPoints: await fg('src/**/*.ts'),
  minify: true,
  outdir: 'dist',
  platform: 'node',
})