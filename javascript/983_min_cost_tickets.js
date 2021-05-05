/*
 * 983. Minimum Cost For Tickets
 *
 * Q: https://leetcode.com/problems/minimum-cost-for-tickets/
 * A: https://leetcode.com/problems/minimum-cost-for-tickets/discuss/811237/Javascript-Python3-C%2B%2B-Top-Down-%2B-Bottom-Up
 */

// top-down
let mincostTickets = (A, cost, days = [1, 7, 30]) => {
    let N = A.length;
    let go = (i = 0, day = 0) => {
        while (i < N && A[i] < day)
            ++i;
        if (i == N)
            return 0;        // 🛑 base case
        let min = Infinity;
        for (let k = 0; k < 3; ++k)
            min = Math.min(min, cost[k] + go(i, A[i] + days[k]));   // 🎯 min cost
        return min;
    };
    return go();
};

// top-down memo
let mincostTickets = (A, cost, days = [1, 7, 30], m = {}) => {
    let N = A.length;
    let go = (i = 0, day = 0) => {
        while (i < N && A[i] < day)
            ++i;
        if (i == N)
            return 0;      // 🛑 base case
        if (m[i])
            return m[i];   // 🤔 memo
        m[i] = Infinity;
        for (let k = 0; k < 3; ++k)
            m[i] = Math.min(m[i], cost[k] + go(i, A[i] + days[k]));   // 🎯 min cost
        return m[i];
    };
    return go();
};

// bottom-up
let mincostTickets = (A, cost, days = [1, 7, 30]) => {
    let N = A.length;
    let dp = Array(N + 1).fill(Infinity);   // 🤔 memo
    dp[N] = 0;                              // 🛑 base case
    for (let i = N - 1; 0 <= i; --i) {
        let j = i;
        for (let k = 0; k < 3; ++k) {
            while (j < N && A[j] < A[i] + days[k])
                ++j;
            dp[i] = Math.min(dp[i], cost[k] + dp[j])   // 🎯 min cost
        }
    }
    return dp[0];
}
