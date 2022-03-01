module.exports = {
    "devServer":{
        "proxy": {
          "/api": {
          "target": 'http://localhost:3700',
          "pathRewrite": { '^/api': '' },
          "changeOrigin": true,
          "secure": false
          },
          "/reponses": {
          "target": 'http://localhost:3700', 
          "pathRewrite": { '^/reponses': '' },
          "changeOrigin": true
          },
          "/messages": {
            "target": 'http://localhost:3700', 
            "pathRewrite": { '^/messages': '' },
            "changeOrigin": true
            }
        }
      }
    }