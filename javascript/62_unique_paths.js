/*
 * 62. Unique Paths
 *
 * Q: https://leetcode.com/problems/unique-paths/
 * A: https://leetcode.com/problems/unique-paths/discuss/22965/c-top-down-recursion-and-bottom-up-dp/501132
 */

// let uniquePaths = (M, N, m = {}) => {
//     m[`0,0`] = 1;
//     let go = (i, j) => {
//         let k = `${i},${j}`
//         if (m[k])
//             return m[k];
//         if (i == 0 || j == 0)
//             return m[k] = 1;
//         return m[k] = go(i - 1, j) + go(i, j - 1);
//     };
//     go(M, N);
//     return m[`${M - 1},${N - 1}`];
// };

// let uniquePaths = (M, N, m = {}) => {
//     let dp = [...Array(M)].map(row => Array(N).fill(1));
//     for (let i = 1; i < M; ++i)
//         for (let j = 1; j < N; ++j)
//             dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
//     return dp[M - 1][N - 1];
// };

let uniquePaths = (M, N, m = {}) => {
    let pre = Array(N).fill(1),
        cur = Array(N).fill(1);
    for (let i = 1; i < M; ++i) {
        for (let j = 1; j < N; ++j)
            cur[j] = pre[j] + cur[j - 1];
        [pre, cur] = [cur, pre];
    }
    return pre[N - 1];
};