package es.uniovi.wasm;

class PerformanceTest {

    public static int fib(int n) {
        if (n == 1 || n == 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    public static void run(String env) {
        long startTime = System.currentTimeMillis();
        System.out.println(env + ": Fib: " + fib(40));
        long endTime = System.currentTimeMillis();
        System.out.println(env + ": Time: " + (endTime - startTime));
    }
}

