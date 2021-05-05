/*
 * 337. House Robber III
 *
 * Q: https://leetcode.com/problems/house-robber-iii/
 * A: https://leetcode.com/problems/house-robber-iii/discuss/946524/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming
 */

// DFS
let rob = root => {
    let go = (root, isRobbable = true) => {
        if (!root)
            return 0;
        let include = go(root.left, false) + go(root.right, false) + root.val,
            exclude = go(root.left, true)  + go(root.right, true);
        return Math.max(isRobbable ? include : -Infinity, exclude);
    };
    return go(root);
};

// Memo
let rob = (root, m = new Map()) => {
    let go = (root, i = 1, isRobbable = true) => {
        let key = `${root},${i},${isRobbable}`;
        if (m.has(key))
            return m.get(key);
        if (!root) {
            m.set(key, 0);
            return m.get(key);
        }
        let L = 2 * i,
            R = 2 * i + 1;
        let include = go(root.left, L, false) + go(root.right, R, false) + root.val,
            exclude = go(root.left, L, true)  + go(root.right, R, true);
        m.set(key, Math.max(isRobbable ? include : -Infinity, exclude));
        return m.get(key);
    };
    return go(root);
};
