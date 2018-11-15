const fs = require('fs')
const path = require('path')

function manageFile(fileName){
  return {
    read: function(){
      return JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'))
    },
    write: function(data){
      fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(data, null, 2), 'utf-8')
    }
  }
}

module.exports = { manageFile }