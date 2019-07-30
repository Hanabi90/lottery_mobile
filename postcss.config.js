module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 750,
            viewportHeight: 938,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['fixed_layout'],
            minPixelValue: 1,
            mediaQuery: false,
            propList: ['*']
        }
    }
}
