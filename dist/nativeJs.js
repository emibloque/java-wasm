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

function sumInt(array) {
  let s = 0;
  for (var i = 0; i < array.length; i++) {
    s += array[i];
  }
  return s;
}

function multiplyIntVec(src1, src2, res) {
  for (var i = 0; i < src1.length; i++) {
    res[i] = src1[i] * src2[i];
  }
}

function quicksortInt(array, start, end) {
  if (start >= end) return;
  var pivot = array[end];
  var left = 0;
  var right = 0;
  while (left + right < end - start) {
    var num = array[start+left];
    if (num < pivot) {
      left++;
    } else {
      array[start+left] = array[end-right-1];
      array[end-right-1] = pivot;
      array[end-right] = num;
      right++;
    }
  }
  quicksortInt(array, start, start+left-1);
  quicksortInt(array, start+left+1, end);
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
var sumIntArray = new Int32Array(10000000);
var vectorIntArray1 = new Int32Array(10000000);
var vectorIntArray2 = new Int32Array(10000000);
var vectorIntArrayRes = new Int32Array(10000000);
var quicksortIntArray = new Int32Array(0x200000);
initArray(sumIntArray);
initArray(vectorIntArray1);
initArray(vectorIntArray2);
initArray(quicksortIntArray);

var performanceTestData = {
    sumArray: sumIntArray,
    quicksortIntArray: quicksortIntArray.slice(),
}

const functions = {
  /*
   */
   "Fibonacci": () => fib(40),
   "MultiplyInt": () => multiplyInt(1.0, 1.0, 0x10000000),
   "MultiplyDouble": () => multiplyDouble(1.0, 1.0, 0x10000000),
   "SumInt": () => sumInt(sumIntArray, sumIntArray.length),
   "MultiplyIntVec": () => multiplyIntVec(vectorIntArray1, vectorIntArray2, vectorIntArrayRes),
   "QuicksortInt": () => quicksortInt(quicksortIntArray, 0, quicksortIntArray.length - 1),
}

console.log(`Native JS: Start`);
for (const [name, fn] of Object.entries(functions)) {
  console.log(`Native JS: Time [${name}]: ${benchmark(fn, 1)}`);
}
console.log(`Native JS: Done`);
