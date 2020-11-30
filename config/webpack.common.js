const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MPAConfig = require('./MPA.config.js')
// const Purify=require('purifycss-webpack'); //css优化去重复无效代码
// const glob=require('glob');  //css优化
const isDev = process.env.NODE_ENV === 'development'
const pluginsArr = [
  new VueLoaderPlugin(),
  ...MPAConfig.plugins,
  // new Webpack.ProvidePlugin({
  //   Vue: ['vue/dist/vue.esm.js', 'default']
  // }),
  // new HtmlWebpackPlugin({
  //   title: 'proindex',
  //   filename: 'proindex.html',
  //   template:path.resolve(__dirname,'../template/index.html')
  // })
]
// !isDev && pluginsArr.push(
//   new Purify({         //css优化去重去无效代码
//   paths:glob.sync(path.join(__dirname,"../src/pages/*.vue"))
// }));
module.exports = {
  entry: MPAConfig.entry,
  // entry: {
  //     proindex: ['./src/proindex.js'],
  // },
  output: {
    filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: isDev ? '/' : '/dist/',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.vue'],
    alias: {
      '@': path.join(__dirname, '../src'),
      pages: path.join(__dirname, '../src/pages'),
    },
  },
  externals: {
    bdmap: 'BMap',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        //缓存组 缓存公共代码
        commons: {
          name: 'commons',
          chunks: 'initial',
          minSize: 0, //代码最小多大，进行抽离
          minChunks: 2, //代码复 2 次以上的抽离
          priority: 1,
        },
        echarts: {
          chunks: 'initial',
          name: 'echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          enforce: true,
        },
        vue: {
          chunks: 'initial',
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          enforce: true,
        },
        axios: {
          chunks: 'initial',
          name: 'axios',
          test: /[\\/]node_modules[\\/]axios[\\/]/,
          enforce: true,
        },
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minSize: 0,
          minChunks: 1,
          chunks: 'initial',
          priority: -10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          //   'cache-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, '../src/css/common.scss')],
            },
          },
        ],
      },
      {
        enforce: 'pre', // 编译前检查
        test: /\.(js|vue|jsx)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
            },
          },
        ],
        exclude: [path.resolve(__dirname, '../node_modules/')],
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          //   'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '41',
                      ie: '9',
                    },
                    useBuiltIns: 'usage',
                    corejs: 2,
                    modules: false,
                  },
                ],
              ],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        //use: ['cache-loader',{
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 1024 * 3, // 3k一下的图片转为bs64编码
              name: 'resources/[name].[hash:8].[ext]',
            },
          },
          //   {
          //     // 压缩图片
          //     loader: 'image-webpack-loader',
          //     options: {
          //       disable: false,
          //     },
          //   },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:8].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
    ],
  },
  plugins: pluginsArr,
}
console.log(process.env.NODE_ENV)
