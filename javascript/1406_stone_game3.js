/*
 * 1406. Stone Game III
 *
 * Q: https://leetcode.com/problems/stone-game-iii/
 * A: https://leetcode.com/problems/stone-game-iii/discuss/657825/Javascript-and-C%2B%2B-solutions
 */

// Top Down
let stoneGameIII = A => {
    let N = A.length;
    let go = (i = 0, score = 0, max = -Infinity) => {
        if (i == N)
            return 0;
        for (let k = 0; k < 3 && i + k < N; ++k)
            max = Math.max(max, (score += A[i + k]) - go(i + k + 1));
        return max;
    };
    let max = go();
    return 0 < max ? "Alice" : max < 0 ? "Bob" : "Tie";
};

// Top Down with Memo
let stoneGameIII = A => {
    let N = A.length;
    let m = Array(N).fill(-Infinity);
    let go = (i = 0) => {
        if (i == N)
            return m[i] = 0;
        for (let k = 0, score = 0; k < 3 && i + k < N; ++k)
            m[i] = Math.max(m[i], (score += A[i + k]) - go(i + k + 1));
        return m[i];
    };
    let max = go();
    return 0 < max ? "Alice" : max < 0 ? "Bob" : "Tie";
};

// Bottom Up
let stoneGameIII = A => {
    let N = A.length;
    let dp = Array(N).fill(-Infinity);
    for (let i = N - 1; 0 <= i; --i)
        for (let k = 0, score = 0; k < 3 && i + k < N; ++k)
            dp[i] = Math.max(dp[i], (score += A[i + k]) - (i + k + 1 < N ? dp[i + k + 1] : 0));
    return 0 < dp[0] ? "Alice" : dp[0] < 0 ? "Bob" : "Tie";
};