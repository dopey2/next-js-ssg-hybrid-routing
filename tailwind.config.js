const withMT = require("@material-tailwind/react/utils/withMT");


/**
 * https://tailwindcss.com/docs/content-configuration
 * @type {object}
 */
module.exports = withMT({
    content: [
        './src/**/*.ts',
        './src/**/*.tsx',
        './public/**/*.html',
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});
