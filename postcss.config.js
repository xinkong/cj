
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 2,
      propList: ['*'],
      exclude: /node_modules/
    }
  },
};
