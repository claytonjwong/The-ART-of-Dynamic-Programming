/*
 * 213. House Robber II
 *
 * Q: https://leetcode.com/problems/house-robber-ii/
 * A: https://leetcode.com/problems/house-robber-ii/discuss/894504/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// brute-force
let rob = A => {
    let N = A.length;
    let go = (i, first, last) => {
        if (i == N)                                                           // 🛑 base case
            return 0;
        if (last + 1 == i || (first && i + 1 == N && 1 < N))                  // 🚫 without i-th house (due to adjacent neighbor constraint)
            return go(i + 1, first, last);
        return Math.max(A[i] + go(i + 1, first, i), go(i + 1, first, last));  // ✅ with i-th house xor 🚫 without i-th house
    };
    return Math.max(go(0, true, -123), go(1, false, -123));                   // ✅ with first house xor 🚫 without first house
};

// top-down memo
let rob = (A, m = {}) => {
    let N = A.length;
    let go = (i, first, last) => {
        let key = `${i},${first},${last}`;
        if (m[key] != undefined)                                                       // 🤔 memo
            return m[key];
        if (i == N)                                                                    // 🛑 base case
            return m[key] = 0;
        if (last + 1 == i || (first && i + 1 == N && 1 < N))                           // 🚫 without i-th house (due to adjacent neighbor constraint)
            return m[key] = go(i + 1, first, last);
        return m[key] = Math.max(A[i] + go(i + 1, first, i), go(i + 1, first, last));  // ✅ with i-th house xor 🚫 without i-th house
    };
    return Math.max(go(0, true, -123), go(1, false, -123));                            // ✅ with first house xor 🚫 without first house
};

// bottom-up
let rob = A => {
    let N = A.length;
    if (N == 1)                                                    // 💎 corner case
        return A[0];
    let best = start => {
        let dp = Array(N + 2).fill(0);                             // 🤔 memo + 🛑 base cases (ie. dp[N] = 0 and dp[N + 1] = 0)
        for (let i = N - 1 - (start ? 0 : 1); start <= i; --i)
            dp[i] = Math.max(A[i] + dp[i + 2], dp[i + 1])          // ✅ with i-th house xor 🚫 without i-th house
        return dp[start];
    };
    return Math.max(best(0), best(1));                             // ✅ with first house xor 🚫 without first house
};

// bottom-up memory optimization
let rob = A => {
    let N = A.length;
    if (N == 1)                                                 // 💎 corner case
        return A[0];
    let best = start => {
        let [ a, b, c ] = [ 0, 0, 0 ];                          // 🤔 memo + 🛑 base cases (ie. a = 0 and b = 0)
        for (let i = N - 1 - (start ? 0 : 1); start <= i; --i)
            c = Math.max(A[i] + a, b),                          // ✅ with i-th house xor 🚫 without i-th house
            a = b, b = c;                                       // 👉 slide window
        return c;
    };
    return Math.max(best(0), best(1));                          // ✅ with first house xor 🚫 without first house
};
