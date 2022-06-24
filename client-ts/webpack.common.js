const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    // contentScript: path.resolve('src/contentScript/contentScript.ts'),
    Dysis: path.resolve('src/contentScript/dysis.ts'),
    DysisAcademia: path.resolve('src/contentScript/dysis.ts'),
    DysisElementCollectorAbstract: path.resolve('src/contentScript/DysisElementCollectorAbstract.ts'),
    DysisElementCollectorUser: path.resolve('src/contentScript/DysisElementCollectorAbstract.ts'),
    DysisEnrichmentAbstract: path.resolve('src/contentScript/DysisEnrichmentAbstract.ts'),
    DysisEnrichmentFactory: path.resolve('src/contentScript/DysisEnrichmentFactory.ts'),
    DysisEnrichmentUser: path.resolve('src/contentScript/DysisEnrichmentUser.ts'),
    DysisRequests: path.resolve('src/contentScript/DysisRequests.ts'),
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        }
      ]
    }),
    ...getHtmlPlugins([
      'popup',
      'options'
    ]),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'contentScript' && chunk.name !== 'background'
      }
    },
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlPlugin({
    title: 'React Extension',
    filename: `${chunk}.html`,
    chunks: [chunk],
  }))
}
