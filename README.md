## Prerequisites

> You rarely have time for everything you want in this life, so you need to make choices. And hopefully your choices can come from a deep sense of who you are.
>
[-Mr. Rogers](https://en.wikipedia.org/wiki/Fred_Rogers)

A significant amount of time and mental resources are necessary to begin understanding
dynamic programming.  Thus, DP is best approached as a "marathon", not a "sprint".
Two key building blocks towards a basic understanding of DP are recursion
and mathematical induction.

* [Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science))
* [Mathematical Induction](https://en.wikipedia.org/wiki/Mathematical_induction)

> Take the first step in faith. You don't have to see the whole staircase, just take the first step.
>
[-Martin Luther King Jr.](https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.)

A mental leap is faith is necessary to begin post-processing recursion and mathematical
induction from a computer science perspective, ie. we
can only understand the basic principles of recursion and recursive algorithms after
we have assumed the inductive hypothesis of a recurrence relation is true.  Only after
this mental leap of faith is made can we look back in hindsight with the mind's eye
to discover what that actually means, ie. we can clearly "see" the recursive stack
hit the base case(s) and begin to unwind, formulating an optimal solution built upon
the optimal solutions to subproblems of the original problem itself.


## What is Dynamic Programming?

> We will never know our full potential unless we push ourselves to find it.
>
[-Travis Rice](https://en.wikipedia.org/wiki/Travis_Rice)

There are two key ingredients to DP: optimal substructure and overlapping subproblems.

* [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming)
	* [Optimal Substructure](https://en.wikipedia.org/wiki/Optimal_substructure)
	* [Overlapping Subproblems](https://en.wikipedia.org/wiki/Overlapping_subproblems)


## What is the ART of Dynamic Programming?

> Don't only practice your art, but force your way into its secrets.  For it and knowledge can raise men to the divine.
>
[-Ludwig van Beethoven](https://en.wikipedia.org/wiki/Ludwig_van_Beethoven)

**ART** is an acronym used to intuitively create solutions to DP problems in 3 steps:
1. **A**ll
2. **R**emember
3. **T**urn

These 3 steps are elaborated upon below, however, let us first take a minute to consider
what our end-goal is and how we can intuitively reach it.  Our end-goal in general is to
minimize or maximum an objective function within the given constraints of an arbitrary
universe of discourse (ie. the problem statement).

**Ask yourself this question:** Is it possible to know the minimum or maximum objective function outcome
without first checking all possibilities?  For example, let's say we have 3 numbers, and we
want to know what is the minimum or maximum of those 3 numbers.  Is it possible to know the
minimum or maximum value *without* first checking the values of all 3 numbers?  Please
take a moment to consider this question before proceeding.

The answer is obviously "no."  It is *not* possible to know which of the 3 numbers are
minimal or maximal unless we first check all 3 values.  This can be proved by a simple
proof by contradiction in which we assume the opposite of our postulate P and prove not P
is false.  Thus, if not P is false, then P is true.

Let P denote: "It is **impossible** to know the minimum or maximum of 3 numbers without first checking all 3 values of those 3 numbers."
Then not P is "It is **possible** to know the minimum or maximum of 3 numbers without first checking all 3 values of those 3 numbers."

Let us assume not P is true, ie. we have checked the first two values and the third value remains unknown.
Then it is impossible to know if one of the first two values is minimal or maximal without checking
the third value.  So we have contradicted our false postulate not P, therefore P is true.  Thus, our thought process
has intuitively lead us to step 1.

### Step 1

**A**ll possibilities of a universe of discourse under consideration need to be checked before we can
determine the objective function outcome.  This realization allows us to begin creating a DP solution via a naive
[brute-force algorithm](https://en.wikipedia.org/wiki/Brute-force_search) ie. an exhaustive search of all possibilities.
Therefore, we begin by exploring all possibilites via top-down [DFS](https://en.wikipedia.org/wiki/Depth-first_search).
Since we know we need to check all possibilities of the universe of discourse under consideration,
this gives us key insight towards the N-dimensions of the corresponding DP memo which is used to remember the optimal solutions
to each overlapping subproblem.  This understanding leads us to step 2, but before we move on to step 2, let us first take another
moment to consider the next key question.

**Ask yourself this question:** Is it possible to determine the objective function outcome without solving overlapping subproblems more than once?

The answer is obviously "yes."  With the properly structured N-dimensional memo we can store the optimal solutions
to overlapping subproblems as they are computed, and then lookup previous solutions upon demand.
This is the entire purpose of the DP memo.  Simply remember each previous subproblem's optimal solution to avoid re-calculating
each previous subproblem's optimal solution.  This is raison d'être of DP, remembering the past to formulate the future, ie. use
previous optimal subproblem solutions to formulate current optimal subproblem solutions to formulate the overall optimal solution
for the problem itself.

### Step 2

**R**emember each subproblem's optimal solution to avoid re-computing each previous subproblem's optimal solutions.
The memo is shaped as an arbtrary N-dimensional data structure such that each N-th dimension corresponds to a specific variable
of the universe of discourse.  Thus, the size of the N-dimensional data structure directly corresponds to the cartensian product
of the coalesced variables possibilites for the universe of discourse under consideration.  The base case(s) of the recurrence relation are
added to the memo first.  And as the recursive stack unwinds, the base case(s) are iteratively and optimally built upon.
This iterative building upon previous subproblem's optimal solutions from the bottom-up leads us to step 3.

### Step 3

**T**urn the memoized top-down DFS solution upside-down to formulate an explicit bottom-up solution.  This step can be
challenging because the bases case(s) must first be explicitly specified *before* being constrained-built upon.  The Top-Down solutions
allow for the base case(s) to be implied by the recursion towards the base case(s) and thus implicitly stored by the memo as each recursive
stack "bottoms out" (ie. hits the base case(s) and begins to unwind).  It can be helpful to print the memoized table from the Top-Down DFS
with Memo solution to identify the bases case(s) and the bottom-up recurrence relation.

* Optional Memory Optimization:

	* After step 3, it may be possible to optimize memory.  For example, if we have a 2D matrix for the DP memo, but the current row is only dependent upon
the previous row, then we can reduce memory from O(N<sup>2</sup>) to O(N) by replacing `dp[i]` with `cur` (ie. current row) and `dp[i - 1]` with `pre` (ie. previous row).
Furthermore, if `cur` is only dependent upon itself, then we can also remove `pre`.
	* See [322. Coin Change](https://leetcode.com/problems/coin-change/discuss/677858/Javascript-and-C%2B%2B-solutions)
and [518. Coin Change 2](https://leetcode.com/problems/coin-change-2/discuss/677893/Javascript-and-C%2B%2B-solutions) as examples of this supplemental memory optimization which reduces
the memory by a constant factor of N, ie. we only need N memory instead of 2 * N memory.


## Summary: The ART of Dynamic Programming

> Computer, install a recursive algorithm.
>
- Ensign Harry Kim, [Star Trek Voyager, Episode 102](https://en.wikipedia.org/wiki/Nothing_Human_(Star_Trek:_Voyager))

The **ART** of DP in 3 steps:

1. **A**ll possibilities are considered via Brute-Force Top-Down DFS
2. **R**emember each subproblem's optional solution via Memoization
3. **T**urn the Top-Down solution upside-down to create the Bottom-Up solution


## Canonical Examples

> It seemed unthinkable for me to leave the world forever before I had produced all that I felt called upon to produce.
>
[-Ludwig van Beethoven](https://en.wikipedia.org/wiki/Ludwig_van_Beethoven)


#### N-Dimensional Top-Down + Bottom-Up:

* [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/discuss/635659/Javascript-and-C%2B%2B-solutions)
* [72. Edit Distance](https://leetcode.com/problems/edit-distance/discuss/479377/Javascript-and-C%2B%2B-solutions)
* [139. Word Break](https://leetcode.com/problems/word-break/discuss/632205/Javascript-and-C%2B%2B-solutions)
* [221. Maximal Square](https://leetcode.com/problems/maximal-square/discuss/600365/Javascript-and-C%2B%2B-solutions)
* [322. Coin Change](https://leetcode.com/problems/coin-change/discuss/677858/Javascript-and-C%2B%2B-solutions)
* [518. Coin Change 2](https://leetcode.com/problems/coin-change-2/discuss/677893/Javascript-and-C%2B%2B-solutions)
* [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/discuss/690997/Javascript-and-C%2B%2B-solutions)
* [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/discuss/652184/Javascript-and-C%2B%2B-solutions)
* [1406. Stone Game III](https://leetcode.com/problems/stone-game-iii/discuss/657825/Javascript-and-C%2B%2B-solutions)
* [1458. Max Dot Product of Two Subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences/discuss/653625/Javascript-and-C%2B%2B-solutions)
* [1463. Cherry Pickup II](https://leetcode.com/problems/cherry-pickup-ii/discuss/660828/Javascript-and-C%2B%2B-solutions)
* [1473. Paint House III](https://leetcode.com/problems/paint-house-iii/discuss/695337/Javascript-and-C%2B%2B-solutions)


#### Recurrence Relation to Reduce Asymptotic Bounds via Pre-calculations:

* [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/discuss/512006/Javascript-and-C%2B%2B-solutions)
* [304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/discuss/508260/Javascript-and-C%2B%2B-solutions)
* [307. Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/discuss/665390/Javascript-and-C%2B%2B-solutions)
* [1139. Largest 1-Bordered Square](https://leetcode.com/problems/largest-1-bordered-square/discuss/681894/Javascript-and-C%2B%2B-solutions)


#### Recurrence Relation to Minimize or Maximize an Objective Function:

* [1277. Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/discuss/442151/Javascript-and-C%2B%2B-solutions)


#### Bottom-Up Sequentially Building Upon "K-th Buckets" of Previous Solutions:

* [338. Counting Bits](https://leetcode.com/problems/counting-bits/discuss/657068/Javascript-and-C%2B%2B-solutions)


## Resources

* [Master Theorem: Determine the asymptotic bound of recursive algorithms via standard recurrences](https://claytonjwong.github.io/Master-Theorem/)
* [Algorithms for DNA Sequencing](https://claytonjwong.github.io/Algorithms-DNA-Sequencing/)
* [Algorithms by Standford University](https://claytonjwong.github.io/Algorithms-Stanford/)
* [Algorithms and Data Structures by UC San Diego](https://claytonjwong.github.io/Algorithms-UCSanDiego/)
* [Towers of Hanoi](https://claytonjwong.github.io/Towers-Of-Hanoi/)


## Supplemental Resources

* [Algorithms: Dasgupta-Papadimitriou-Vazirani ( 2006 )](https://github.com/claytonjwong/Algorithms-Stanford/tree/master/documentation/Dasgupta-Papadimitriou-Vazirani.pdf)
* [Algorithms and Data Structures: Mehlhorn-Sanders ( 2007 )](https://github.com/claytonjwong/Algorithms-Stanford/tree/master/documentation/Mehlhorn-Sanders-Toolbox.pdf)
* [Introduction to Algorithms: Cormen-Leiserson-Rivest-Stein ( 2009 )](https://en.wikipedia.org/wiki/Introduction_to_Algorithms)
* [Discrete Probability](https://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probability)
* [Mathematical Proofs](https://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Mathematical_Proofs)
