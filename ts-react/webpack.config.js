const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
let dotenv;

if (devMode) {
    dotenv = require('dotenv').config({ path: __dirname + '/.env' });
} else {
    dotenv = require('dotenv').config({ path: __dirname + '/.env.production' });
}

const { REACT_APP_BASE_URI } = dotenv.parsed;

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: '/',
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src/')
        },
    },
    // devtool: 'eval-source-map', // 모든 기능이 포함된 완전한 소스맵을 별도의 파일로 생성한다. 이 옵션은 최고 품질의 소스맵을 생성하지만 빌드 프로세스가 느려진다.
    // devtool: 'source-map', // 별도의 파일에 컬럼 매핑을 제외한 소스맵을 생성합니다. 컬럼 매핑을 생략하면 빌드 속도가 향상되지만 디버깅할때는 약간의 불편함이 있습니다. 브라주저가 개발자 툴은 원래 소스 파일의 행을 가리킬 수 있으며, 특정 컬럼을 가르킬 수 없습니다.
    // devtool: 'cheap-module-eval-source-map', // 빌드 중에 소스 맵을 생성하는 가장 빠른 방법입니다. 생성되는 소스맵에는 자바스크립트 파일이 컬럼 매핑을 제외하고 동일하게 인라인으로 포함됩니다. 이전 옵션과 마찬가지로 자바스크립트 실행 시간에 부정적인 영향을 미치므로 실무용 번들
    devtool: devMode ? 'cheap-module-eval-source-map' : 'source-map',
    devServer: {
        port: 3000,
        // host: '0.0.0.0',
        inline: true,
        hot: true,
        // historyApiFallback: {
        //  index: '/templates/index/index.html'
        // },
        contentBase: path.resolve(__dirname, 'public', 'dist'),
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: REACT_APP_BASE_URI,
            },
            '/auth': {
                target: REACT_APP_BASE_URI,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                            ],
                            // plugins: [
                            //     '@babel/plugin-transform-runtime',
                            //     '@babel/plugin-transform-arrow-functions',
                            //     '@babel/plugin-transform-object-assign'
                            // ]
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: devMode
                    ? ['style-loader', 'css-loader']
                    : [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'images/[folder]/[name].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[folder]/[name].[ext]',
                },
            },
            {
                test: /\.(svg)(\?.*$|$)/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'public', 'index.html'),
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            minify: devMode
                ? false
                : {
                    collapseWhitespace: true,
                    removeComments: true,
                },
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new ForkTsCheckerPlugin(),
        new HardSourceWebpackPlugin({
            // Either a string of object hash function given a webpack config.
            configHash: function (webpackConfig) {
                // node-object-hash on npm can be used to build this.
                return require('node-object-hash')({ sort: false }).hash(
                    webpackConfig,
                );
            },
            // Either false, a string, an object, or a project hashing function.
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['package-lock.json', 'yarn.lock'],
            },
        }),
        new HardSourceWebpackPlugin.ExcludeModulePlugin([
            {
                // HardSource works with mini-css-extract-plugin but due to how
                // mini-css emits assets, assets are not emitted on repeated builds with
                // mini-css and hard-source together. Ignoring the mini-css loader
                // modules, but not the other css loader modules, excludes the modules
                // that mini-css needs rebuilt to output assets every time.
                test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            }
        ]),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/images', to: 'images' }],
            options: {
                concurrency: 100,
            },
        }),
    ],
    node: { fs: 'empty' },
    externals: [{ './cptable': 'var cptable' }, { './jszip': 'jszip' }]
};


