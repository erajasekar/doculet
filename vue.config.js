module.exports = {
  pluginOptions: {
    s3Deploy: {
      region: 'us-east-1',
      bucket: 'doculet',
      assetPath: 'dist',
      deployPath: '/',
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: 'ENRXPU6PO5Y99',
      cloudfrontMatchers: '/index.html,/styles/*.css,/*.png',
      uploadConcurrency: 5
    }
  }
}