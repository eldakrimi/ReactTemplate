/* eslint-env node */

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = function () {
    return {
        context: path.resolve(__dirname, "src"),
        entry: ["./index"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            assetModuleFilename: "[name].[contenthash].[ext]",
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: "../tsconfig.json",
                },
            }),
            new HtmlWebpackPlugin({
                template: "./index.html",
            }),
        ],
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "src"),
            },
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.(j|t)s(x?)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(s?)css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
                    sideEffects: true,
                },
                {
                    test: /\.(woff2|woff|ttf|png|jpg|jpeg|gif|bmp|webp)$/,
                    type: "asset",
                },
                {
                    test: /\.svg$/,
                    type: "asset",
                    generator: {
                        dataUrl: (content) => svgToMiniDataURI(content.toString()),
                    },
                },
            ],
        },
        stats: "errors-warnings",
    };
};
