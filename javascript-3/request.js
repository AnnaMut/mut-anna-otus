const http = require('http')

const PARALLEL = 'parallel'
const SERIAL = 'serial'

const req = (options) = () => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:8001`, (res) => {
      console.log(`STATUS: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
        console.log('No more data in response.')
    })
    }).on("error", (err) => reject(console.log(`ERROR: ${err}`)))
  })
}

const request = async (N, type) => {
  if (type == PARALLEL) {
    for (var i = 0; i < N; i++) {
      req()
      .then(data => console.log(`parallel output (${i}): ${data}`))
      .catch(console.log)
    }
  }
  if (type == SERIAL) {
    for (var i = 0; i < N; i++) {
      try {
        const data = await req()
        console.log(`serial output (${i}): ${data}`)
        }
        catch (err) {
        reject(err)
        }
    }
  }
}


request(3, 'serial');
