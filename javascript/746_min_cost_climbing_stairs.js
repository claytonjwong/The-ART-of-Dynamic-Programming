/*
 * 746. Min Cost Climbing Stairs
 *
 * Q: https://leetcode.com/problems/min-cost-climbing-stairs/
 * A: https://leetcode.com/problems/min-cost-climbing-stairs/discuss/110111/Javascript-and-C%2B%2B-solutions
 */

// brute-force top-down DFS
let minCostClimbingStairs = A => {
    let N = A.length;
    let go = i => {
        if (N <= i)
            return 0; // 🛑  base case: we reached the top floor
        return A[i] + Math.min(go(i + 1), go(i + 2)); // cost of i-th stair plus min(one step or two steps) 🎯
    };
    return Math.min(go(0), go(1)); // start on min(first step, second step)
};

// top-down with memo
let minCostClimbingStairs = (A, m = {}) => {
    let N = A.length;
    let go = i => {
        if (m[i])
            return m[i]; // memo 🤔
        if (N <= i)
            return m[i] = 0; // 🛑  base case: we reached the top floor
        return m[i] = A[i] + Math.min(go(i + 1), go(i + 2)); // cost of i-th stair plus min(one step or two steps) 🎯
    };
    return Math.min(go(0), go(1)); // start on min(first step, second step)
};

// bottom-up
let minCostClimbingStairs = A => {
    let N = A.length;
    let dp = Array(N);
    dp[0] = A[0]; // 🛑  base case: start on first step
    dp[1] = A[1]; // 🛑  base case: start on second step
    for (let i = 2; i < N; ++i)
        dp[i] = A[i] + Math.min(dp[i - 2], dp[i - 1]); // cost of i-th stair plus min(one step or two steps) 🎯
    return Math.min(dp[N - 2], dp[N - 1]); // N-th stair is reached from min of one or two stairs away
};

// bottom-up memory optimized
let minCostClimbingStairs = A => {
    let N = A.length;
    let a = A[0], // 🛑  base case: start on first step
        b = A[1], // 🛑  base case: start on second step
        c = -1;
    for (let i = 2; i < N; ++i, a = b, b = c)
        c = A[i] + Math.min(a, b); // cost of i-th stair plus min(one step or two steps) 🎯
    return Math.min(a, b); // N-th stair is reached from min of one or two stairs away
};
