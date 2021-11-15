const path = require('path');
const ThemeWatcher = require('@sallaapp/theme-utils/WatcherPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    entry  : {
        app        : ['./assets/js/app.js', './assets/styles/app.scss'],
        inner      : './assets/js/inner.js',
        home       : ['./assets/js/home.js', './assets/styles/home.scss'],
        salla_login: './assets/js/partials/salla-login.js',
        filepond   : ['./assets/js/plugins/filepond/filepond.js', './assets/js/plugins/filepond/filepond.scss'],
    },
    output : {
        path : path.resolve(__dirname, "assets", "dist"),
        clean: true,
        // filename: '[name]',
    },
    stats  : {
        modules                : false,
        assetsSort             : "size",
        assetsSpace            : 50,
        cachedAssets           : true,
        groupAssetsByPath      : false,
        groupAssetsByExtension : false,
        groupAssetsByEmitStatus: false,
        groupAssetsByChunk     : false,
        groupAssetsByInfo      : false,
        relatedAssets          : false,
        performance            : true,
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                use : ['babel-loader']
            },
            {
                test: /\.(s(a|c)ss)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {url: false}},
                    "postcss-loader",
                    "sass-loader",
                ]
            },
        ]
    },
    plugins: [
        new ThemeWatcher(),
        new MiniCssExtractPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "Salla Theme",
            logo : path.resolve("./assets/images/favicon/apple-icon.png"),
            // suppressSuccess: true, // don't spam success notifications
            successSound: false,
        }),
    ],
};