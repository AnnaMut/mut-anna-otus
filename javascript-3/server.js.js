const DELAY = 1000;
const PORT = 8001;


require('http').createServer((rec, res) => {

    setTimeout(() => { 
        res.write("done.")
        res.end('Hellow')
    }, DELAY) 

    console.log('logging')
}).listen(PORT)