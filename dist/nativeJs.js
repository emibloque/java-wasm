function benchmark(func, loop) {
  //func(); // warm-up
  const startTime = performance.now();
  for (var i = 0; i < loop; i++) {
    func();
  }
  const endTime = performance.now();
  return ((endTime - startTime) / loop).toFixed(4);
}




function multiplyInt(a, b, n) {
  let c = 1.0;
  for (let i = 0; i < n; i++) {
    c = c * a * b;
  }
  return c;
}

function multiplyDouble(a, b, n) {
  let c = 1.0;
  for (let i = 0; i < n; i++) {
    c = c * a * b;
  }
  return c;
}

function sumInt(array, n) {
  let s = 0;
  for (var i = 0; i < n; i++) {
    s += array[i];
  }
  return s;
}

function fib(n) {
  if (n === 1) return 1;
  if (n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}




function initArray(array) {
  for (var i = 0, il = array.length; i < il; i++) {
    array[i] = ((Math.random() * 20000) | 0) - 10000;
  }
}

//var sumIntArray = new Int32Array(0x8000000);
var sumIntArray = new Int32Array(1000000);
initArray(sumIntArray);

var performanceTestData = {
    sumArray: sumIntArray
}

const functions = {
  /*
   */
   "Fibonacci": () => fib(40),
   "MultiplyInt": () => multiplyInt(1.0, 1.0, 0x10000000),
   "MultiplyDouble": () => multiplyDouble(1.0, 1.0, 0x10000000),
   "SumInt": () => sumInt(sumIntArray, sumIntArray.length),
}

console.log(`Native JS: Start`);
for (const [name, fn] of Object.entries(functions)) {
  console.log(`Native JS: Time [${name}]: ${benchmark(fn, 10)}`);
}
console.log(`Native JS: Done`);
