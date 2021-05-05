/*
 * 518. Coin Change 2
 *
 * Q: https://leetcode.com/problems/coin-change-2/
 * A: https://leetcode.com/problems/coin-change-2/discuss/677893/Javascript-and-C%2B%2B-solutions
 */

// TopDown
let change = (T, A) => {
    let N = A.length;
    let go = (i = 0, t = T) => {
        if (!t)
            return 1;
        if (i == N)
            return 0;
        return (0 <= t - A[i] ? go(i, t - A[i]) : 0) + go(i + 1, t); // with ✅ A[i] + without ❌ A[i]
    };
    return go();
};

// TopDown with Memo
let change = (T, A) => {
    let N = A.length;
    let m = [...Array(N + 1)].map(row => Array(T + 1).fill(-1))
    let go = (i = 0, t = T) => {
        if (m[i][t] > -1)
            return m[i][t];
        if (!t)
            return m[i][t] = 1;
        if (i == N)
            return m[i][t] = 0;
        return m[i][t] = (0 <= t - A[i] ? go(i, t - A[i]) : 0) + go(i + 1, t); // with ✅ A[i] + without ❌ A[i]
    };
    let ans = go();
    return ans;
};

// BottomUp
let change = (T, A) => {
    let N = A.length;
    let dp = [...Array(N + 1)].map(row => Array(T + 1).fill(0));
    for (let i = 0; i <= N; ++i)
        dp[i][0] = 1;
    for (let i = 1; i <= N; ++i)
        for (let t = 1; t <= T; ++t)
            dp[i][t] = (0 <= t - A[i - 1] ? dp[i][t - A[i - 1]] : 0) + dp[i - 1][t]; // with ✅ A[i] + without ❌ A[i]
    return dp[N][T];
};

// BottomUp MemOpt1
let change = (T, A) => {
    let N = A.length;
    let pre = Array(T + 1).fill(0),
        cur = [...pre];
    pre[0] = 1;
    for (let i = 1; i <= N; ++i) {
        cur[0] = 1;
        for (let t = 1; t <= T; ++t)
            cur[t] = (0 <= t - A[i - 1] ? cur[t - A[i - 1]] : 0) + pre[t]; // with ✅ A[i] + without ❌ A[i]
        [pre, cur] = [cur, pre];
    }
    return pre[T];
};

// BottomUp MemOpt2
let change = (T, A) => {
    let N = A.length;
    let dp = Array(T + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= N; ++i)
        for (let t = 1; t <= T; ++t)
            dp[t] += 0 <= t - A[i - 1] ? dp[t - A[i - 1]] : 0;  // with ✅ A[i] + without ❌ A[i]
    return dp[T];
};