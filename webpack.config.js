const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    node: {
        fs: 'empty',
        tls:'empty'
    },
    entry: {
        app:'./src/index.js',
    },
    module: {
        rules: [
            {
                test: /index\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            // SASS support - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml'
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: './src/index.html'
            // chunksSortMode: function (chunk1, chunk2) {
            //     var order = ['angular', 'vendor', 'app'];
            //     var order1 = order.indexOf(chunk1.names[0]);
            //     var order2 = order.indexOf(chunk2.names[0]);
            //     return order1 - order2;
            // }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'angular'],
        //     filename: 'js/[name].bundle.js'
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'angularDragula': 'angularjs-dragula',
            'echarts':'echarts'
        })
    ]

};
// 'use strict';
// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: {
//         app: './app.js',
//         vendor: ['jquery'],
//         angular: ['angular', 'angular-ui-router']
//     },
//     // output: {
//     //     path: path.resolve(__dirname + '/dist'),
//     //     filename: 'js/[name].bundle.js',
//     //     publicPath: '',
//     // },
//
//     plugins: [
//         // new HtmlWebpackPlugin({
//         //     template: __dirname + '/http/templates/index.tmpl.html',
//         //     chunksSortMode: function (chunk1, chunk2) {
//         //         var order = ['angular', 'vendor', 'app'];
//         //         var order1 = order.indexOf(chunk1.names[0]);
//         //         var order2 = order.indexOf(chunk2.names[0]);
//         //         return order1 - order2;
//         //     }
//         // }),
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     names: ['vendor', 'angular'],
//         //     filename: 'js/[name].bundle.js'
//         // }),
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery',
//             'window.jQuery': 'jquery'
//         })
//     ]
// };
