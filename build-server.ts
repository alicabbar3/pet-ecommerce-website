import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile: 'dist/server.cjs',
  external: ['express', 'resend', 'vite'],
}).catch(() => process.exit(1));
