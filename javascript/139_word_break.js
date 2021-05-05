/*
 * 139. Word Break
 *
 * Q: https://leetcode.com/problems/word-break/
 * A: https://leetcode.com/problems/word-break/discuss/632205/Javascript-and-C%2B%2B-solutions
 */

// Top-Down TLE without memo
let wordBreak = (s, words) => {
    let N = s.length;
    let dict = new Set(words);
    let go = (i = 0) => {
        if (i == N) // can we reach the N-th index? 🎯
            return 1;
        for (let j = i + 1; j <= N; ++j)
            if (dict.has(s.substring(i, j)) && go(j))
                return 1;
        return 0;
    };
    return go();
};

// Top-Down AC with memo
let wordBreak = (s, words) => {
    let N = s.length;
    let m = Array(N).fill(-1); // memo
    let dict = new Set(words);
    let go = (i = 0) => {
        if (m[i] > -1)
            return m[i];
        if (i == N) // can we reach the N-th index? 🎯
            return m[i] = 1;
        for (let j = i + 1; j <= N; ++j)
            if (dict.has(s.substring(i, j)) && go(j))
                return m[i] = 1;
        return m[i] = 0;
    };
    return go();
};

// Bottom-Up AC
let wordBreak = (s, words) => {
    let N = s.length;
    let dp = Array(N + 1).fill(0);
    dp[0] = 1; // we can reach the 0-th index with no words
    for (let i = 0; i < N; ++i) {
        if (!dp[i])
            continue; // i is not reachable ❌
        for (let word of words) {
            let j = i + word.length;
            if (j <= N && word == s.substring(i, j))
                dp[j] = 1;
        }
    }
    return dp[N]; // can we reach the N-th index? 🎯
};

// Bottom-Up AC (minor memory optimization)
let wordBreak = (s, words, reach = new Set([0])) => { // we can reach the 0-th index with no words
    let N = s.length;
    let dict = new Set(words);
    for (let i = 0; i < N; ++i) {
        if (!reach.has(i))
            continue; // i is not reachable ❌
        for (let word of words) {
            let j = i + word.length;
            if (j <= N && word == s.substring(i, j))
                reach.add(j);
        }
    }
    return reach.has(N); // can we reach the N-th index? 🎯
};