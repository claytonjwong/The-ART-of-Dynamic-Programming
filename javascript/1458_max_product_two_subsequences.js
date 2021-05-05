/*
 * 1458. Max Dot Product of Two Subsequences
 *
 * Q: https://leetcode.com/problems/max-dot-product-of-two-subsequences/
 * A: https://leetcode.com/problems/max-dot-product-of-two-subsequences/discuss/653625/Javascript-and-C%2B%2B-solutions
 */

// hack for base case (when ans == 0 due to an empty subsequence of A or B)
let maxDotProduct = (A, B) => {
    let M = A.length,
        N = B.length;
    let m = [...Array(M + 1)].map(row => Array(N + 1).fill(-1));
    let go = (i = 0, j = 0) => {
        if (m[i][j] > -1)
            return m[i][j];
        if (i == M || j == N)
            return m[i][j] = 0;
        return m[i][j] = Math.max(
            go(i + 1, j + 1) + A[i] * B[j],
            go(i, j + 1), go(i + 1, j)
        );
    };
    let ans = go();
    if (ans)
        return ans;
    let max = -Infinity;
    A = [...new Set(A)];
    B = [...new Set(B)];
    A.forEach(x => B.forEach(y => max = Math.max(max, x * y)));
    return max;
};

// properly handle base case (ie. do not allow empty subsequence of A or B): TLE without Memo
let maxDotProduct = (A, B) => {
    let M = A.length,
        N = B.length;
    let go = (i = 0, j = 0) => {
        if (i == M || j == N)
            return 0;
        let max = A[i] * B[j] + Math.max(0, go(i + 1, j + 1)); // case 1: max(0, ...) to add recursive max product only if beneficial
        if (i < M - 1) max = Math.max(max, go(i + 1, j));      // case 2: without A[i], i < M - 1 to ensure subsequence of A is non-empty
        if (j < N - 1) max = Math.max(max, go(i, j + 1));      // case 3: without B[j], j < N - 1 to ensure subsequence of B is non-empty
        return max; // 🎯
    };
    return go();
};

// properly handle base case (ie. do not allow empty subsequence of A or B): AC with memo
let maxDotProduct = (A, B) => {
    let M = A.length,
        N = B.length;
    let m = [...Array(M + 1)].map(row => Array(N + 1).fill(-Infinity));
    let go = (i = 0, j = 0) => {
        if (m[i][j] > -Infinity)
            return m[i][j];
        if (i == M || j == N)
            return m[i][j] = 0;
        m[i][j] = A[i] * B[j] + Math.max(0, go(i + 1, j + 1));    // case 1: max(0, ...) to add recursive max product only if beneficial
        if (i < M - 1) m[i][j] = Math.max(m[i][j], go(i + 1, j)); // case 2: without A[i], i < M - 1 to ensure subsequence of A is non-empty
        if (j < N - 1) m[i][j] = Math.max(m[i][j], go(i, j + 1)); // case 3: without B[j], j < N - 1 to ensure subsequence of B is non-empty
        return m[i][j]; // 🎯
    };
    return go();
};

// bottom-up
let maxDotProduct = (A, B) => {
    let M = A.length,
        N = B.length;
    let dp = [...Array(M + 1)].map(row => Array(N + 1).fill(-Infinity)); // -INF ensures subsequences of A and B are non-empty
    for (let i = 1; i <= M; ++i)
        for (let j = 1; j <= N; ++j)
            dp[i][j] = Math.max(
                A[i - 1] * B[j - 1] + Math.max(0, dp[i - 1][j - 1]), // case 1: max(0, ...) to add recursive max product only if beneficial
                dp[i - 1][j],                                        // case 2: without A[i]
                dp[i][j - 1],                                        // case 3: without B[j]
            );
    return dp[M][N]; // 🎯
};

// bottom-up with memory optimization
let maxDotProduct = (A, B) => {
    let M = A.length,
        N = B.length;
    let pre = Array(N + 1).fill(-Infinity), // -INF ensures subsequences of A and B are non-empty
        cur = [...pre];
    for (let i = 1; i <= M; ++i) {
        for (let j = 1; j <= N; ++j)
            cur[j] = Math.max(
                A[i - 1] * B[j - 1] + Math.max(0, pre[j - 1]), // case 1: max(0, ...) to add recursive max product only if beneficial
                pre[j],                                        // case 2: without A[i]
                cur[j - 1],                                    // case 3: without B[j]
            );
        [pre, cur] = [cur, pre]; // swap
    }
    return pre[N]; // 🎯
};
