package es.uniovi.wasm;

import de.mirkosertic.bytecoder.api.OpaqueProperty;
import de.mirkosertic.bytecoder.api.OpaqueReferenceType;
import de.mirkosertic.bytecoder.api.web.IntArray;

public abstract class PerformanceTestData implements OpaqueReferenceType {
    public static native PerformanceTestData performanceTestData();

    @OpaqueProperty
    public abstract IntArray sumArray();
}