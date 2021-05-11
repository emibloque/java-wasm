package es.uniovi.wasm;

import java.util.HashMap;

class PerformanceTest {

    public static int multiplyInt(int n) {
        int c = 1;
        for (var i = 0; i < n; i++) {
            c = c * 1 * 1;
        }
        return c;
    }

    public static int fib(int n) {
        if (n == 1 || n == 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    public static double benchmark(Runnable fn) {
        int loop = 10;
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < loop; i++) {
            fn.run();
        }
        long endTime = System.currentTimeMillis();
        return ((endTime - startTime) / 1. / loop);
    }

    public static void run(String env) {
        HashMap<String, Runnable> funcs = new HashMap<>() {{
            put("Fibonacci", () -> fib(40));
            put("MultiplyInt", () -> multiplyInt(268435456));
        }};

        System.out.println(env + ": Start");

        for (var entry : funcs.entrySet()) {
            System.out.println(env + ": Time [" + entry.getKey() + "]: " + benchmark(entry.getValue()));
        }

        System.out.println(env + ": Done");
    }
}

