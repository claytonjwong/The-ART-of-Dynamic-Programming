/*
 * 877. Stone Game
 *
 * Q: https://leetcode.com/problems/stone-game/
 * A: https://leetcode.com/problems/stone-game/discuss/706734/Javascript-and-C%2B%2B-solutions
 */

// top-down brute-force
let stoneGame = A => {
    let N = A.length;
    let go = (i = 0, j = N - 1) => {
        if (i == j)
            return A[i]; // first == last 🛑
        return Math.max(A[i] - go(i + 1, j), A[j] - go(i, j - 1)); // max(first, last) 🎯
    };
    return 0 < go();
};

// top-down memo
let stoneGame = A => {
    let N = A.length;
    let m = [...Array(N)].map(_ => Array(N).fill(0));
    let go = (i = 0, j = N - 1) => {
        if (m[i][j])
            return m[i][j]; // memo 🤔
        if (i == j)
            return m[i][j] = A[i]; // first == last 🛑 
        let ans = m[i][j] = Math.max(A[i] - go(i + 1, j), A[j] - go(i, j - 1)); // max(first, last) 🎯
        return ans;
    };
    return 0 < go();
};

// bottom-up
let stoneGame = A => {
    let N = A.length;
    let dp = [...Array(N)].map(_ => Array(N).fill(0)); // memo 🤔
    for (let i = N - 1; 0 <= i; --i)
        dp[i][i] = A[i]; // first == last 🛑
    for (let i = N - 1; 0 <= i; --i) // i-th first stone
        for (let j = i + 1; j < N; ++j) // j-th last stone
            dp[i][j] = Math.max(dp[i][i] - dp[i + 1][j], dp[j][j] - dp[i][j - 1]); // max(first, last) 🎯
    return 0 < dp[0][N - 1];
};

// bottom-up optimized
let stoneGame = A => {
    let N = A.length;
    let dp = [...Array(N)].map(_ => Array(N).fill(0)); // memo 🤔
    for (let i = N - 1; 0 <= i; --i) // i-th first stone
        for (let j = i + 1; j < N; ++j) // j-th last stone
            dp[i][j] = Math.max(A[i] - dp[i + 1][j], A[j] - dp[i][j - 1]); // max(first, last) 🎯
    return 0 < dp[0][N - 1];
};
