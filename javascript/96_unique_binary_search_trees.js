/*
 * 96. Unique Binary Search Trees
 *
 * Q: https://leetcode.com/problems/unique-binary-search-trees/
 * A: https://leetcode.com/problems/unique-binary-search-trees/discuss/703865/Javascript-and-C%2B%2B-solutions
 */

// brute-force top-down DFS
let numTrees = N => {
    let go = (i = 1, j = N, ans = 0) => {
        if (j <= i)
            return 1; // 🛑  1 unique way to create: empty tree (if j < i) xor tree with 1 node (if j == i)
        for (let k = i; k <= j; ++k) // for each root node k from i..j inclusive
            ans += go(i, k - 1) * go(k + 1, j); // 🎯 ans = left subtree ans * right subtree ans
        return ans;
    };
    return go();
};

// top-down DFS with memo
let numTrees = N => {
    let m = [...Array(N + 2)].map(_ => Array(N + 2).fill(0)); // +2 for 1..N+1 inclusive
    let go = (i = 1, j = N, ans = 0) => {
        if (m[i][j])
            return m[i][j]; // memo 🤔
        if (j <= i)
            return m[i][j] = 1; // 🛑  1 unique way to create: empty tree (if j < i) xor tree with 1 node (if j == i)
        for (let k = i; k <= j; ++k) // for each root node k from i..j inclusive
            ans += go(i, k - 1) * go(k + 1, j); // 🎯 ans = left subtree ans * right subtree ans
        return m[i][j] = ans;
    };
    return go();
};

// bottom-up
let numTrees = N => {
    let dp = Array(N + 1).fill(0); // +1 for 1..N inclusive
    dp[0] = dp[1] = 1; // 🛑  1 unique way to create: empty tree xor tree with 1 node
    for (let j = 2; j <= N; ++j) // for each tree with j nodes
        for (let k = 1; k <= j; ++k) // for each root node k from 1..j inclusive
             dp[j] += dp[k - 1] * dp[j - k]; // 🎯 ans = left subtree ans * right subtree ans
    return dp[N];
};
