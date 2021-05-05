/*
 * 799. Champagne Tower
 *
 * Q: https://leetcode.com/problems/champagne-tower/
 * A: https://leetcode.com/problems/champagne-tower/discuss/118694/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// top-down with memo
let champagneTower = (K, M, N, m = new Map()) => {
    let go = (i, j) => {
        let key = `${i},${j}`;
        if (m.has(key))
            return m.get(key);           // 🤔 memo
        else if (!i && !j)
            m.set(key, K);               // 🛑 base case: glass at row 0 column 0 has K poured through it
        else if (!i || j < 0)
            m.set(key, 0.0);             // 🚫 non-existent parent glass has 0.0 poured through it
        else {
            // ⭐️ each parent glass above-and-to-the-(L)eft/(R)ight either overflow when the amount poured exceeds 1.0 xor do *not* overflow when the amount poured does *not* exceed 1.0
            // 💎 -1.0 since parent glass above consumes at-most 1.0 of the pour and div 2 when overflow occurs, because half overflows on each side of the parent glass
            let L = go(i - 1, j - 1),
                R = go(i - 1, j);
            m.set(key, (1.0 <= L ? (L - 1.0) / 2 : 0.0) + (1.0 <= R ? (R - 1.0) / 2 : 0.0));
        }
        return m.get(key);
    };
    go(M, Math.max(M, N));               // 🌟 since the glasses above-and-to-the-right potentially contribute to the amount poured to M, N we choose N to be the maximum of M, N
    return Math.min(go(M, N), 1.0);
};

// bottom-up
let champagneTower = (K, M, N) => {
    let dp = [...Array(M + 1)].map(_ => Array(N + 2).fill(0));
    dp[0][0] = K;
    for (let i = 0; i < M; ++i) {
        for (let j = 0; j <= N; ++j) {
            if (dp[i][j] <= 1.0)  // no overflow
                continue;
            let half = (dp[i][j] - 1.0) / 2;  // -1.0 to fill cup i,j
            dp[i + 1][j]     += half;
            dp[i + 1][j + 1] += half;
        }
    }
    return Math.min(dp[M][N], 1.0);
};


// memory optimized
let champagneTower = (K, M, N) => {
    let pre = Array(N + 2).fill(0.0);
    pre[0] = K;
    while (M--) {
        let cur = Array(N + 2).fill(0.0);
        for (let j = 0; j <= N; ++j) {
            if (pre[j] <= 1.0)  // no overflow
                continue;
            let half = (pre[j] - 1.0) / 2;  // -1.0 to fill cup i,j
            cur[j]     += half;
            cur[j + 1] += half;
        }
        [pre, cur] = [cur, pre];
    }
    return Math.min(pre[N], 1.0);
};
