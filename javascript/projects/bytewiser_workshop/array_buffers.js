var num = parseInt(process.argv[2], 10);

var array32 = new Uint32Array(1);
array32[0] = num;

var array16 = new Uint16Array(array32.buffer);
console.log(JSON.stringify(array16));
