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
socket.listen(6790,'0.0.0.0')
var data = [{'172.16.2.214':{length:41,zhan:01}}]
// print(handler.CalcModbusCrc('010100000029'))
socket.on('connection',(sock)=>{
  print('connected')
  print(sock)
  print(sock.remoteAddress + '' + sock.remotePort)
  // print(handler.CMD_ReadHoldingRegisters(1,16,16))
  // print(handler.ResponseHandler('010306010000ff0010'))
  // print(handler.ResponseHandler('010103cd6b05'))
  // print(handler.ResponseHandler('010203cd6b05'))
  // sock.write(handler.Str2Hex('000100000006'+handler.CalcModbusCrc('010300000001')))
  // sock.write('010100000029'+handler.CalcModbusCrc('010100000029'))
  sock.write(handler.CMD_ReadHoldingRegisters(1,0,41))
  sock.write(handler.CMD_ReadCoils(1,0,41))
})
socket.on('data',(data)=>{
  print(data)
})

//modbus协议解析   
//[11][01][00][13][00][25][CRC低][CRC高] 所有都为16进制
//<1> <2> <3> <4> <5> <6> <7> <8>
//<1>设备地址：站号 <2> 01 读取数字量的命令号固定为01 <3> 想读取的开关量的起始地址的高八位 <4> 想读取的开关量的起始地址的低八位
//<5>想读取的开关量的数量起始地址的高八位 <6> 想读取的开关量的数量的低八位 <7> <8> CRC的低八位和高八位
//返回值
//[11][01][05][CD][6B][B2][0E][1B][CRC低][CRC高]
//[设备地址] [命令号01] [返回的字节个数][数据1][数据2]...[数据n][CRC校验的低8位] [CRC校验的高8位]