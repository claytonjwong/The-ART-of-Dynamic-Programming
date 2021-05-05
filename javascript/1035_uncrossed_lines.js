/*
 * 1035. Uncrossed Lines
 *
 * Q: https://leetcode.com/problems/uncrossed-lines/
 * A: https://leetcode.com/problems/uncrossed-lines/discuss/652184/Javascript-and-C%2B%2B-solutions
 */

// Top-Down: TLE
let maxUncrossedLines = (A, B) => {
    let M = A.length,
        N = B.length;
    let go = (i = 0, j = 0) => {
        if (i == M || j == N)
            return 0;
        return Math.max(
            go(i + 1, j + 1) + Number(A[i] == B[j]), // match 🎯 / mismatch
            go(i, j + 1), go(i + 1, j)               // insertion / deletion
        );
    };
    return go();
};

// Top-Down with Memo: AC
let maxUncrossedLines = (A, B) => {
    let M = A.length,
        N = B.length;
    let m = [...Array(M + 1)].map(row => Array(N + 1).fill(-1));
    let go = (i = 0, j = 0) => {
        if (m[i][j] > -1)
            return m[i][j];
        if (i == M || j == N)
            return m[i][j] = 0;
        return m[i][j] = Math.max(
            go(i + 1, j + 1) + Number(A[i] == B[j]), // match 🎯 / mismatch
            go(i, j + 1), go(i + 1, j)               // insertion / deletion
        );
    };
    return go();
};

// Bottom-Up: AC
let maxUncrossedLines = (A, B) => {
    let M = A.length,
        N = B.length;
    let dp = [...Array(M + 1)].map(row => Array(N + 1).fill(0));
    for (let i = 1; i <= M; ++i)
        for (let j = 1; j <= N; ++j)
            dp[i][j] = Math.max(
                dp[i - 1][j - 1] + Number(A[i - 1] == B[j - 1]), // match 🎯 / mismatch
                dp[i][j - 1], dp[i - 1][j]                       // insertion / deletion
            );
    return dp[M][N];
};

// Bottom-Up Mem Opt: AC
let maxUncrossedLines = (A, B) => {
    let M = A.length,
        N = B.length;
    let pre = Array(N + 1).fill(0),
        cur = [...pre];
    for (let i = 1; i <= M; ++i) {
        for (let j = 1; j <= N; ++j)
            cur[j] = Math.max(
                pre[j - 1] + Number(A[i - 1] == B[j - 1]), // match 🎯 / mismatch
                cur[j - 1], pre[j]                         // insertion / deletion
            );
        [pre, cur] = [cur, pre]; // swap
    }
    return pre[N];
};