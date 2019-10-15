const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/app.ts'),
    watch: true,
    output: {
        filename: 'app.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000
    }
};