/*
 * 1510. Stone Game IV
 *
 * Q: https://leetcode.com/problems/stone-game-iv/
 * A: https://leetcode.com/problems/stone-game-iv/discuss/737869/Javascript-Python3-C%2B%2B
 */

// top-down
let winnerSquareGame = N => {
    let go = i => {
        if (!i)
            return false; // 🛑 base case: no stones left
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j) // ⭐️ take each (j * j) amount of stones
            if (!go(i - (j * j)))
                return true; // 🎯 if next player lost, then current player wins
        return false;
    };
    return go(N);
};

// top-down memo
let winnerSquareGame = N => {
    let m = Array(N).fill(null);
    let go = i => {
        if (m[i] != null)
            return m[i]; // 🤔 memo
        if (!i)
            return m[i] = false;  // 🛑 base case: no stones left
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j) // ⭐️ take each (j * j) amount of stones, 💎 avoid TLE by taking largest (j * j) first
            if (!go(i - (j * j)))
                return m[i] = true; // 🎯 if next player lost, then current player wins
        return m[i] = false;
    };
    return go(N);
};

// bottom-up
let winnerSquareGame = N => {
    let dp = Array(N + 1).fill(false); // 🤔 memo
    dp[0] = false; // 🛑 base case: no stones left
    for (let i = 1; i <= N; ++i)
        for (let j = Math.floor(Math.sqrt(i)); 1 <= j; --j) // ⭐️ take each (j * j) amount of stones, 💎 avoid TLE by taking largest (j * j) first
            if (!dp[i - (j * j)])
                dp[i] = true; // 🎯 if next player lost, then current player wins
    return dp[N];
};
