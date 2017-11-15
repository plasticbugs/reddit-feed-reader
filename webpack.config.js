module.exports = {
  entry: [
    './src/Main.jsx'
  ],
  output: {
    filename: 'dist/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
