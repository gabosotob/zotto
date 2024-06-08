import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./index.ts', './cli/cli.ts'],
    tsconfig: './tsconfig.json',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: true,
    shims: true,
});
