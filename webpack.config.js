var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var argv = require('yargs').argv;


var conf = new function() {
  this.prod = !!argv.p;
  this.src = 'app';
  this.fileName = this.prod ? '[name]-[hash]' : '[name]';
  this.destDirName = 'build';
  this.defines = {
    'process.env.NODE_ENV': JSON.stringify(this.prod ? 'production' : 'development')
  }
}

module.exports = new function() {

  if (conf.prod) {
  } else {
    this.devtool = '#inline-source-map';
  }


  this.module = {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee!source-map' },
      { test: /\.jade$/,   loader: 'jade?self' },
      { test: /\.(png|jpe?g|gif)$/, loader: 'file'},
      { test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass?indentedSyntax&sourceMap!autoprefixer')
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap')
      },
      // { test: /\.scss$/,
      //     loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!autoprefixer') },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ]
  };


  this.resolve = {
    extensions: ['', '.js', '.coffee', '.webpack.js', '.web.js']
  };


  this.entry = {
    app: ['./'+conf.src+'/index.coffee'],
    vendor: ['./'+conf.src+'/vendor.coffee']
  };

  this.output = {
    path: path.join(__dirname, conf.destDirName),
    publicPath: '/',
    filename:  conf.fileName + '.js',
    chunkFilename: '[id].js'
  };


  this.plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(conf.defines),
    new webpack.optimize.CommonsChunkPlugin('vendor', conf.fileName + '.js'),
    new ExtractTextPlugin(conf.fileName + '.css', { allChunks: false }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './'+conf.src+'/index.html',
      inject: 'body'
    })
  ];


  this.devServer = {
    contentBase: './' + conf.destDirName,
    noInfo: true,
    hot: false,
    lazy: false,
    inline: true,
    historyApiFallback: true,
    stats: { colors: true },
    proxy: {
      '/api/*': 'http://localhost:3000',
      '/files/*': 'http://a2ms.local'
    }
  };
}
