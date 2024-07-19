#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <limits>

// Function to load the dictionary from a file
std::vector<std::string> load_dictionary(const std::string& file_path) {
    std::vector<std::string> dictionary;
    std::ifstream file(file_path);
    std::string word;
    while (file >> word) {
        dictionary.push_back(word);
    }
    return dictionary;
}

// Function to compute the edit distance using the Wagner-Fischer algorithm
int wagner_fischer(const std::string& s1, const std::string& s2) {
    size_t len_s1 = s1.size();
    size_t len_s2 = s2.size();

    if (len_s1 > len_s2) {
        return wagner_fischer(s2, s1);
    }

    std::vector<int> current_row(len_s1 + 1);
    for (size_t i = 0; i <= len_s1; ++i) {
        current_row[i] = i;
    }

    for (size_t i = 1; i <= len_s2; ++i) {
        std::vector<int> previous_row = current_row;
        current_row[0] = i;
        for (size_t j = 1; j <= len_s1; ++j) {
            int add = previous_row[j] + 1;
            int delete_op = current_row[j - 1] + 1;
            int change = previous_row[j - 1];
            if (s1[j - 1] != s2[i - 1]) {
                change += 1;
            }
            current_row[j] = std::min({add, delete_op, change});
        }
    }

    return current_row[len_s1];
}

// Function to perform spell check
std::vector<std::pair<std::string, int>> spell_check(const std::string& word, const std::vector<std::string>& dictionary) {
    std::vector<std::pair<std::string, int>> suggestions;

    for (const auto& correct_word : dictionary) {
        int distance = wagner_fischer(word, correct_word);
        suggestions.push_back({correct_word, distance});
    }

    std::sort(suggestions.begin(), suggestions.end(), [](const auto& a, const auto& b) {
        return a.second < b.second;
    });

    if (suggestions.size() > 10) {
        suggestions.resize(10);
    }

    return suggestions;
}

// Main function to demonstrate the spell checker
int main() {
    std::vector<std::string> dictionary = load_dictionary("words.txt");
    std::string misspelled_word = "good";
    std::vector<std::pair<std::string, int>> suggestions = spell_check(misspelled_word, dictionary);

    std::cout << "Top 10 suggestions for '" << misspelled_word << "':\n";
    for (const auto& suggestion : suggestions) {
        std::cout << suggestion.first << " (Distance: " << suggestion.second << ")\n";
    }

    return 0;
}
