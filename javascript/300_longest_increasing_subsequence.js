/*
 * 300. Longest Increasing Subsequence
 *
 * Q: https://leetcode.com/problems/longest-increasing-subsequence/
 * A: https://leetcode.com/problems/longest-increasing-subsequence/discuss/385203/C%2B%2B-and-Javascript-solutions
 */

/**
 * @param {number[]} A
 * @return {number}
 */

let lengthOfLIS = (A, m = new Map()) => {
    let N = A.length;
    if (N == 0)
        return 0;
    let go = j => {
        if (m.has(j))
            return m.get(j);
        m.set(j, 1);
        if (j == 0)
            return m.get(j);
        for (let i = 0; i < j; ++i)
            if (A[i] < A[j])
                m.set(j, Math.max(m.get(j), 1 + go(i)));
        return m.get(j);
    };
    [...Array(N).keys()].forEach((_, j) => go(j));
    return Math.max(...m.values());
};

// let lengthOfLIS = (A, max = 1) => {
//     let N = A.length;
//     if (N == 0)
//         return 0;
//     let dp = Array(N).fill(1);
//     for (let j = 1; j < N; ++j)
//         for (let i = 0; i < j; ++i)
//             if (A[i] < A[j])
//                 max = Math.max(max, dp[j] = Math.max(dp[j], 1 + dp[i]));
//     return max;
// };

var A = [1,3,6,7,9,4,10,5,6];
const ans = lengthOfLIS(A);
console.log(ans);
