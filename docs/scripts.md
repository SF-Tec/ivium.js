## Available Scripts

`npm run build` builds the library to `dist`, generating these files:

- `dist/ivium.js`
  A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
- `dist/ivium.mjs`
  an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json
- `dist/ivium.umd.js`
  a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json
- `dist/ivium.d.ts`
  the type definitions for your package

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

## License

[Apache 2.0](LICENSE).
