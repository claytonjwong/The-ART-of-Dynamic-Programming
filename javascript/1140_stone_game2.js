/*
 * 1140. Stone Game II
 *
 * Q: https://leetcode.com/problems/stone-game-ii/
 * A: https://leetcode.com/problems/stone-game-ii/discuss/713502/Javascript-and-C%2B%2B-solutions
 */

// top-down brute-force
let stoneGameII = A => {
    let N = A.length;
    let go = (i, k, total, max = 0, take = 0) => {
        for (let j = i, stones = 1; j < Math.min(i + 2 * k, N); ++j, ++stones) // take each j-th stone until 🛑 base case: j == N
            max = Math.max(max, total - go(j + 1, Math.max(k, stones), total - (take += A[j]))); // 🎯 max my score minus max your score
        return max;
    };
    return go(0, 1, A.reduce((a, b) => a + b));
};

// top-down memo
let stoneGameII = A => {
    let N = A.length;
    let m = [...Array(N + 1)].map(_ => Array(N + 1).fill(0));
    let go = (i, k, total, max = 0, take = 0) => {
        if (m[i][k])
            return m[i][k]; // 🤔 memo
        for (let j = i, stones = 1; j < Math.min(i + 2 * k, N); ++j, ++stones) // take each j-th stone until 🛑 base case: j == N
            max = Math.max(max, total - go(j + 1, Math.max(k, stones), total - (take += A[j]))); // 🎯 max my score minus max your score
        return m[i][k] = max;
    };
    return go(0, 1, A.reduce((a, b) => a + b));
};

// bottom-up
let stoneGameII = A => {
    let N = A.length;
    let dp = [...Array(N + 1)].map(_ => Array(N + 1).fill(0)); // dp[i][j] == best total possible ending at i using last j from N-1..0 inclusive stones
    let total = Array(N + 1).fill(0);
    for (let i = N - 1; 0 <= i; --i)
        dp[i][N] = total[i] = total[i + 1] + A[i]; // 🛑  base cases: suffix sums, ie. when j == N, then initial state of "no stones taken"
    for (let i = N - 1; 0 <= i; --i)
        for (let j = N - 1; 1 <= j; --j)
            for (let k = 1; k <= 2 * j && i + k <= N; ++k)
                dp[i][j] = Math.max(dp[i][j], total[i] - dp[i + k][Math.max(j, k)]); // 🎯 max my score minus max your score
    return dp[0][1];
};
