/*
 * 5. Longest Palindromic Substring
 *
 * Q: https://leetcode.com/problems/longest-palindromic-substring/
 * A: https://leetcode.com/problems/longest-palindromic-substring/discuss/635659/Javascript-and-C%2B%2B-solutions
 */

// top-down TLE without memo
// "babaddtattarrattatddetartrateedredividerb"
/*
let longestPalindrome = s => {
    let N = s.length;
    if (!N) return '';
    let ans = s[0];
    let best = (i, j) => {
        if (ans.length < j - i + 1)      // +1 for i..j inclusive
            ans = s.substring(i, j + 1); // +1 for i..j inclusive 🎯
    };
    let go = (i = 0, j = N - 1) => {
        if (j - i < 2) {
            if (s[i] == s[j]) {
                best(i, j);
                return true;
            }
            return false;
        }
        go(i + 1, j);           // case 1: the sub-problem without the character at index i
        go(i, j - 1);           // case 2: the sub-problem without the character at index j
        if (go(i + 1, j - 1)) { // case 3: the sub-problem without the character at index i and j
            if (s[i] == s[j]) {
                best(i, j);
                return true;
            }
        }
        return false;
    };
    go();
    return ans;
};
*/

// top-down TLE with memo
// "anugnxshgonmqydttcvmtsoaprxnhpmpovdolbidqiyqubirkvhwppcdyeouvgedccipsvnobrccbndzjdbgxkzdbcjsjjovnhpnbkurxqfupiprpbiwqdnwaqvjbqoaqzkqgdxkfczdkznqxvupdmnyiidqpnbvgjraszbvvztpapxmomnghfaywkzlrupvjpcvascgvstqmvuveiiixjmdofdwyvhgkydrnfuojhzulhobyhtsxmcovwmamjwljioevhafdlpjpmqstguqhrhvsdvinphejfbdvrvabthpyyphyqharjvzriosrdnwmaxtgriivdqlmugtagvsoylqfwhjpmjxcysfujdvcqovxabjdbvyvembfpahvyoybdhweikcgnzrdqlzusgoobysfmlzifwjzlazuepimhbgkrfimmemhayxeqxynewcnynmgyjcwrpqnayvxoebgyjusppfpsfeonfwnbsdonucaipoafavmlrrlplnnbsaghbawooabsjndqnvruuwvllpvvhuepmqtprgktnwxmflmmbifbbsfthbeafseqrgwnwjxkkcqgbucwusjdipxuekanzwimuizqynaxrvicyzjhulqjshtsqswehnozehmbsdmacciflcgsrlyhjukpvosptmsjfteoimtewkrivdllqiotvtrubgkfcacvgqzxjmhmmqlikrtfrurltgtcreafcgisjpvasiwmhcofqkcteudgjoqqmtucnwcocsoiqtfuoazxdayricnmwcg"
/*
let longestPalindrome = (s, m = new Map()) => {
    let N = s.length;
    if (!N)
        return '';
    let max = 1,
        ans = s[0];
    let best = (i, j) => {
        if (max < j - i + 1) {
            max = j - i + 1;             // +1 for i..j inclusive
            ans = s.substring(i, j + 1); // +1 for j non-inclusive
        }
    };
    let go = (i = 0, j = N - 1) => {
        if (m.has(`${i},${j}`))
            return m.get(`${i},${j}`);
        if (i + 1 >= j) {
            if (s[i] == s[j]) {
                best(i, j);
                m.set(`${i},${j}`, true);
                return true;
            }
            m.set(`${i},${j}`, false);
            return false;
        }
        go(i + 1, j);
        go(i, j - 1);
        if (go(i + 1, j - 1)) {
            if (s[i] == s[j]) {
                best(i, j);
                m.set(`${i},${j}`, true);
                return true;
            }
        }
        m.set(`${i},${j}`, false);
        return false;
    };
    go();
    return ans;
};
*/

// brute-force bottom up: AC
/*
let longestPalindrome = (s, max = 1, ans = '') => {
    let N = s.length;
    if (!N) return ans;
    ans = s[0];
    let expand = (i, j) => {
        for (; 0 <= i && j < N && s[i] == s[j]; --i, ++j)
            if (max < j - i + 1)
                max = j - i + 1, ans = s.substring(i, j + 1); // +1 for i..j inclusive 🎯
    };
    for (let i = 0; i + 1 < N; ++i)
        expand(i, i),     // case 1: odd length palindrome
        expand(i, i + 1); // case 2: even length palindrome
    return ans;
};
*/

// bottom-up DP: AC
let longestPalindrome = s => {
    let N = s.length;
    if (!N) return '';
    let ans = s[0];
    let dp = [...Array(N)].map(row => Array(N).fill(false));
    for (let j = 1; j < N; ++j) {
        for (let i = j; i >= 0; --i) {
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
            if (dp[i][j] && ans.length < j - i + 1)
                ans = s.substring(i, j + 1); // +1 for i..j inclusive 🎯
        }
    }
    return ans;
};

console.log(longestPalindrome('a'));
console.log(longestPalindrome('ac'));
console.log(longestPalindrome('bb'));
console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));
console.log(longestPalindrome('babaddtattarrattatddetartrateedredividerb'));
console.log(longestPalindrome('anugnxshgonmqydttcvmtsoaprxnhpmpovdolbidqiyqubirkvhwppcdyeouvgedccipsvnobrccbndzjdbgxkzdbcjsjjovnhpnbkurxqfupiprpbiwqdnwaqvjbqoaqzkqgdxkfczdkznqxvupdmnyiidqpnbvgjraszbvvztpapxmomnghfaywkzlrupvjpcvascgvstqmvuveiiixjmdofdwyvhgkydrnfuojhzulhobyhtsxmcovwmamjwljioevhafdlpjpmqstguqhrhvsdvinphejfbdvrvabthpyyphyqharjvzriosrdnwmaxtgriivdqlmugtagvsoylqfwhjpmjxcysfujdvcqovxabjdbvyvembfpahvyoybdhweikcgnzrdqlzusgoobysfmlzifwjzlazuepimhbgkrfimmemhayxeqxynewcnynmgyjcwrpqnayvxoebgyjusppfpsfeonfwnbsdonucaipoafavmlrrlplnnbsaghbawooabsjndqnvruuwvllpvvhuepmqtprgktnwxmflmmbifbbsfthbeafseqrgwnwjxkkcqgbucwusjdipxuekanzwimuizqynaxrvicyzjhulqjshtsqswehnozehmbsdmacciflcgsrlyhjukpvosptmsjfteoimtewkrivdllqiotvtrubgkfcacvgqzxjmhmmqlikrtfrurltgtcreafcgisjpvasiwmhcofqkcteudgjoqqmtucnwcocsoiqtfuoazxdayricnmwcg'));
