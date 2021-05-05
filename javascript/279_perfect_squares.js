/*
 * 279. Perfect Squares
 *
 * Q: https://leetcode.com/problems/perfect-squares/
 * A: https://leetcode.com/problems/perfect-squares/discuss/708644/Javascript-and-C%2B%2B-solutions
 */

// top-down brute-force
let numSquares = N => {
    let go = (i, min = Infinity) => {
        if (i <= 3)
            return i; // base cases 🛑
        for (let x = Math.floor(Math.sqrt(i)); 0 < x; --x)
            if (0 <= i - x * x)
                min = Math.min(min, 1 + go(i - x * x)); // min squares x*x to reach sum i 🎯
        return min;
    }
    return go(N);
};

// top-down with memo
let numSquares = (N, m = new Map()) => {
    let go = (i = N, min = Infinity) => {
        if (m.has(i))
            return m.get(i); // memo 🤔
        if (i <= 3)
            return m.set(i, i).get(i); // base cases 🛑
        for (let x = Math.floor(Math.sqrt(i)); 0 < x; --x)
            if (0 <= i - x * x)
                min = Math.min(min, 1 + go(i - x * x)); // min squares x*x to reach sum i 🎯
        return m.set(i, min).get(i);
    }
    return go();
};

// bottom-up
let numSquares = N => {
    let dp = Array(N + 1).fill(Infinity);
    for (let i = 0; i <= N && i <= 3; dp[i] = i, ++i); // base cases 🛑
    for (let i = 4; i <= N; ++i) {
        for (let x = Math.floor(Math.sqrt(i)); 0 < x; --x)
            if (0 <= i - x * x)
                dp[i] = Math.min(dp[i], 1 + dp[i - x * x]); // min squares x*x to reach sum i 🎯
    }
    return dp[N];
};

// bottom-up optimized
let numSquares = N => {
    let dp = [...Array(N + 1).keys()]; // implicit base cases 🛑
    for (let i = 4; i <= N; ++i) {
        for (let x = Math.floor(Math.sqrt(i)); 0 < x; --x)
            if (0 <= i - x * x)
                dp[i] = Math.min(dp[i], 1 + dp[i - x * x]); // min squares x*x to reach sum i 🎯
    }
    return dp[N];
};
