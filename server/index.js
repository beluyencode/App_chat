const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
var cookieParser = require('cookie-parser')
const user = require('./routers/user');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'))
app.use(cookieParser());
app.use(cors());

app.use("/user", user);

app.get('/', (req, res) => {
    res.send("hello");
});

var arrUserOnline = [];

var arrMess = [];

io.on('connection', socket => {

    console.log(`user has id : ${socket.id} online `);

    socket.on("UserOnline", (data) => {
        let promise = new Promise((resolve, reject) => {
            if (arrUserOnline.filter(e => e.id === data.id).length === 0) {
                data.socketId = socket.id;
                arrUserOnline.push(data);
            }
            resolve();
        })
        promise
            .then(() => {
                io.sockets.emit("dataUserOnline", arrUserOnline);
                console.log(arrUserOnline);
            })
            .catch(err => {
                console.error(err);
            })
    })

    socket.on("disconnect", () => {
        arrUserOnline = arrUserOnline.filter(user => user.socketId !== socket.id);
        io.sockets.emit("dataUserOnline", arrUserOnline);
        console.log(`user has id : ${socket.id} offline`);
        console.log(arrUserOnline);

    })
    socket.on("user-send-mess",(data) => {
        console.log(data);
        console.log(socket.id);
    })


});

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});