
    bytecoder.imports.performancetestdata = bytecoder.imports.performancetestdata || {};

    // This method has no arguments so it's simply called navigator
    bytecoder.imports.performancetestdata.performanceTestData = function (thisref) {
        return bytecoder.toBytecoderReference(parent.performanceTestData);
    };
const bytecoderWasmFile = "bytecoder.wasm";
const instantiated = function (result) {


  bytecoder.init(result.instance);
  bytecoder.exports.initMemory(0);
  bytecoder.exports.bootstrap(0);
  bytecoder.initializeFileIO();

  // We have to activate the garbage collector!
  var gcInterval = 200; // How often will the GC be triggered (in ms)
  var gcMaxObjectsPerRun = 30; // How many objects will be collected during one run
  var gcRunning = false;
  var runcounter = 0; // Used for debugging
  setInterval(function () {
    if (!gcRunning) {
      gcRunning = true;
      const freed = bytecoder.exports.IncrementalGC(
        0,
        gcMaxObjectsPerRun
      );
      if (runcounter++ % 10 === 0) {
        const freemem = bytecoder.exports.freeMem(0);
        const epoch = bytecoder.exports.GCEpoch(0);
        // console.log(freemem + " bytes free memory after GC, epoch = " + epoch);
      }
      gcRunning = false;
    }
  }, gcInterval);

  bytecoder.exports.main(0);
};

WebAssembly.instantiateStreaming(fetch(bytecoderWasmFile), bytecoder.imports)
  .then(instantiated)
  .catch(function (error) {
    const request = new XMLHttpRequest();
    request.open("GET", bytecoderWasmFile);
    request.responseType = "arraybuffer";
    request.send();
    request.onload = function () {
      const bytes = request.response;
      WebAssembly.instantiate(bytes, bytecoder.imports)
        .then(instantiated);
    };
  });
