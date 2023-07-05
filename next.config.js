module.exports = {
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return '1'
    },
    distDir: 'build',
    webpack(config) {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });
        return config;
    },
};
