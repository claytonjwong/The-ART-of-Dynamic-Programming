/*
 * 673. Number of Longest Increasing Subsequence
 *
 * Q: https://leetcode.com/problems/number-of-longest-increasing-subsequence/
 * A: https://leetcode.com/problems/number-of-longest-increasing-subsequence/discuss/916696/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

let findNumberOfLIS = (A, length = 0, best = 0) => {
    let N = A.length;
    let dp = Array(N).fill(1),
        cnt = Array(N).fill(1);
    for (let j = 0; j < N; ++j) {
        for (let i = 0; i < j; ++i) {
            if (A[i] < A[j]) {
                if (dp[j] < 1 + dp[i])
                    dp[j] = 1 + dp[i],
                    cnt[j] = 0;
                if (dp[j] == 1 + dp[i])
                    cnt[j] += cnt[i];
            }
        }
        if (length < dp[j])
            length = dp[j],
            best = 0;
        if (length == dp[j])
            best += cnt[j];
    }
    return best;
};
