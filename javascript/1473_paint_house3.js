/*
 * 1473. Paint House III
 *
 * Q: https://leetcode.com/problems/paint-house-iii/
 * A: https://leetcode.com/problems/paint-house-iii/discuss/695337/Javascript-and-C%2B%2B-solutions
 */

/*

ok so we're basically assigning values to the 0s from 1..N inclusive as candidates

keep track of target t neighborhoods:
    if assigning same value as neighbors, then same target t neighborhoods,
    otherwise if assigning a difference value, then decrement the target t neighborhoods by 1

    houses to A
    rename m to N <-- length of A
    and n to K

ok so here's the deal: let's start with top-down brute-force DFS, and add a memo to avoid TLE

^^ hopefully that's a good start, let's see

for each i-th position of A,
    if set to 0, then we need to optimally choose a color for A[i]
        either
            choose the same color (if applicable as neighbors and use same target t neighborhoods)
            choose a difference color than neighbors and use target t - 1 neighborhoods

base case occurs when:

    t == 0

        the cost accumulate thus far is valid if i == N? the length of A or if all values of A to the end of A are set
        so track R as the right-most 0 (this is the last house we need to pay the cost to paint)

keep track of the current i-th house, as houses are set, increment i <-- maybe just easier to create a set of indexes needed to be painted... let's do that instead, ok so if i == paint.length, then we're golden when t == 0

cost[i][j]: is the cost of paint the house i with the color j+1.

sum will be accumulate back up as the recursive stack unwinds


post-mortem analysis:

* during the contest I attempted to perform a "pre-optimization" by iterating only over the indices with value 0,
ie. houses which need to be painted, however, this does NOT correctly count the target t amount of neighborhoods correctly!

* after the contest I still made this problem more difficult that it needed to be and still ended up with an incorrect solution

* KEY INSIGHT: keep track of the previous neighbor and use it to determine if the neighborhood is the same or different!!!

*/

//
// complicated and incorrect algorithm 1
//

/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
// let minCost = (A, cost, N, K, T, paint = []) => { // A.length == N, 1..K inclusive colors, target T neighborhoods
//     A.forEach((x, i) => { if (!x) paint.push(i); });
//     console.log(...paint)
//     let go = (i = 0, t = T, sum = 0, best = Infinity) => {
//         if (i == paint.length)
//             console.log(`i: ${i}  t: ${t}  sum: ${sum}`);
//         if (!t)
//             return i == paint.length ? sum : Infinity;
//         if (i == paint.length)
//             return Infinity;
//         for (let j = 0; j < K; ++j) { // j-th candidate color
//             A[paint[i]] = j + 1; // forward track
//             let L = A[paint[i]],
//                 R = A[paint[i]];
//             if (0 <= paint[i] - 1)
//                 L = A[paint[i] - 1];
//             if (paint[i] + 1 <= N - 1)
//                 R = A[paint[i] + 1];
//             // console.log(`forward: [${A}]`)
//             if (L == A[paint[i]] && (R == 0 || R == A[paint[i]])) { // same neighborbood
//                 // console.log(`same neighborhood`)
//                 best = Math.min(best, go(i + 1, t, sum + cost[paint[i]][j]));
//             } else {
//                 // console.log(`diff neighborhood`)
//                 best = Math.min(best, go(i + 1, t - 1, sum + cost[paint[i]][j]));
//             }
//             // console.log(`j-th best: ${j} ${best}`)
//             A[paint[i]] = 0; // backtrack
//             // console.log(`back: [${A}]`)
//         }
//         return best;
//     };
//     return go();
// };

//
// complicated and incorrect algorithm 2
//

