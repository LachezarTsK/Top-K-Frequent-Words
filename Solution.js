
const {PriorityQueue} = require('@datastructures-js/priority-queue');

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {

    this.ascii_small_case_a = 97;
    this.numberOfWordsToDisplay = k;

    const root = new TrieNode();
    addAllWordsToDictionary(root, words);

    const pairs = new MaxPriorityQueue({compare: (pair_01, pair_02) => comparePairs_optionOne(pair_01, pair_02)});
    searchTrie(pairs, [], root);

    const top_K_frequentWords = [];
    while (!pairs.isEmpty()) {
        top_K_frequentWords.push(pairs.dequeue().value);
    }
    top_K_frequentWords.reverse();

    return top_K_frequentWords;
};

function TrieNode() {
    this.ALPHABET = 26;
    this.frequency = 0;
    this.isWord = false;
    this.branches = new Array(this.ALPHABET).fill(null);
}

/**
 * @param {number} key
 * @param {string} value
 */
function Pair(key, value) {
    this.key = key;
    this.value = value;
}

/**
 * @param {Pair MaxPriorityQueue} pairs
 * @param {string[]} word
 * @param {TrieNode} node
 */
function searchTrie(pairs, word, node) {
    if (node === null) {
        return;
    }

    if (node.isWord) {
        let word_toCheck = word.join('');
        if (pairs.size() < this.numberOfWordsToDisplay) {
            pairs.enqueue(new Pair(node.frequency, word_toCheck));
        } else if (comparePairs_optionTwo(pairs.front(), node.frequency, word_toCheck) < 0) {
            pairs.dequeue();
            pairs.enqueue(new Pair(node.frequency, word_toCheck));
        }
    }

    for (let i = 0; i < 26; i++) {
        if (node.branches[i] !== null) {
            word.push(String.fromCodePoint(i + this.ascii_small_case_a));
            searchTrie(pairs, word, node.branches[i]);
            word.splice(word.length - 1);
        }
    }
}

/**
 * @param {Pair} pair_01
 * @param {number} frequency
 * @param {string} word
 * @return {number}
 */
function comparePairs_optionTwo(pair_01, frequency, word) {
    return (pair_01.key !== frequency) ? (pair_01.key - frequency) : word.localeCompare(pair_01.value);
}

/**
 * @param {Pair} pair_01
 * @param {Pair} pair_02
 * @return {number}
 */
function comparePairs_optionOne(pair_01, pair_02) {
    return (pair_01.key !== pair_02.key) ? (pair_01.key - pair_02.key) : pair_02.value.localeCompare(pair_01.value);
}

/**
 * @param {TrieNode} root
 * @param {string[]} words
 */
function addAllWordsToDictionary(root, words) {
    for (let word of words) {
        addWord(root, word);
    }
}

/**
 * @param {TrieNode} root
 * @param {string} word
 */
function addWord(root, word) {
    let current = root;
    const size = word.length;

    for (let i = 0; i < size; i++) {
        let index = word.codePointAt(i) - this.ascii_small_case_a;
        if (current.branches[index] === null) {
            current.branches[index] = new TrieNode();
        }
        current = current.branches[index];
    }

    current.isWord = true;
    current.frequency++;
}
