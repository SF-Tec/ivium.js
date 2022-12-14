import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const PACKAGE_NAME = 'ivium';
const DIST_FOLDER_FILENAME = `dist/${PACKAGE_NAME}`;

const globals = {
  'ffi-napi': 'ffiNapi',
  'ref-napi': 'ref',
  'ref-array-di': 'refArray'
};

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: [
    'ffi-napi', 'ref-napi', 'ref-array-di'
  ],
  output: config.output.map(outputConfig => ({
        ...outputConfig,
        globals,
        sourcemap: true,
  }))
});


export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        exports: 'default',
        file: `${DIST_FOLDER_FILENAME}.js`,
        format: 'cjs',
      },
      {
        exports: 'default',
        file: `${DIST_FOLDER_FILENAME}.mjs`,
        format: 'es',
      },
      {
        exports: 'default',
        file: `${DIST_FOLDER_FILENAME}.umd.js`,
        format: 'umd',
        name: PACKAGE_NAME,
      },
    ],
  }),
  {
    input: 'dist/ivium.js',
    plugins: [
      copy({
        targets: [
          { src: 'dlls/*', dest: 'dist/dlls' }
        ]
      })
    ]
  },
  {
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
      file: `${DIST_FOLDER_FILENAME}.d.ts`,
      format: 'es',
    },
  }
];
