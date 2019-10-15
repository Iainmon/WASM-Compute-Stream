/// <reference path="../node_modules/assemblyscript/index.d.ts" />

declare type u64 = number;

var memory = new Map<u64, u64>();

// Fibonacci wrapper for memory
export function fib(n: u64): u64 {

    // Checks if the pair is memorized
    if (memory.has(n)) {
        return memory.get(n);
    }

    // Saves the value to memory
    memory.set(n, _fib(n));
    
    // Returns the saved value
    return memory.get(n);
}

// Recursive Fibonacci function
function _fib(n: u64): u64 {

    if (n <= 1) {
        return n;
    }

    return _fib(n - 1) + _fib(n - 2);
}