const path = require('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, 'public'), 
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
            loader: 'babel-loader', 
            test: /\.js$/, 
            exclude: /node_modules/
        },{
            test: /\.scss$/, 
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(svg|png|jpe?g|gif)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
                outputPath: "img"
              }
            }
          },
    ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public')
    }
}