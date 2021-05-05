/*
 * 120. Triangle
 *
 * Q: https://leetcode.com/problems/triangle/
 * A: https://leetcode.com/problems/triangle/discuss/38726/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// TopDown
let minimumTotal = A => {
    let N = A.length;
    let go = (i = 0, j = 0) => {
        if (i == N)
            return 0;
        return A[i][j] + Math.min(go(i + 1, j), go(i + 1, j + 1));
    };
    return go();
};

// TopDownMemo
let minimumTotal = (A, m = new Map()) => {
    let N = A.length;
    let go = (i = 0, j = 0) => {
        let key = `${i},${j}`;
        if (m.has(key))
            return m.get(key);
        if (i == N)
            return m.set(key, 0).get(key);
        return m.set(key, A[i][j] + Math.min(go(i + 1, j), go(i + 1, j + 1))).get(key);
    };
    return go();
};

// BottomUp
let minimumTotal = A => {
    let N = A.length;
    for (let i = N - 2; 0 <= i; --i)
        for (let j = 0; j < A[i].length; ++j)
            A[i][j] += Math.min(A[i + 1][j], A[i + 1][j + 1]);
    return A[0][0];
};
