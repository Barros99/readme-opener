const { build } = require('esbuild');

const baseConfig = {
  bundle: true,
  entryPoints: ['./src/extension.ts'],
  external: ['vscode'],
  format: 'cjs',
  outfile: 'dist/extension.js',
  platform: 'node',
};

(async () => {
  try {
    if (process.argv.includes('--watch')) {
      // Modo watch
      const context = await build({
        ...baseConfig,
        sourcemap: true,
        watch: true,
      });
    } else {
      // Build único
      await build({
        ...baseConfig,
        minify: process.argv.includes('--production'),
        sourcemap: !process.argv.includes('--production'),
      });
    }
  } catch (err) {
    process.exit(1);
  }
})();