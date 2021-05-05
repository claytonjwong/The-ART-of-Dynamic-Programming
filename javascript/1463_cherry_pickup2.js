/*
 * 1463. Cherry Pickup II
 *
 * Q: https://leetcode.com/problems/cherry-pickup-ii/
 * A: https://leetcode.com/problems/cherry-pickup-ii/discuss/660828/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// top-down
let cherryPickup = A => {
    let M = A.length,
        N = A[0].length;
    let go = (k = 0, i = 0, j = N - 1) => {
        if (k == M)
            return 0;
        let best = 0;
        for (let u of [i - 1, i, i + 1])
            for (let v of [j - 1, j, j + 1])
                if (!(u < 0 || v < 0 || u == M || v == N || v <= u))
                    best = Math.max(best, go(k + 1, u, v));
        return A[k][i] + A[k][j] + best;
    };
    return go();
};

// top-down w/ memo
let cherryPickup = (A, m = new Map()) => {
    let M = A.length,
        N = A[0].length;
    let go = (k = 0, i = 0, j = N - 1) => {
        let key = `${k},${i},${j}`;
        if (m.has(key))
            return m.get(key);
        if (k == M)
            return m.set(key, 0).get(key);
        let best = 0;
        for (let u of [i - 1, i, i + 1])
            for (let v of [j - 1, j, j + 1])
                if (!(u < 0 || v < 0 || u == M || v == N || v <= u))
                    best = Math.max(best, go(k + 1, u, v));
        return m.set(key, A[k][i] + A[k][j] + best).get(key);
    };
    return go();
};

// bottom-up
let cherryPickup = (A, m = new Map()) => {
    let M = A.length,
        N = A[0].length;
    let dp = [...Array(M + 1)].map(_ => [...Array(N)].map(_ => Array(N).fill(0)));
    for (let k = M - 1; 0 <= k; --k)
        for (let i = 0; i < N; ++i)
            for (let j = 0; j < N; ++j)
                for (let u of [i - 1, i, i + 1])
                    for (let v of [j - 1, j, j + 1])
                        if (!(u < 0 || v < 0 || u == M || v == N || v <= u))
                            dp[k][i][j] = Math.max(dp[k][i][j], A[k][i] + A[k][j] + dp[k + 1][u][v]);
    return dp[0][0][N - 1];
};

// bottom-up mem-opt
let cherryPickup = (A, m = new Map()) => {
    let M = A.length,
        N = A[0].length;
    let pre = [...Array(N)].map(_ => Array(N).fill(0));
    for (let k = M - 1; 0 <= k; --k) {
        let cur = [...Array(N)].map(_ => Array(N).fill(0));
        for (let i = 0; i < N; ++i)
            for (let j = 0; j < N; ++j)
                for (let u of [i - 1, i, i + 1])
                    for (let v of [j - 1, j, j + 1])
                        if (!(u < 0 || v < 0 || u == M || v == N || v <= u))
                            cur[i][j] = Math.max(cur[i][j], A[k][i] + A[k][j] + pre[u][v]);
        [pre, cur] = [cur, pre];
    }
    return pre[0][N - 1];
};
