const path = require('path'), //node.js提供的
  webpack = require('webpack');

const webpackConfig = {
  entry: {},
  output: {},
  resolve: {}
}

webpackConfig.entry = {//進入點
  app: [
    './src/index.js',//打包後會是app.js
    './src/index1.js'
  ]
}

webpackConfig.output = {//輸出
  path: path.join(__dirname, 'dist'),//絕對路徑，輸出為dist目錄
  filename: '[name].js',//輸出的就是上面的app檔名
  publicPath: '/' //會參考比如圖片的路徑
}

webpackConfig.resolve = {
  extensions: ['.js'] //import的時候，就可以忽略js了
}
webpackConfig.module = { //新增的modules部份，載入的js檔就會經過babel轉譯了
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.join(__dirname, 'src')]
    },
    {//新增的css部份
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]
    }
  ]
}
webpackConfig.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
    },
    sourceMap: true
  })
]
//webpackConfig.entry.app.push('./scripts/index1.js') //針對entry多新增一支js檔，一起打包

module.exports = webpackConfig
