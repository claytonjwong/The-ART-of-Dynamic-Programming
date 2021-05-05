/*
 * 140. Word Break II
 *
 * Q: https://leetcode.com/problems/word-break-ii/
 * A: https://leetcode.com/problems/word-break-ii/discuss/765548/Javascript-Python3-C%2B%2B-top-down-%2B-bottom-up-(partial)
 */

// naive DFS + BT results in TLE which cannot be memoized,
// since there is no return value to coalesce/memoize
let wordBreak = (S, A, words = new Set(), ans = []) => {
    let N = S.length;
    A.forEach(word => words.add(word));
    let go = (i = 0, path = []) => {
        if (i == N) {
            ans.push(path.join(' '));
            return;
        }
        for (let j = i + 1; j <= N; ++j) { // ⭐️ candidate substrings S[i..j), ie. from i inclusive to j non-inclusive
            let cand = S.substring(i, j);
            if (words.has(cand))
                go(j, path.concat(cand));  // 🚀 DFS + BT
        }
    };
    go();
    return ans;
};

// brute-force
let wordBreak = (S, A, dict = new Set()) => {
    let N = S.length;
    A.forEach(word => dict.add(word));
    let go = (i = 0, words = []) => {
        if (i == N)                                  // 🛑 base case: "empty" word can be constructed when there are no remaining characters in S
            return [[]];
        for (let j = i + 1; j <= N; ++j) {           // ⭐️ candidate substrings S[i..j), ie. from i inclusive to j non-inclusive
            let cand = S.substring(i, j);
            if (dict.has(cand))
                for (let tail of go(j))
                    words.push([cand].concat(tail)); // 🚀 DFS concat tails onto 🔍 found candidates, ie. build 🎯 words from 👈 right-to-left
        }
        return words;
    };
    return go().map(a => a.join(' '));
};

// memo
let wordBreak = (S, A, dict = new Set()) => {
    let N = S.length;
    let m = Array(N + 1).fill(null);
    A.forEach(word => dict.add(word));
    let go = (i = 0, words = []) => {
        if (m[i] != null)                            // 🤔 memo
            return m[i];
        if (i == N)                                  // 🛑 base case: "empty" word can be constructed when there are no remaining characters in S
            return m[i] = [[]];
        for (let j = i + 1; j <= N; ++j) {           // ⭐️ candidate substrings S[i..j), ie. from i inclusive to j non-inclusive
            let cand = S.substring(i, j);
            if (dict.has(cand))
                for (let tail of go(j))
                    words.push([cand].concat(tail)); // 🚀 DFS concat tails onto 🔍 found candidates, ie. build 🎯 words from 👈 right-to-left
        }
        return m[i] = words;
    };
    return go().map(a => a.join(' '));
};

// bottom-up
let wordBreak = (S, A, dict = new Set()) => {
    let N = S.length;
    let dp = [...Array(N + 1)].map(_ => []);         // 🤔 memo
    dp[N] = [[]];                                    // 🛑 base case: "empty" word can be constructed when there are no remaining characters in S
    A.forEach(word => dict.add(word));
    for (let i = N - 1; 0 <= i; --i) {               // ⭐️ candidate substrings S[i..j), ie. from i inclusive to j non-inclusive
        for (let j = i + 1; j <= N; ++j) {
            let cand = S.substring(i, j);
            if (dict.has(cand))
                for (tail of dp[j])
                    dp[i].push([cand].concat(tail)); // 🚀 concat each tail onto the current candidate, 👈 ie. build the answer from right to left
        }
    }
    return dp[0].map(words => words.join(' '));
};
