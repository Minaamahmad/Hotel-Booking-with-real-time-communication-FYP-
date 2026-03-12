import { Server } from "socket.io";
import { createServer } from "http";
import cors from cors


const io = new Server(httpserver,{
cors:{
    origin:"*"
}
})
io.on("connection",(socket)=>{
    console.log("Comms are on ",socket.id)
})
httpserver.listen(3000)

module.exports=io