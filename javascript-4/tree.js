const fs = require('fs')
const path = require('path')
const base = 'foo/'
 
const readFile = (dir, cb) => {

  let results = {
    dirs: [],
    files: []
  }

  fs.readdir(dir, function(err, items) {
    if (err) { return cb(err) }
 
    var itemList = items.length
    if (!itemList){ return cb(null, results)}
    items.forEach(function(file) {
      file = path.join(dir, file)
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          results.dirs.push(file)  
          readFile(file, function(err, res) {
            results.files = results.files.concat(res.files)
            results.dirs = results.dirs.concat(res.dirs)
            if (!--itemList) cb(null, results)
          })
        } else {
          results.files.push(file)
          if (!--itemList) cb(null, results)
        }
      })
    })
  })
}
 

readFile((base), function(err, results) {
  if (err) throw err;
  console.log(JSON.stringify(results));
});