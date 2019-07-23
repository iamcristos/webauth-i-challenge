const server = require('./server');

const PORT = process.env.PORT || 5000;

server.all('*', (req,res)=>{
    res.status(404).send("How did you get here")
})
server.listen(PORT, ()=>{
    console.log(`server is listening at ${PORT}`)
});