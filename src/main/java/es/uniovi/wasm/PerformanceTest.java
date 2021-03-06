package es.uniovi.wasm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import de.mirkosertic.bytecoder.api.web.IntArray;

class PerformanceTest {

    public static int multiplyInt(int a, int b, int n) {
        int c = 1;
        for (var i = 0; i < n; i++) {
            c = c * a * b;
        }
        return c;
    }

    public static double multiplyDouble(double a, double b, int n) {
        double c = 1.0;
        for (var i = 0; i < n; i++) {
            c = c * a * b;
        }
        return c;
    }

    public static double sumInt(IntArray array, int n) {
        int s = 0;
        for (int i = 0; i < n; i++) {
            s += array.getIntValue(i);
        }
        return s;
    }

    public static double sumInt(int[] array, int n) {
        int s = 0;
        for (int i = 0; i < n; i++) {
            s += array[i];
        }
        return s;
    }

    public static int multiplyIntVec(int[] src1, int[] src2) {
        int c = 0;
        for (var i = 0; i < src1.length; i++) {
            c = src1[i] * src2[i];
        }
        return c;
    }

    public static void quicksortInt(int[] array, int start, int end) {
        if (start >= end) return;
        var pivot = array[end];
        var left = 0;
        var right = 0;
        while (left + right < end - start) {
            var num = array[start + left];
            if (num < pivot) {
                left++;
            } else {
                array[start + left] = array[end - right - 1];
                array[end - right - 1] = pivot;
                array[end - right] = num;
                right++;
            }
        }
        quicksortInt(array, start, start + left - 1);
        quicksortInt(array, start + left + 1, end);
    }

    public static int fib(int n) {
        if (n == 1 || n == 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    public static double benchmark(Runnable fn) {
        int loop = 1;
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < loop; i++) {
            fn.run();
        }
        long endTime = System.currentTimeMillis();
        return ((endTime - startTime) / 1. / loop);
    }

    public static void run(String env) {
        var data = PerformanceTestData.performanceTestData();

        System.out.println(env + ": Build array");
        var sumArray = toArray(data.sumArray());
        var quicksortIntArray = toArray(data.quicksortIntArray());

        HashMap<String, Runnable> funcs = new HashMap<>() {{
            /*

             */
            put("Fibonacci", () -> fib(40));
            put("MultiplyInt", () -> multiplyInt(1, 1, 0x10000000));
            put("MultiplyDouble", () -> multiplyDouble(1.0, 1.0, 0x10000000));
            put("SumInt", () -> sumInt(data.sumArray(), data.sumArray().intArrayLength()));
            put("SumIntNative", () -> sumInt(sumArray, sumArray.length));
            put("MultiplyIntVec", () -> multiplyIntVec(sumArray, sumArray));
            put("QuicksortInt", () -> quicksortInt(quicksortIntArray, 0, quicksortIntArray.length - 1));
        }};

        System.out.println(env + ": Start");

        for (var entry : funcs.entrySet()) {
            System.out.println(env + ": Time [" + entry.getKey() + "]: " + benchmark(entry.getValue()));
        }

        System.out.println(env + ": Done");
    }

    private static int[] toArray(IntArray array) {
        int length = array.intArrayLength();
        int[] result = new int[length];
        var rand = new Random();
        for (int i = 0; i < length; i++) {
            result[i] = array.getIntValue(i);
        }
        return result;
    }
}

