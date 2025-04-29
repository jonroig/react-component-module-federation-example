const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Use [name] and [contenthash] for unique filenames
    chunkFilename: '[id].[contenthash].js', // Ensure chunk filenames are unique
    publicPath: 'http://localhost:3001/'
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        default: false,
        vendors: false,
        dependencies: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const match = module.context && module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (match) {
              const packageName = match[1]; // Extract the package name
              return `dependency.${packageName.replace('@', '')}`;
            }
            return null;
          },
          chunks: 'all'
        }
      }
    }
  },
  
  mode: 'production',
  devServer: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'my_component',
      filename: 'remoteEntry.js',
      exposes: {
        './MyComponent': './src/MyComponent',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '*',
          strictVersion: false,
          eager: false,
          import: false
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '*',
          strictVersion: false,
          eager: false,
          import: false
        },
        'axios': {
          singleton: true,
          requiredVersion: '*',
          strictVersion: false,
          eager: false
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};