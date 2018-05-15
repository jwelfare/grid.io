/*
    ./webpack.client.config.js
    author: jwelfare
    desc.: exported config object for webpack middleware. Defines entry point and output path for compiled ES5 client JS
           note: server side ES6 is precompiled using babel-node on "npm start"
*/

module.exports = { 
    entry: {
        client: __dirname + '/client/client.js'
    },
    output: {
        path: '/',
        filename: 'client.js'
    },
    devtool: 'source-maps',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                    }
                }
            }
        ]
    }
}
