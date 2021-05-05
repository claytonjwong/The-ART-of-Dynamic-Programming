/*
 * 72. Edit Distance
 *
 * Q: https://leetcode.com/problems/edit-distance/
 * A: https://leetcode.com/problems/edit-distance/discuss/479377/Javascript-and-C%2B%2B-solutions
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

/*
let minDistance = (A, B) => {
    let go = (A, B, i, j) => {
        let key = `${i},${j}`;
        if (i == 0 || j == 0)
            return i + j;
        return Math.min(
            go(A, B, i - 1, j - 1) + Number(A[i - 1] != B[j - 1]),
            go(A, B, i - 1, j) + 1,
            go(A, B, i, j - 1) + 1
        );
    };
    return go(A, B, A.length, B.length);
};
*/

/*
let minDistance = (A, B) => {
    let go = (A, B, i, j, memo = {}) => {
        let key = `${i},${j}`;
        if (memo[key])
            return memo[key];
        if (i == 0 || j == 0)
            return memo[key] = i + j;
        return memo[key] = Math.min(
            go(A, B, i - 1, j - 1, memo) + Number(A[i - 1] != B[j - 1]),
            go(A, B, i - 1, j, memo) + 1,
            go(A, B, i, j - 1, memo) + 1
        );
    };
    return go(A, B, A.length, B.length);
};
*/

/*
let minDistance = (A, B) => {
    let [M, N] = [A.length, B.length];
    let dp = [...Array(M + 1)].map(row => Array(N + 1).fill(0));
    for (let i = 0; i <= M; ++i) dp[i][0] = i;
    for (let j = 0; j <= N; ++j) dp[0][j] = j;
    for (let i = 1; i <= M; ++i)
        for (let j = 1; j <= N; ++j)
            dp[i][j] = Math.min(
                dp[i - 1][j - 1] + Number(A[i - 1] != B[j - 1]),
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
            );
    return dp[M][N];
};
*/

let minDistance = (A, B) => {
    let [M, N] = [A.length, B.length];
    let pre = [...Array(N + 1).keys()], cur = Array(N + 1);
    for (let i = 1; i <= M; ++i) {
        cur[0] = i;
        for (let j = 1; j <= N; ++j) {
            cur[j] = Math.min(
                pre[j - 1] + Number(A[i - 1] != B[j - 1]),
                pre[j] + 1,
                cur[j - 1] + 1,
            );
        }
        [pre, cur] = [cur, pre];
    }
    return pre[N];
};

