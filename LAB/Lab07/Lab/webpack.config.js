const webpack = require('webpack');

module.exports = {
    entry: ['./index.js'],
    output: {
        filename: 'compiled.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [{
                    options: {
                        name: "[name].[ext]",
                        outputPath: "img/"
                    },
                    loader: "file-loader"
                }]
            },    
        ]

    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(), // automatically compile when files change
        new webpack.ProvidePlugin({ // automatically import package
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],
    mode: 'development',
    devServer: {
        static: "./",
        hot: true,
        compress: true,
        host: 'localhost',
        port: 8080
    },
};