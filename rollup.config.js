import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: {
    name: 'window', // exports as global (https://github.com/rollup/rollup/issues/494)
    extend: true,
    file: 'lib/react-unveil.js',
    format: 'umd',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
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
