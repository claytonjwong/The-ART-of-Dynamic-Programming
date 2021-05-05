/*
 * 322. Coin Change
 *
 * Q: https://leetcode.com/problems/coin-change/
 * A: https://leetcode.com/problems/coin-change/discuss/677858/Javascript-and-C%2B%2B-solutions
 */

// Top-Down: TLE
let coinChange = (A, T) => {
    let N = A.length;
    let go = (i = 0, t = T) => {
        if (!t)
            return 0;
        if (i == N)
            return Infinity;
        return Math.min(1 + (0 <= t - A[i] ? go(i, t - A[i]) : Infinity), go(i + 1, t)); // min(1 + with, without)
    };
    let ans = go();
    return ans < Infinity ? ans : -1;
};

// Top-Down with Memo: AC
let coinChange = (A, T) => {
    let N = A.length;
    let m = [...Array(N + 1)].map(_ => Array(T + 1).fill(-1));
    let go = (i = 0, t = T) => {
        if (m[i][t] > -1)
            return m[i][t];
        if (!t)
            return m[i][t] = 0;
        if (i == N)
            return m[i][t] = Infinity;
        return m[i][t] = Math.min(1 + (0 <= t - A[i] ? go(i, t - A[i]) : Infinity), go(i + 1, t)); // min(1 + with or without)
    };
    let ans = go();
    return ans < Infinity ? ans : -1;
};

// Bottom-Up: AC
let coinChange = (A, T) => {
    let N = A.length;
    let dp = [...Array(N + 1)].map(_ => Array(T + 1).fill(Infinity));
    for (let i = 0; i <= N; ++i)
        dp[i][0] = 0;
    for (let i = 1; i <= N; ++i)
        for (let t = 1; t <= T; ++t)
            dp[i][t] = Math.min(1 + (0 <= t - A[i - 1] ? dp[i][t - A[i - 1]] : Infinity), dp[i - 1][t]); // min(1 + with or without)
    return dp[N][T] < Infinity ? dp[N][T] : -1;
};

// Bottom-Up Memory Optimized 1: AC
let coinChange = (A, T) => {
    let N = A.length;
    let pre = Array(T + 1).fill(Infinity),
        cur = [...pre];
    for (let i = 1; i <= N; ++i) {
        cur[0] = 0;
        for (let t = 1; t <= T; ++t)
            cur[t] = Math.min(1 + (0 <= t - A[i - 1] ? cur[t - A[i - 1]] : Infinity), pre[t]); // min(1 + with or without)
        [pre, cur] = [cur, pre];
    }
    return pre[T] < Infinity ? pre[T] : -1;
};

// Bottom-Up Memory Optimized 2: AC
let coinChange = (A, T) => {
    let N = A.length;
    let dp = Array(T + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= N; ++i)
        for (let t = 1; t <= T; ++t)
            dp[t] = Math.min(1 + (0 <= t - A[i - 1] ? dp[t - A[i - 1]] : Infinity), dp[t]); // min(1 + with or without)
    return dp[T] < Infinity ? dp[T] : -1;
};