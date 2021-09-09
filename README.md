# 🎨  The ART of Dynamic Programming
## An Intuitive Approach: From Apprentice to Master

> When I left you, I was but the learner, now I am the master.
>
[-Darth Vader](https://en.wikipedia.org/wiki/Darth_Vader)

Let us explore the intuitions of dynamic programming and transform our thoughts from "what the hell?" to "oh yeah, duh!" via a 3-step heuristic process.  In hindsight, we can "see" the **ART** of dynamic programming is as easy as 1, 2, 3. 👍

## Prerequisites

> You rarely have time for everything you want in this life, so you need to make choices. And hopefully your choices can come from a deep sense of who you are.
>
[-Mr. Rogers](https://en.wikipedia.org/wiki/Fred_Rogers)

A significant amount of time and mental resources are necessary to begin understanding dynamic programming.  Thus, DP is best approached as a "marathon", not a "sprint".  Two key building blocks towards a basic understanding of DP are [recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) and [mathematical induction](https://en.wikipedia.org/wiki/Mathematical_induction).

**Note:** When I mention "recursive stack unwinding" below, what I mean is "frames popping off the recursive [call stack](https://en.wikipedia.org/wiki/Call_stack)".  And I imagine a similarity between this action and stepping down the stairs one-by-one, followed by stepping back up the stairs  one-by-one in reverse.  Stepping down the stairs would be equivalent to the recursive function being invoked as a subroutine of itself.  And stepping back up the stairs would be equivalent to the recursive function invocations exiting their subroutines as the base case(s) are reached.

> Take the first step in faith. You don't have to see the whole staircase, just take the first step.
>
[-Martin Luther King Jr.](https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.)

A mental leap of faith is necessary to begin post-processing [recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) and [mathematical induction](https://en.wikipedia.org/wiki/Mathematical_induction), ie. we can only understand the basic principles of recursion and recursive algorithms after we have assumed the inductive hypothesis of a recurrence relation is true.  After taking this mental leap of faith, we can look back in hindsight with the mind's eye to discover what that actually means, ie. we can clearly "see" the recursive stack hit the base case(s) and begin to unwind, formulating an optimal solution built upon the optimal solutions to subproblems of the original problem itself.


## What is Dynamic Programming?

> We will never know our full potential unless we push ourselves to find it.
>
[-Travis Rice](https://en.wikipedia.org/wiki/Travis_Rice)

There are two key ingredients to problems which can be solved by a [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming) algorithm:
1. [Optimal Substructure](https://en.wikipedia.org/wiki/Optimal_substructure)
2. [Overlapping Subproblems](https://en.wikipedia.org/wiki/Overlapping_subproblems)


## What is the ART of Dynamic Programming?

> Don't only practice your art, but force your way into its secrets.  For it and knowledge can raise men to the divine.
>
[-Ludwig van Beethoven](https://en.wikipedia.org/wiki/Ludwig_van_Beethoven)

**ART** is an acronym used to intuitively create solutions to DP problems in 3 steps:
1. **A**ll
2. **R**emember
3. **T**urn

These 3 steps are elaborated upon below, however, let us first take a minute to consider what our end-goal is and how we can intuitively reach it.  Our end-goal in general is to minimize or maximize an objective function within the given constraints of an arbitrary universe of discourse (ie. the problem statement).

**Ask yourself this question:** Is it possible to know the minimum or maximum objective function outcome without considering all possibilities?  For example, let's say we have 3 numbers, and we want to know what is the minimum or maximum of those 3 numbers.  Is it possible to know the minimum or maximum value *without* considering <b>all</b> of the card values?  Please take a moment to consider this question before proceeding.

<details><summary>See Answer</summary>
<p>

The answer is obviously "no."  It is <i>not</i> possible to know which of the 3 numbers are minimal or maximal unless we consider all 3 values.  Using 3 cards as an example, let's assume we only know the values for the first two cards.  Since we have <i>not</i> seen the third card's value, we don't know if it's less-than, equal-to, or greater-than the first two cards, and thus we <i>cannot</i> determine the objective function outcome <i>without</i> considering <b>all</b> of the card values.

</p>
<img src="images/3cards.png" />
</details>
<p>

</p>

### Step 1: All

**A**ll possibilities of a universe of discourse under consideration need to be checked before we can determine the objective function outcome.  This realization allows us to begin creating a DP solution via a naive [brute-force algorithm](https://en.wikipedia.org/wiki/Brute-force_search) ie. an exhaustive search of all possibilities.  Therefore, we begin by exploring all possibilites via top-down [depth-first-search](https://en.wikipedia.org/wiki/Depth-first_search).  Since we know we need to check all possibilities, this gives us key insight towards the N-dimensions of the corresponding DP memo which is used to remember the optimal solutions to each overlapping subproblem.  This intuition leads us to step 2, but before we move on to step 2, let us first take another moment to consider the next key question.

**Ask yourself this question:** Is it possible to determine the objective function outcome without solving overlapping subproblems more than once?

<details><summary>See Answer</summary>
<p>

The answer is obviously "yes."  With the properly structured N-dimensional memo we can store the optimal solutions to overlapping subproblems as they are computed, and then lookup previous solutions upon demand.  This is the entire purpose of the DP memo.  Simply remember each previous subproblem's optimal solution to avoid re-calculating it.  In fact, this is raison d'être of dynamic programming, remembering the past to formulate the future, ie. use previous optimal subproblem solutions to formulate current optimal subproblem solutions to formulate the overall optimal solution for the original problem itself.



</p>
<img src="images/past_future.png" />
</details>
<p>

</p>

### Step 2: Remember

**R**emember each previous subproblem's optimal solution to avoid recomputing it.  Combined with the previous "top-down brute-force" solution from step 1, we create the "top-down with memo" solution by simply using a memo to store and lookup solutions to previously solved subproblems. Thus a simple if-statement is added to the top of the recursive function to check if a solution to the subproblem is available.  If the solution is availble, then return it immediately.  If the solution is *not* available, then compute and store the solution once, thus making the solution available for future lookups. The memo is shaped as an arbitrary N-dimensional data structure such that each N-th dimension corresponds to a specific variable of the universe of discourse.  Thus, the size of the N-dimensional data structure directly corresponds to the product of the coalesced variables of all possibilites under consideration.  And it follows that the keys which uniquely identify each subproblem solution's storage position within the DP memo are all valid permutations of those specific variables per the constraints of the problem statement.  The base case(s) of the recurrence relation are added to the memo first.  And as the recursive stack unwinds, the base case(s) are iteratively and optimally built upon.  This iterative building upon previous subproblem's optimal solutions from the bottom-up leads us to step 3.

### Step 3: Turn

**T**urn the "top-down with memo" solution upside-down to formulate an explicit bottom-up solution.  This step can be challenging because the bases case(s) must first be explicitly specified *before* being iteratively built upon.  The previous top-down solutions allow for the base case(s) to be implied by the recursion towards the base case(s) and thus implicitly stored by the memo as each recursive stack "bottoms out" (ie. hits the base case(s) and begins to unwind).  To prepare for this implicit to explicit transformation, it can be helpful to print the key and value each time a subproblem's optimal solution is stored in the memo from the "top-down with memo" solution to explicitly identify the bases case(s) and to clearly understand how the recursive stack unwinds and thus dictates the iterative building upon the bottom-up recurrence relation.  It can also be helpful to print the entire memo when the memo's dimensions can be easily visualized, ie. within 1- or 2-dimensions.

### Step 4: Optional Memory Optimization

It may be possible to further reduce the bottom-up solution's memory consumption.  For example, if we have a 2D matrix for the DP memo, but the current row is only dependent upon the previous row, then we can reduce memory from O(N<sup>2</sup>) to O(N) by replacing "`dp[i]`" with "`cur`" (ie. current row) and "`dp[i - 1]`" with "`pre`" (ie. previous row).  Furthermore, if "`cur`" is only dependent upon itself, then we can also remove "`pre`".  See [322. Coin Change](https://leetcode.com/problems/coin-change/discuss/677858/Javascript-and-C%2B%2B-solutions) and [518. Coin Change 2](https://leetcode.com/problems/coin-change-2/discuss/677893/Javascript-and-C%2B%2B-solutions) as examples of this supplemental memory optimization which reduces the memory by a constant factor of N, ie. we only need N memory instead of 2 * N memory.


## Summary: The ART of Dynamic Programming

> Computer, install a recursive algorithm.
>
-Ensign Harry Kim, [Star Trek Voyager, Episode 102](https://en.wikipedia.org/wiki/Nothing_Human_(Star_Trek:_Voyager))

The **ART** of DP in 3 steps:

1. **A**ll possibilities are considered via top-down brute-force depth-first-search
2. **R**emember each subproblem's optimal solution via a DP memo
3. **T**urn the top-down solution upside-down to create the bottom-up solution


## Canonical Examples

> It seemed unthinkable for me to leave the world forever before I had produced all that I felt called upon to produce.
>
[-Ludwig van Beethoven](https://en.wikipedia.org/wiki/Ludwig_van_Beethoven)

### Emoji Legend 🧭
* 🛑 **Base Case(s)**
    * Where the recursive stack "bottoms out" and begins to unwind
* 🎯 **Recurrence Relation Target**
    * Determine the overall objective function outcome by recursively solving subproblems optimally
* 🤔 **Memo**
    * Store and retrieve optimal solutions to previously solved subproblems within the N-dimensional memo data structure
* 👀 **Seen**
    * Track which unique keys of the N-dimensional memo data structure have been previously seen
* ✅ **With**
    * "include this item" concept used for 0-1 knapsack algorithms where we find the optimal solution by either including xor discluding each `i`<sup>th</sup> item
* 🚫 **Without**
    * "disclude this item" concept used for 0-1 knapsack algorithms where we find the optimal solution by either including xor discluding each `i`<sup>th</sup> item
* ❌ **Exit Conditions**
    * We can exit early under non-optimal conditions (ie. depth-first-search pruning) or for invalid inputs (ie. out-of-bounds)

#### N-Dimensional Top-Down + Bottom-Up:

> It is our conviction, based on considerable experience teaching the subject, that the art of formulating and solving problems using dynamic programming can be learned only through active participation by the student. No amount of passive listening to lectures or of reading text material prepares the student to formulate and solve novel problems. The student must first discover, by experience, that proper formulation is not quite as trivial as on his own, he will acquire the feel for the subject that ultimately renders proper formulation easy and natural. For this reason, this book contains a large number of instructional problems, carefully chosen to allow the student to acquire the art that we seek to convey. The student must do these problems on his own. Solutions are given in the back of the book because the reader needs feedback on the correctness of his procedures in order to learn, but any student who reads the solution before seriously attempting the problem does so at this own peril. He will almost certainly regret this passivity when faced with an examination or when confronted with real-world problems. We have seen countless students who have clearly understood and can religiously repeat our lectures on the dynamic programming solution of specific problems fail utterly on midterm examinations asking that the same techniques and ideas be used on similar, but different, problems. Surprised, and humbled, by this experience, the same students often then begin to take seriously our admonition to do homework problems and do not just read the solution and think “of course that is how to do them,” and many have written perfect final exams. Why dynamic programming is more art than science we do not know. We suspect that part of the problem is that students do not expect to be called upon to use common sense in advanced mathematical courses and, furthermore, have very little practice or experience with common sense in this context. But common sense, not mathematical manipulation, is what it takes to be successful in a course in dynamic programming.
>
[-*The Art and Theory of Dynamic Programming* Dreyfus and Law (1977)](https://www.academia.edu/8817530/The_Art_and_Theory_of_Dynamic_Programming)

* [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/discuss/635659/Javascript-and-C%2B%2B-solutions)
* [62. Unique Paths](https://leetcode.com/problems/unique-paths/discuss/22965/Javascript-and-C%2B%2B-solutions)
* [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/discuss/153003/The-ART-of-Dynamic-Programming)
* [72. Edit Distance](https://leetcode.com/problems/edit-distance/discuss/479377/Javascript-and-C%2B%2B-solutions)
* [91. Decode Ways](https://leetcode.com/problems/decode-ways/discuss/117143/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/discuss/703865/Javascript-and-C%2B%2B-solutions)
* [97. Interleaving String](https://leetcode.com/problems/interleaving-string/discuss/1247180/The-ART-of-Dynamic-Programming)
* [120. Triangle](https://leetcode.com/problems/triangle/discuss/38726/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [139. Word Break](https://leetcode.com/problems/word-break/discuss/632205/Javascript-and-C%2B%2B-solutions)
* [140. Word Break II](https://leetcode.com/problems/word-break-ii/discuss/765548/Javascript-Python3-C%2B%2B-top-down-%2B-bottom-up-(partial))
* [198. House Robber](https://leetcode.com/problems/house-robber/discuss/846461/Javascript-Python3-C%2B%2B-The-ART-of-Dynamic-Programming)
* [213. House Robber II](https://leetcode.com/problems/house-robber-ii/discuss/894504/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [221. Maximal Square](https://leetcode.com/problems/maximal-square/discuss/600365/Javascript-and-C%2B%2B-solutions)
* [256. Paint House](https://leetcode.com/problems/paint-house/discuss/68202/The-ART-of-Dynamic-Programming)
* [265. Paint House II](https://leetcode.com/problems/paint-house-ii/discuss/1249637/The-ART-of-Dynamic-Programming)
* [279. Perfect Squares](https://leetcode.com/problems/perfect-squares/discuss/708644/Javascript-and-C%2B%2B-solutions)
* [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/discuss/385203/Javascript-and-C%2B%2B-solutions)
* [322. Coin Change](https://leetcode.com/problems/coin-change/discuss/677858/Javascript-and-C%2B%2B-solutions)
* [337. House Robber III](https://leetcode.com/problems/house-robber-iii/discuss/946524/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [354. Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/discuss/1134924/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/discuss/617275/Javascript-and-C%2B%2B-solutions)
* [514. Freedom Trail](https://leetcode.com/problems/freedom-trail/discuss/1147789/The-ART-of-Dynamic-Programming)
* [518. Coin Change 2](https://leetcode.com/problems/coin-change-2/discuss/677893/Javascript-and-C%2B%2B-solutions)
* [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/discuss/105742/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [673. Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/discuss/916696/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [718. Maximum Length of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/discuss/1325833/The-ART-of-Dynamic-Programming)
* [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/discuss/110111/Javascript-and-C%2B%2B-solutions)
* [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/discuss/690997/Javascript-and-C%2B%2B-solutions)
* [799. Champagne Tower](https://leetcode.com/problems/champagne-tower/discuss/118694/Kt-Js-Py3-Cpp-The-ART-of-Dynamic-Programming)
* [877. Stone Game](https://leetcode.com/problems/stone-game/discuss/706734/Javascript-and-C%2B%2B-solutions)
* [983. Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/discuss/811237/Javascript-Python3-C%2B%2B-Top-Down-%2B-Bottom-Up)
* [1025. Divisor Game](https://leetcode.com/problems/divisor-game/discuss/292472/Javascript-Python3-C%2B%2B-Top-Down-%2B-Bottom-Up)
* [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/discuss/652184/Javascript-and-C%2B%2B-solutions)
* [1140. Stone Game II](https://leetcode.com/problems/stone-game-ii/discuss/713502/Javascript-and-C%2B%2B-solutions)
* [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/discuss/1327645/The-ART-of-Dynamic-Programming)
* [1406. Stone Game III](https://leetcode.com/problems/stone-game-iii/discuss/657825/Javascript-and-C%2B%2B-solutions)
* [1458. Max Dot Product of Two Subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences/discuss/653625/Javascript-and-C%2B%2B-solutions)
* [1463. Cherry Pickup II](https://leetcode.com/problems/cherry-pickup-ii/discuss/660828/Javascript-and-C%2B%2B-solutions)
* [1473. Paint House III](https://leetcode.com/problems/paint-house-iii/discuss/695337/Javascript-and-C%2B%2B-solutions)
* [1510. Stone Game IV](https://leetcode.com/problems/stone-game-iv/discuss/737869/javascript-python3-c)
* [1690. Stone Game VII](https://leetcode.com/problems/stone-game-vii/discuss/1265150/The-ART-of-Dynamic-Programming)
* [1696. Jump Game VI](https://leetcode.com/problems/jump-game-vi/discuss/1261177/The-ART-of-Dynamic-Programming)
* [1871. Jump Game VII](https://leetcode.com/problems/jump-game-vii/discuss/1231012/The-ART-of-Dynamic-Programming)
* [1879. Minimum XOR Sum of Two Arrays](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/discuss/1241903/The-ART-of-Dynamic-Programming)
* [1884. Egg Drop With 2 Eggs and N Floors](https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors/discuss/1249918/The-ART-of-Dynamic-Programming)


#### Recurrence Relation to Reduce Asymptotic Bounds via Pre-calculations:

* [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/discuss/512006/Javascript-and-C%2B%2B-solutions)
* [304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/discuss/508260/A-few-solutions)
* [307. Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/discuss/665390/Javascript-and-C%2B%2B-solutions)
* [764. Largest Plus Sign](https://leetcode.com/problems/largest-plus-sign/discuss/113350/a-few-solutions)
* [1139. Largest 1-Bordered Square](https://leetcode.com/problems/largest-1-bordered-square/discuss/681894/Javascript-and-C%2B%2B-solutions)
* [1895. Largest Magic Square](https://leetcode.com/problems/largest-magic-square/discuss/1267999/brute-force-best-magic)
* [1991. Find the Middle Index in Array](https://leetcode.com/problems/find-the-middle-index-in-array/discuss/1444083/a-few-solutions)


#### Recurrence Relation to Minimize or Maximize an Objective Function:

* [1277. Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/discuss/442151/Javascript-and-C%2B%2B-solutions)


#### Bottom-Up Sequentially Building Upon "K-th Buckets" of Previous Solutions:

* [338. Counting Bits](https://leetcode.com/problems/counting-bits/discuss/657068/Kt-Js-Py3-Cpp-Dynamic-Programming)
* [1262. Greatest Sum Divisible by Three](https://leetcode.com/problems/greatest-sum-divisible-by-three/discuss/439097/Javascript-and-C%2B%2B-solutions)


## Resources

* [The ART of Dynamic Programming](https://claytonjwong.github.io/The-ART-of-Dynamic-Programming/)
* [Competitive Programmer's Core Skills by Saint Petersburg State University](https://claytonjwong.github.io/competitive-programming/)
* [Algorithms by Standford University](https://claytonjwong.github.io/Algorithms-Stanford/)
* [Algorithms and Data Structures by UC San Diego](https://claytonjwong.github.io/Algorithms-UCSanDiego/)
* [Algorithms for DNA Sequencing](https://claytonjwong.github.io/Algorithms-DNA-Sequencing/)
* [Master Theorem: Determine the asymptotic bound of recursive algorithms via standard recurrences](https://claytonjwong.github.io/Master-Theorem/)
* [Towers of Hanoi](https://claytonjwong.github.io/Towers-Of-Hanoi/)

## Supplemental Resources

* [Mathematics for Computer Science](https://github.com/claytonjwong/Algorithms-Stanford/raw/master/documentation/mcs.pdf)
* [Algorithms: Dasgupta-Papadimitriou-Vazirani ( 2006 )](https://github.com/claytonjwong/Algorithms-Stanford/tree/master/documentation/Dasgupta-Papadimitriou-Vazirani.pdf)
* [Algorithms and Data Structures: Mehlhorn-Sanders ( 2007 )](https://github.com/claytonjwong/Algorithms-Stanford/tree/master/documentation/Mehlhorn-Sanders-Toolbox.pdf)
* [Introduction to Algorithms: Cormen-Leiserson-Rivest-Stein ( 2009 )](https://en.wikipedia.org/wiki/Introduction_to_Algorithms)
* [Discrete Probability](https://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probability)
* [Mathematical Proofs](https://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Mathematical_Proofs)

## Auxillary

> A major part of the art of dynamic programming is the appropriate choice of the subproblems that must be solved in order eventually to solve the given problem.
>
[-*The Art and Theory of Dynamic Programming* Dreyfus and Law (1977)](https://www.academia.edu/8817530/The_Art_and_Theory_of_Dynamic_Programming)

