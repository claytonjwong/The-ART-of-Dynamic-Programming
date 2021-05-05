/*
 * 1647. Minimum Deletions to Make Character Frequencies Unique
 *
 * Q: https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
 * A: https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/discuss/927497/Kt-Js-Py3-Cpp-Map-%2B-Seen-Counts
 */

let minDeletions = (s, m = new Map(), seen = new Set(), dels = 0) => {
    s.split('').forEach(c => m.set(c, 1 + (m.get(c) || 0)));
    for (let [_, cnt] of [...m.entries()]) {
        while (cnt && seen.has(cnt))
            ++dels,
            --cnt;
        seen.add(cnt);
    }
    return dels;
};
