/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

//module.exports = nextConfig

const withTM = require("next-transpile-modules")(['hashconnect']);
const withImages = require('next-images')
module.exports = withImages()
module.exports = withTM({})
