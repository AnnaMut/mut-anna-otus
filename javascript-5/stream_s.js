const {Readable, Transform, Writable} = require('stream')

var rs = Readable({
  objectMode: true,
  read() {
    console.log('Reading')
    this.push(Math.random())
  }
})


rs.on('pause', () => {
  console.log('Read pause')
})

var ts = Transform({
  objectMode: true,
  highWaterMark: 2,
  transform(chunk, encoding, callback) {
    var res = chunk + Math.random()
    this.push(res)
    callback()
  }
})

ts.on('pause', () => {
  console.log('Transform pause')
})

var ws = Writable({
  objectMode: true,
  highWaterMark: 5,
  write(chunk, encoding, callback) {
    setTimeout(() => {
      console.log(chunk)
      callback()
    }, 2000)
  }
})

rs.pipe(ts).pipe(ws)