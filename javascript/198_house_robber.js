/*
 * 198. House Robber
 *
 * Q: https://leetcode.com/problems/house-robber/
 * A: https://leetcode.com/problems/house-robber/discuss/846461/Javascript-Python3-C%2B%2B-The-ART-of-Dynamic-Programming
 */

// brute-force
let rob = A => {
    let go = (pre = -2, cur = 0) => {
        if (cur == A.length)
            return 0;                 // 🛑 base case
        else if (pre == cur - 1)
            return go(pre, cur + 1);  // 🚫 without (due to adjacent neighbor constraint)
        else
            return Math.max(A[cur] + go(cur, cur + 1), go(pre, cur + 1));  // # ✅ with or 🚫 without
    };
    return go();
};

// memo
let rob = (A, m = new Map()) => {
    let go = (pre = -2, cur = 0) => {
        let key = `${pre},${cur}`;
        if (m.has(key))
            return m.get(key);             // 🤔 memo
        if (cur == A.length)
            m.set(key, 0);                 // 🛑 base case
        else if (pre == cur - 1)
            m.set(key, go(pre, cur + 1));  // 🚫 without (due to adjacent neighbor constraint)
        else
            m.set(key, Math.max(A[cur] + go(cur, cur + 1), go(pre, cur + 1)));  // # ✅ with or 🚫 without
        return m.get(key);
    };
    return go();
};

// bottom-up
let rob = A => {
    let N = A.length;
    let dp = Array(N + 2).fill(0);                      // 🤔 memo +2 for 🛑 base cases
    for (let i = N - 1; 0 <= i; --i)
        dp[i] = Math.max(A[i] + dp[i + 2], dp[i + 1]);  // # ✅ with or 🚫 without
    return Math.max(dp[0], dp[1]);
};
