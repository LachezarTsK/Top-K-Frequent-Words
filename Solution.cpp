
#include <vector>
#include <queue>
using namespace std;

class Solution {
    
public:

    static const size_t ALPHABET = 26;
    int numberOfWordsToDisplay;

    struct TrieNode {
        vector <TrieNode*> branches{ ALPHABET};
        bool isWord{ false};
        int frequency{ 0};
    };

    struct ComparePairs {
        bool operator()(const pair<int, string>& pair_01, const pair<int, string>& pair_02) {
            return (pair_01.first != pair_02.first) ? (pair_01.first > pair_02.first) : pair_01.second.compare(pair_02.second) < 0;
        }
    };

    typedef priority_queue<pair<int, string>, vector<pair<int, string>>, ComparePairs> frequencyToWord;

    vector<string> topKFrequent(vector<string>& words, int k) {

        numberOfWordsToDisplay = k;
        TrieNode* root = new TrieNode();
        addAllWordsToDictionary(root, words);

        frequencyToWord pairs;
        string word;
        searchTrie(pairs, word, root);

        vector<string> top_K_frequentWords;
        while (!pairs.empty()) {
            top_K_frequentWords.push_back(pairs.top().second);
            pairs.pop();
        }
        reverse(top_K_frequentWords.begin(), top_K_frequentWords.end());

        root = nullptr;
        delete root;

        return top_K_frequentWords;
    }

    void searchTrie(frequencyToWord& pairs, string& word, TrieNode* node) {
        if (node == nullptr) {
            return;
        }

        if (node->isWord) {
            if (pairs.size() < numberOfWordsToDisplay) {
                pairs.push(pair<int, string>(node->frequency, word));
            } else if (comparePairs(pairs.top(), node->frequency, word) < 0) {
                pairs.pop();
                pairs.push(pair<int, string>(node->frequency, word));
            }
        }

        for (int i = 0; i < 26; i++) {
            if (node->branches[i] != nullptr) {
                word.push_back(i + 'a');
                searchTrie(pairs, word, node->branches[i]);
                word.resize(word.length() - 1);
            }
        }

        node = nullptr;
        delete node;
    }

    int comparePairs(pair<int, string> pair_01, int frequency, string word) {
        return (pair_01.first != frequency) ? (pair_01.first - frequency) : word.compare(pair_01.second);
    }

    void addAllWordsToDictionary(TrieNode* root, const vector<string>& words) {
        for (const auto& word : words) {
            addWord(root, word);
        }
    }

    void addWord(TrieNode* root, string word) {
        TrieNode* current = root;

        for (auto const& letter : word) {
            int index = letter - 'a';
            if (current->branches[index] == nullptr) {
                current->branches[index] = new TrieNode();
            }
            current = current->branches[index];
        }

        current->isWord = true;
        current->frequency++;

        current = nullptr;
        delete current;
    }
};
