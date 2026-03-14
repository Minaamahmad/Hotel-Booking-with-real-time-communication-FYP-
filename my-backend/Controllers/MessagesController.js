import { Server } from "socket.io";
import cors from cors
import Message from "../Models/Messages.js";



const io = new Server(httpserver,{
cors:{
    origin:"*"
}
})
io.on("connection",(socket)=>{
    console.log("Comms are on ",socket.id)
})
httpserver.listen(3000)


const messages= new Message({
    
})

module.exports=io