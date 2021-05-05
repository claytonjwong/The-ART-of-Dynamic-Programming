/*
 * 787. Cheapest Flights Within K Stops
 *
 * Q: https://leetcode.com/problems/cheapest-flights-within-k-stops/
 * A: https://leetcode.com/problems/cheapest-flights-within-k-stops/discuss/690997/Javascript-and-C%2B%2B-solutions
 */

// DFS + BT
let findCheapestPrice = (_, E, start, T, hops, adj = new Map(), best = Infinity) => {
    E.forEach(([u, v, w]) => adj.set(u, (adj.get(u) || new Set()).add([v, w])));
    let go = (u = start, k = hops + 1, cost = 0, seen = new Set()) => {
        if (u == T)
            best = Math.min(best, cost); // best is the minimum cost 🎯
        if (u == T || !k)
            return; // destination reached or k-hops exhausted: stop 🛑
        seen.add(u); // 👀 ✅ forward-tracking
        for (let [v, w] of [...adj.get(u) || []])
            if (!seen.has(v) && cost + w < best) // pruning condition: cost + w < best 🤔
                go(v, k - 1, cost + w, seen);
        seen.delete(u); // 👀 ❌ back-tracking
    };
    go();
    return best < Infinity ? best : -1;
};

// DFS
let findCheapestPrice = (N, A, start, T, hops, adj = new Map()) => {
    A.forEach(([u, v, w]) => adj.set(u, (adj.get(u) || new Set()).add([v, w])));
    let go = (u = start, k = hops + 1, min = Infinity) => {
        if (u == T)
            return 0; // target T 🎯
        if (!k)
            return Infinity; // all k hops exhausted ❌
        for (let [v, w] of [...adj.get(u) || []])
            min = Math.min(min, w + go(v, k - 1)); // dfs edge u -> v with cost w
        return min;
    };
    return go() < Infinity ? go() : -1;
};

// DFS with Memo
let findCheapestPrice = (N, E, start, T, hops, adj = new Map()) => {
    let m = [...Array(N)].map(_ => Array(hops + 2).fill(-1)); // +2 because for V vertices there are V+1 edges and +1 for the memo itself to be 0..hops+1 inclusive
    E.forEach(([u, v, w]) => adj.set(u, (adj.get(u) || new Set()).add([v, w])));
    let go = (u = start, k = hops + 1, min = Infinity) => {
        if (m[u][k] > -1)
            return m[u][k]; // memo 🤔
        if (u == T)
            return m[u][k] = 0; // target T 🎯
        if (!k)
            return m[u][k] = Infinity; // all k hops exhausted ❌
        for (let [v, w] of [...adj.get(u) || []])
            min = Math.min(min, w + go(v, k - 1)); // dfs edge u -> v with cost w
        return m[u][k] = min;
    };
    return go() < Infinity ? go() : -1;
};

// BF
let findCheapestPrice = (N, A, start, T, hops) => {
    let k = hops + 1;
    let pre = Array(N).fill(Infinity);
    pre[start] = 0;
    while (k--) { // relax all edges k times
        // bellman-ford: dist[v] = min(dist[v], dist[u] + w) ie. relax edge u,v of cost w
        // however, use previous and current to avoid overwritting our previous optimal edge relaxations
        // which we still need to read from in order to derive our current optimal edge relaxations for each k-th hop
        let cur = [...pre]; // derive current from previous 🤔 ie. update current optimal edge relaxations based upon previous optimal edge relaxations
        A.forEach(([u, v, w]) => cur[v] = Math.min(cur[v], pre[u] + w)); // relax all edges u,v of cost w for optimal distance to v 🎯
        [pre, cur] = [cur, pre]; // persist current as previous via swap 🤔
    }
    return pre[T] < Infinity ? pre[T] : -1;
}

// SPFA
let findCheapestPrice = (N, E, start, T, hops, adj = new Map()) => {
    E.forEach(([u, v, w]) => adj.set(u, (adj.get(u) || new Set()).add([v, w])));
    let k = hops + 1;
    let pre = Array(N).fill(Infinity);
    pre[start] = 0;
    let q = [ start ];
    while (k--) {
        let cur = [...pre];
        let len = q.length;
        while (len--) {
            let u = q.shift();
            for (let [v, w] of [...adj.get(u) || []])
                if (cur[v] > pre[u] + w)
                    cur[v] = pre[u] + w, q.push(v);
        }
        [pre, cur] = [cur, pre];
    }
    return pre[T] < Infinity ? pre[T] : -1;
}

console.log(findCheapestPrice(3, [[0,1,2],[1,2,1],[2,0,10]], 1, 2, 1));
console.log(findCheapestPrice(4, [[0,1,1],[0,2,5],[1,2,1],[2,3,1]], 0, 3, 1));
