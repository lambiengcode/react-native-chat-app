var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var count = 0;

app.get("/", (req, res) => {
  res.write(`<html>
    <head>
      <title>Socket.IO chat</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font: 14px Helvetica, Arial;
        }
        form {
          background: #000;
          padding: 3px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        form input {
          border: 0;
          padding: 10px;
          width: 90%;
          margin-right: 0.5%;
        }
        form button {
          width: 9%;
          background: #5196f4;
          border: none;
          padding: 12px;
        }
        #messages {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        #messages li {
          padding: 5px 10px;
        }
        #messages li:nth-child(odd) {
          background: #eee;
        }
      </style>
    </head>
    <body>
      <ul id="messages"></ul>
      <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
      </form>
    </body>
  
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script>
      $(function () {
        var socket = io();
        $("form").submit(function (e) {
          e.preventDefault(); // prevents page reloading
          socket.emit("chat message", $("#m").val());
          $("#m").val("");
          return false;
        });
        socket.on("chat message", function (msg) {
          $("#messages").append($("<li>").text(msg));
        });
      });
    </script>
  </html>
  `);

  res.end();
});

io.on("connection", (socket) => {
  console.log("a user connected");
  count++;
  var username = `User${count}: `;
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", username + msg);
  });
});

http.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});