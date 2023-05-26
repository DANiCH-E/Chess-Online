const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const app = express()

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */

//Создаем сервер и обрабатываем подключение
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 5000;

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})


// usually this is where we try to connect to our DB.
server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});


//
// const connected = new Set();
// const disconnected = new Set();
// const message_cache = [];
//
// async function websocket_handler(websocket, path) {
//     console.log('ws handler');
//     connected.add(websocket);
//     try {
//         while (true) {
//             const message = await websocket.recv();
//             console.log(`Received message: ${message}`);
//         }
//     } catch (error) {
//         if (error instanceof websockets.exceptions.ConnectionClosed) {
//             console.log("WebSocket connection closed");
//             disconnected.add(websocket);
//         } else {
//             throw error;
//         }
//     } finally {
//         connected.delete(websocket);
//     }
// }
//
// async function send_to_broken() {
//     const successful_connection = new Set();
//     for (const message of message_cache) {
//         for (const client of disconnected) {
//             try {
//                 client.send(`${message}`.slice(2, -1));
//                 successful_connection.add(client);
//             } catch (error) {
//                 if (error instanceof ConnectionRefusedError) {
//                     continue;
//                 } else {
//                     throw error;
//                 }
//             }
//         }
//     }
//     for (const client of successful_connection) {
//         connected.add(client);
//         disconnected.delete(client);
//     }
// }
//
// async function start_websocket_server() {
//     console.log('start ws');
//     const server = new websockets.WebSocketServer({ port: 5000 });
//     server.on('connection', websocket_handler);
//     console.log('5000 started');
//     await new Promise(() => {});
// }
//
// async function handle_grpc(reader, writer) {
//     console.log('handle grpc');
//     const data = await reader.read(1024);
//     console.log(data);
//     message_cache.push(data);
//     if (message_cache.length === 31) {
//         message_cache.shift();
//     }
//     await send_data_via_websocket({ data });
//     writer.close();
// }
//
// async function start_grpc_server() {
//     console.log('start grpc');
//     const server = await io.startServer(handle_grpc, 'localhost', 5010);
//
//     // async with server {
//     //     console.log('5010 started');
//     //     await server.serveForever();
//     // }
// }
// async function send_data_via_websocket(data) {
//     for (const connection of connected) {
//         await connection.send(String(data).slice(2, -1));
//     }
// }
// async function run_websocket_server() {
//     console.log('run_ws');
//     await start_websocket_server();
// }
// async function start_servers_concurrently() {
//     console.log(2);
//     const server_grpc = io.createTask(start_grpc_server());
//     const server_ws = io.createTask(start_websocket_server());
//     await io.gather(server_grpc, server_ws);
// }
// console.log('run');
// const main_loop = io.getEventLoop();
// main_loop.runUntilComplete(start_servers_concurrently());
// main_loop.runForever();

