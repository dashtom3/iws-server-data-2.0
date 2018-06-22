require("babel-register")
global.print = console.log
var net = require('net');
var ModbusStringHandler = require('./ModbusStringHandler')
let handler = new ModbusStringHandler.default()
print(handler.CalcModbusCrc('010300000100'))

// print(handler.Pad(16*16,4,16))
// for(i=0;i<parseInt('100',16);i++){
//   print(handler.Pad(i,4,16,true))
// }
var socket = net.createServer()
socket.listen(6790)

socket.on('connection',(sock)=>{
  print('connected')
  print(sock)
  print(sock.remoteAddress + '' + sock.remotePort)
  // print(handler.CMD_ReadHoldingRegisters(1,16,16))
  // print(handler.ResponseHandler('010306010000ff0010'))
  // print(handler.ResponseHandler('010103cd6b05'))
  // print(handler.ResponseHandler('010203cd6b05'))
  sock.write(handler.Str2Hex('000100000006'+handler.CalcModbusCrc('010300000001')))
})
socket.on('data',(data)=>{
  print(data)
})
