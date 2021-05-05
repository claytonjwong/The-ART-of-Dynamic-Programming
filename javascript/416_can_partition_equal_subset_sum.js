/*
 * 416. Partition Equal Subset Sum
 *
 * Q: https://leetcode.com/problems/partition-equal-subset-sum/
 * A: https://leetcode.com/problems/partition-equal-subset-sum/discuss/617275/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// top-down
let canPartition = A => {
    let total = _.sum(A);
    if (total & 1)                                   // ❌ odd total cannot be evenly divided by 2
        return false;
    let target = Math.floor(total / 2);
    let go = (i = 0, t = 0) => {
        if (i == A.length || target < t)             // 🛑 base case: target not reached
            return false;
        if (t == target)                             // 🎯 target reached
            return true;
        return go(i + 1, t + A[i]) || go(i + 1, t);  // ✅ with xor 🚫 without A[i]
    };
    return go();
};

// memo
let canPartition = (A, m = new Map()) => {
    let total = _.sum(A);
    if (total & 1)                                            // ❌ odd total cannot be evenly divided by 2
        return false;
    let target = Math.floor(total / 2);
    let go = (i = 0, t = 0) => {
        let key = `${i},${t}`;
        if (m.has(key))                                       // 🤔 memo
            return m.get(key);
        if (i == A.length || target < t)                      // 🛑 base case: target not reached
            m.set(key, false);
        if (t == target)                                      // 🎯 target reached
            m.set(key, true)
        if (!m.has(key))
            m.set(key, go(i + 1, t + A[i]) || go(i + 1, t));  // ✅ with xor 🚫 without A[i]
        return m.get(key);
    };
    return go();
};

// bottom-up
let canPartition = A => {
    let total = _.sum(A);
    if (total & 1)                         // ❌ odd total cannot be evenly divided by 2
        return false;
    let target = Math.floor(total / 2);
    let dp = Array(target + 1).fill(0);    // 🤔 memo
    dp[0] = 1;                             // 🛑 base case: we can reach target 0
    for (let x of A)                       // 🤔 if we can reach t 🚫 without x, then we can reach t ✅ with x
        for (let t = target; x <= t; --t)
            if (dp[t - x])
                dp[t] = 1;
    return dp[target];                     // 🎯 target reached?
};
