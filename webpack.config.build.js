let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: function (module) {
        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'public': path.resolve(__dirname, './public'),
      'src': path.resolve(__dirname, './src'),
      'pages': path.resolve(__dirname, './src/pages'),

    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          buble: {
            
            objectAssign: 'Object.assign',
          }
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          
          objectAssign: 'Object.assign',
        }
      },
      {
        test: /\.css$/,
        // loader: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        // loader: ['style-loader', 'css-loader', 'stylus-loader'],
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true
  },
  // devtool: '#eval-source-map'
};
