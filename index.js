const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({
  port: 8080,
});
wss.on("connection", (ws, req) => {
  console.log("客户端已连接：", req.socket.remoteAddress);
  console.log("url: ", req.url);
  console.log("query: ", req.query);
  ws.on("message", (data) => {
    console.log("收到客户端发送的消息：", data.toString());
  });
  ws.send(JSON.stringify({ type: "msg", data: "test" })); // 向当前客户端发送消息

  setInterval(() => {
    ws.send(JSON.stringify({ type: "msg", data: "new" }));
  }, 2000);
});
