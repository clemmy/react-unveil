import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    name: 'ReactUnveil',
    file: 'lib/react-unveil.js',
    format: 'umd',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
  external: ['react', 'prop-types'],
};
