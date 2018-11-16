const fs = require('fs')
const path = require('path')

function manageFile(fileName){
  return {
    read: function(){
      return JSON.parse(fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8'))
    },
    write: function(posts){
      fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(posts, null, 2), 'utf-8')
    }
  }
}

module.exports = { manageFile }