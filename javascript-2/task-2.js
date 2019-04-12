var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) { 
  return new Promise((resolve) => {
    let result = Promise.resolve(initialValue)
    for (let i in asyncFunctions) {
      result = result.then(asyncFunctions[i]).then((res) => initialValue = reduce(initialValue, res))
    }
    result.then(() => resolve(initialValue))
  })
}

var reduce = function(memo, value) {
  console.log('reduce')
  return memo * value
}


promiseReduce([fn1, fn2], reduce, 1).then(console.log) 
