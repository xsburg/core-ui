/**
 * Developer: Stepan Burguchev
 * Date: 5/21/2015
 * Copyright: 2009-2016 Comindware®
 *       All Rights Reserved
 * Published under the MIT license
 */

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}], no-new-func: 0 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

const pathResolver = {
    client: function () {
        //noinspection Eslint
        return path.resolve.apply(path.resolve, [__dirname, 'public/assets'].concat(_.toArray(arguments)));
    },
    source: function () {
        //noinspection Eslint
        return path.resolve.apply(path.resolve, [__dirname, 'public'].concat(_.toArray(arguments)));
    }
};

const removeBom = (text) => {
    return text.replace(/^\uFEFF/, '');
};

const readSpritesFile = () => {
    const svgSpritesFile = `${__dirname}/../dist/sprites.svg`;
    return removeBom(fs.readFileSync(svgSpritesFile, 'utf8'));
};

module.exports = {
    build: function (options) {
        const DEVELOPMENT = options.env === 'development';
        const PRODUCTION = options.env === 'production';
        const TEST = options.env === 'test';

        const FONT_LIMIT = PRODUCTION ? 10000 : 1000000;
        const GRAPHICS_LIMIT = PRODUCTION ? 10000 : 1000000;

        //noinspection JSUnresolvedFunction
        let webpackConfig = {
            cache: true,
            entry: {
                app: ['./public/index'],
                vendor: [
                    'comindware/core'
                ]
            },
            devtool: 'source-map',
            debug: true,
            output: {
                path: pathResolver.client(),
                filename: '[name].js',
                sourceMapFilename: '[file].map'
            },
            module: {
                preLoaders: [
                    {
                        test: /core\.js$/,
                        loader: 'source-map'
                    }
                ],
                loaders: [
                    {
                        test: /\.jsx?$/,
                        include: [
                            pathResolver.source()
                        ],
                        exclude: [
                            pathResolver.source('lib'),
                            pathResolver.source('app/cases')
                        ],
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    },
                    (PRODUCTION ? {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract('style-loader', [
                            'css-loader',
                            'postcss-loader',
                            `sass-loader?includePaths[]=${pathResolver.client()}`
                        ].join('!'))
                    } : {
                        test: /\.scss$/,
                        loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', `sass?sourceMap&includePaths[]=${pathResolver.client()}`]
                    }),
                    (PRODUCTION ? {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract('style-loader', [
                            'css-loader',
                            'postcss-loader'
                        ].join('!'))
                    } : {
                        test: /\.css$/,
                        loaders: ['style', 'css?sourceMap', 'postcss?sourceMap']
                    }),
                    {
                        test: /\.json$/,
                        loader: 'json'
                    },
                    {
                        test: /\.woff(\?.*)?$/,
                        loader: `url?prefix=fonts/&name=[path][name].[ext]&limit=${FONT_LIMIT}&mimetype=application/font-woff`
                    },
                    {
                        test: /\.woff2(\?.*)?$/,
                        loader: `url?prefix=fonts/&name=[path][name].[ext]&limit=${FONT_LIMIT}&mimetype=application/font-woff2`
                    },
                    {
                        test: /\.otf(\?.*)?$/,
                        loader: `file?prefix=fonts/&name=[path][name].[ext]&limit=${FONT_LIMIT}&mimetype=font/opentype`
                    },
                    {
                        test: /\.ttf(\?.*)?$/,
                        loader: `url?prefix=fonts/&name=[path][name].[ext]&limit=${FONT_LIMIT}&mimetype=application/octet-stream`
                    },
                    {
                        test: /\.eot(\?.*)?$/,
                        loader: 'file?prefix=fonts/&name=[path][name].[ext]'
                    },
                    {
                        test: /\.svg(\?.*)?$/,
                        loader: `url?prefix=fonts/&name=[path][name].[ext]&limit=${GRAPHICS_LIMIT}&mimetype=image/svg+xml`
                    },
                    {
                        test: /\.(png|jpg)$/,
                        loader: `url?limit=${GRAPHICS_LIMIT}`
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': PRODUCTION ? '"production"' : '"development"',
                    __DEV__: DEVELOPMENT
                }),
                new HtmlWebpackPlugin({
                    template: `handlebars-loader!${pathResolver.source('index.hbs')}`,
                    hash: PRODUCTION,
                    filename: 'index.html',
                    svgSprites: readSpritesFile(),
                    inject: 'body',
                    chunks: ['vendor', 'app'],
                    minify: {
                        collapseWhitespace: false
                    }
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: Infinity
                })
            ],
            postcss: [
                autoprefixer({
                    browsers: ['last 2 versions']
                })
            ],
            resolve: {
                root: [
                    pathResolver.source()
                ],
                alias: {
                    'comindware/core': `${__dirname}/../dist/core.js`,
                    prism: `${__dirname}/public/lib/prism/prism.js`,
                    markdown: `${__dirname}/public/lib/markdown-js/markdown.js`,
                    localizationMapEn: `${__dirname}/../dist/localization/localization.en.json`,
                    localizationMapDe: `${__dirname}/../dist/localization/localization.de.json`,
                    localizationMapRu: `${__dirname}/../dist/localization/localization.ru.json`,
                    ajaxMap: `${__dirname}/public/ajax/ajaxMap.js`
                }
            },
            resolveLoader: {
                alias: {
                    text: 'html'
                }
            }
        };

        if (PRODUCTION) {
            webpackConfig.cache = false;
            webpackConfig.debug = false;
            webpackConfig.devtool = false;

            //noinspection JSUnresolvedFunction
            webpackConfig.plugins.push(
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': PRODUCTION ? '"production"' : '"development"',
                    __DEV__: DEVELOPMENT
                }),
                new ExtractTextPlugin('[name].css'),
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        unused: true,
                        dead_code: true,
                        warnings: false
                    }
                })
            );
        }

        return webpackConfig;
    }
};
