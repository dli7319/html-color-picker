const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        resourceQuery: { not: [/raw/] },
        use: ["style-loader", "css-loader"],
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
  },
};
