/*
 * 1025. Divisor Game
 *
 * Q: https://leetcode.com/problems/divisor-game/
 * A: https://leetcode.com/problems/divisor-game/discuss/292472/C%2B%2B-solutions%3A-Top-Down-and-Bottom-Up
 */

// brute-force
let divisorGame = N => {
    let go = i => {
        if (i == 1)           // 🛑 base case
            return false;
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j)
            if (!(i % j) && !go(i - j))
                return true;  // 🎯  I win if I play j and you lose
        return false;
    };
    return go(N);
};

// memo
let divisorGame = N => {
    let m = Array(N + 1).fill(null);
    let go = i => {
        if (m[i] != null)            // 🤔 memo
            return m[i];
        if (i == 1)                  // 🛑 base case
            return m[i] = false;
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j)
            if (!(i % j) && !go(i - j))
                return m[i] = true;  // 🎯  I win if I play j and you lose
        return m[i] = false;
    };
    return go(N);
};

// bottom-up
let divisorGame = N => {
    let dp = Array(N + 1).fill(false); // 🤔 memo with implicit 🛑 base case: dp[1] = false
    for (let i = 2; i <= N; ++i)
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j)
            if (!(i % j) && !dp[i - j])
                dp[i] = true;          // 🎯  I win if I play j and you lose
    return dp[N];
};