// let minCost = (A, cost, N, K, T) => { // A.length == N, 1..K inclusive colors, target T neighborhoods
//     let m = [...Array(N + 1)].map(_ => [...Array(T + 1)].map(_ => Array(K + 1).fill(-1)));
//     let sameHood = i => {
//         let L = 0 <= i - 1 ? A[i - 1] : null,
//             R = i + 1 < N  ? A[i + 1] : null;
//         if (L == null && R == null)
//             return false; // cannot be same as neighbor if there are no neighbors
//         if (L == null)
//             return A[i] == R;
//         if (R == null)
//             return L == A[i];
//         return L == A[i] || A[i] == R;
//     };
//     let go = (i = 0, t = T, min = Infinity) => {
//         if (t < 0)
//             return Infinity;
//         if (i == N)
//             return /*m[i][t][A[i]] =*/ !t ? 0 : Infinity;
//         if (A[i]) // i-th house is already painted, skip past it (I messed this up during the contest by pre-optimizing a solution to skip past homes already painted)
//             return m[i][t][A[i]] = go(i + 1, t - Number(t == T || !sameHood(i))); // t == T means the first hood is counted
//         for (let j = 0; j < K; ++j) { // 0-based j-th color from 0..K-1 inclusive
//             A[i] = j + 1; // +1 for 1-based indexing
//             min = Math.min(min, cost[i][j] + go(i + 1, t - Number(t == T || !sameHood(i)))); // t == T means the first hood is counted
//             A[i] = 0;
//         }
//         return m[i][t][A[i]] = min;
//     };
//     return go() < Infinity ? go() : -1;
// };

// DFS
let minCost = (A, cost, N, K, T) => {
    let go = (i = 0, color = 0, t = T, min = Infinity) => {
        let diffHood = cand => Number(cand != color); // different neighborhood 🏘 🏘
        if (t < 0)
            return Infinity; // invalid target t neighborhoods ❌
        if (i == N)
            return !t ? 0 : Infinity; // target 🎯 t == 0
        if (A[i])
            return go(i + 1, A[i], t - diffHood(A[i])); // A[i] is already painted, thus A[i] is the only j-th color under consideration
        for (let j = 0; j < K; ++j)
            min = Math.min(min, cost[i][j] + go(i + 1, j + 1, t - diffHood(j + 1))); // j + 1 for 1-based indexing
        return min;
    };
    let min = go();
    return min < Infinity ? min : -1;
};

// DFS with Memo
let minCost = (A, cost, N, K, T) => {
    let m = [...Array(N + 1)].map(_ => [...Array(K + 1)].map(_ => Array(T + 1).fill(-1)));
    let go = (i = 0, color = 0, t = T, min = Infinity) => {
        let diffHood = cand => Number(cand != color); // different neighborhood 🏘 🏘
        if (t < 0)
            return Infinity; // invalid target t neighborhoods ❌
        if (m[i][color][t] > -1)
            return m[i][color][t]; // memo 🤔
        if (i == N)
            return m[i][color][t] = !t ? 0 : Infinity; // target 🎯 t == 0
        if (A[i])
            return m[i][color][t] = go(i + 1, A[i], t - diffHood(A[i])); // A[i] is already painted, thus A[i] is the only j-th color under consideration
        for (let j = 0; j < K; ++j)
            min = Math.min(min, cost[i][j] + go(i + 1, j + 1, t - diffHood(j + 1))); // j + 1 for 1-based indexing
        return m[i][color][t] = min;
    };
    let min = go();
    return min < Infinity ? min : -1;
};

console.log(` 9 ==  ${minCost([0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3)}`);
console.log(`11 == ${minCost([0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3)}`);
console.log(` 5 ==  ${minCost([0,0,0,0,0], [[1,10],[10,1],[1,10],[10,1],[1,10]], 5, 2, 5)}`);
console.log(`-1 == ${minCost([3,1,2,3], [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], 4, 3, 3)}`);
console.log(` 0 ==  ${minCost([2,2,1], [[1,1],[3,4],[4,2]], 3, 2, 2)}`);
console.log(`12 ==  ${minCost([0,0,0,1], [[1,5],[4,1],[1,3],[4,4]], 4, 2, 4)}`);
console.log(`24 ==  ${minCost([0,1,0,0,1,2,0,0,2,1], [[4,5,2,6],[8,3,2,9],[6,7,3,1],[10,10,2,7],[6,5,2,4],[4,4,3,9],[9,8,3,5],[7,9,10,3],[8,5,9,10],[10,7,4,6]], 10, 4, 6)}`);
