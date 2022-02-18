
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class Solution {

    static final int ALPHABET = 26;
    int numberOfWordsToDisplay;

    class TrieNode {
        TrieNode[] branches = new TrieNode[ALPHABET];
        boolean isWord;
        int frequency;
    }

    class Pair<K, V> {
        K key;
        V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    public List<String> topKFrequent(String[] words, int k) {
        this.numberOfWordsToDisplay = k;
        TrieNode root = new TrieNode();
        addAllWordsToDictionary(root, words);

        PriorityQueue<Pair<Integer, String>> pairs = new PriorityQueue<>((pair_01, pair_02) -> comparePairs(pair_01, pair_02));
        searchTrie(pairs, new StringBuilder(), root);

        List<String> top_K_frequentWords = new ArrayList<>();
        while (!pairs.isEmpty()) {
            top_K_frequentWords.add(pairs.poll().value);
        }
        Collections.reverse(top_K_frequentWords);

        return top_K_frequentWords;
    }

    public void searchTrie(PriorityQueue<Pair<Integer, String>> pairs, StringBuilder word, TrieNode node) {
        if (node == null) {
            return;
        }

        if (node.isWord) {
            String word_toCheck = word.toString();
            if (pairs.size() < numberOfWordsToDisplay) {
                pairs.add(new Pair<>(node.frequency, word_toCheck));
            } else if (comparePairs(pairs.peek(), node.frequency, word_toCheck) < 0) {
                pairs.poll();
                pairs.add(new Pair<>(node.frequency, word_toCheck));
            }
        }

        for (int i = 0; i < 26; i++) {
            if (node.branches[i] != null) {
                word.append(Character.toString(i + 'a'));
                searchTrie(pairs, word, node.branches[i]);
                word.deleteCharAt(word.length() - 1);
            }
        }
    }

    public int comparePairs(Pair<Integer, String> pair_01, int frequency, String word) {
        return (pair_01.key != frequency) ? (pair_01.key - frequency) : word.compareTo(pair_01.value);
    }

    public int comparePairs(Pair<Integer, String> pair_01, Pair<Integer, String> pair_02) {
        return (pair_01.key != pair_02.key) ? (pair_01.key - pair_02.key) : pair_02.value.compareTo(pair_01.value);
    }

    public void addAllWordsToDictionary(TrieNode root, String[] words) {
        int size = words.length;
        for (int i = 0; i < size; i++) {
            addWord(root, words[i]);
        }
    }

    public void addWord(TrieNode root, String word) {
        TrieNode current = root;
        int size = word.length();

        for (int i = 0; i < size; i++) {
            int index = word.charAt(i) - 'a';
            if (current.branches[index] == null) {
                current.branches[index] = new TrieNode();
            }
            current = current.branches[index];
        }

        current.isWord = true;
        current.frequency++;
    }
}
