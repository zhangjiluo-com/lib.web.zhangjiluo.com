import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'lib',
  clean: true,
  declaration: true,
  rollup: {
    esbuild: {
      minify: true,
    },
    emitCJS: true,
  },
})
