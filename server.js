const app = require("express")();
const http = require("http").Server(app)
const io = require("socket.io")(http)
const moment = require("moment")

app.get("/", function(request, response){
    response.sendFile(__dirname + "/main.html")
})

io.on("connection", function(socket){
    console.log("A new user is connected.")

    socket.on("disconnect", function(){
        console.log("A user is disconnected.")
    })

    socket.on("chat", function(msg){
        var dateWithMoment = `${moment(Date.now()).locale("en").format("L")} ${moment(Date.now()).locale("en").format("LT")} • `
        console.log(`New message : ${msg}`)
        io.emit("chat",  dateWithMoment + msg)
    })
})

http.listen(3000, () => {
    console.log("Server on!")
})