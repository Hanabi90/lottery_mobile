const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const vuxLoader = require('vux-loader')
module.exports = {
    transpileDependencies: ['vux'],
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config
                .plugin('compression')
                .use(CompressionPlugin, {
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    cache: true
                })
        }
    },
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            plugins: ['vux-ui', 'duplicate-style']
        })
    },
    devServer: {
        open: true,
        host: 'sid-test.hoyibet.com',
        port: 8080,
        before: app => {}
    }
}
