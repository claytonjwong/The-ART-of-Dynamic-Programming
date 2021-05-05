/*
 * 91. Decode Ways
 *
 * Q: https://leetcode.com/problems/decode-ways/
 * A: https://leetcode.com/problems/decode-ways/discuss/117143/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// top-down
let numDecodings = s => {
    let N = s.length;
    let ok = x => 1 <= x && x <= 26;
    let go = i => {
        if (i == N)
            return 1;
        let cnt = 0,
            one = Number(s[i]),
            two = one && i + 1 < N ? Number(s[i] + s[i + 1]) : 0;
        if (ok(one)) cnt += go(i + 1);
        if (ok(two)) cnt += go(i + 2);
        return cnt;
    };
    return go(0);
};

// top-down with memo
let numDecodings = (s, m = new Map()) => {
    let N = s.length;
    let ok = x => 1 <= x && x <= 26;
    let go = i => {
        if (m.has(i))
            return m.get(i);
        if (i == N)
            return 1;
        let cnt = 0,
            one = Number(s[i]),
            two = one && i + 1 < N ? Number(s[i] + s[i + 1]) : 0;
        if (ok(one)) cnt += go(i + 1);
        if (ok(two)) cnt += go(i + 2);
        return m.set(i, cnt).get(i);
    };
    return go(0);
};

// bottom-up
let numDecodings = s => {
    let N = s.length;
    let dp = Array(N + 2).fill(0);
    dp[N] = 1;
    let ok = x => 1 <= x && x <= 26;
    for (let i = N - 1; 0 <= i; --i) {
        let one = Number(s[i]),
            two = one && i + 1 <= N ? Number(s[i] + s[i + 1]) : 0;
        if (ok(one)) dp[i] += dp[i + 1];
        if (ok(two)) dp[i] += dp[i + 2];
    }
    return dp[0];
};

// bottom-up mem-opt
let numDecodings = s => {
    let N = s.length,
        a = 0,
        b = 1,
        c = 0;
    let ok = x => 1 <= x && x <= 26;
    for (let i = N - 1; 0 <= i; --i) {
        let one = Number(s[i]),
            two = one && i + 1 <= N ? Number(s[i] + s[i + 1]) : 0;
        a = 0;
        if (ok(one)) a += b;
        if (ok(two)) a += c;
        c = b, b = a;
    }
    return a;
};
