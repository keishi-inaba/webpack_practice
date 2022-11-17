const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/main.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'style-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpag)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'images/[name].[ext]',
          //   }
          // },
          {
            loader: 'image-webpack-loader',
            options: {
              mozijpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
       test: /\.pug/,
       use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: true,
          },
        },
       ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html',
    }),
  ],
}
