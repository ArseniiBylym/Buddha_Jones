/**
 * Function to search for a needle in haystack with some additional features like searching by words in a sentence
 *
 * @param {string} haystack - String to search in for needle matching results
 * @param {string} needle - String to search for in the haystack
 * @param {boolean} [ignoreCase = false] - Ignore casing of letters in both haystack and needle
 * @param {boolean} [breakWords = false] - Break haystack on empty space character into array of strings and check if at least one matches
 * @returns boolean
 */
const searchPhraseInString = exports.searchPhraseInString = (haystack, needle, ignoreCase, breakWords) => {
    // Defaults
    haystack = typeof haystack !== 'undefined' && haystack ? haystack : '';
    needle = typeof needle !== 'undefined' && needle ? needle : '';
    ignoreCase = typeof ignoreCase !== 'undefined' && ignoreCase !== null ? ignoreCase : false;
    breakWords = typeof breakWords !== 'undefined' && breakWords !== null ? breakWords : false;

    // Check if all necessary parameters are defined
    if (typeof haystack !== 'undefined' && typeof needle !== 'undefined') {
        // Prepare case
        if (typeof ignoreCase !== 'undefined' && ignoreCase === true) {
            haystack = typeof haystack.toLowerCase !== 'undefined'
                ? haystack.toLowerCase()
                : typeof haystack.toString !== 'undefined'
                    ? haystack.toString().toLowerCase()
                    : '';

            needle = typeof needle.toLowerCase !== 'undefined'
                ? needle.toLowerCase()
                : typeof needle.toString !== 'undefined'
                    ? needle.toString().toLowerCase()
                    : '';
        }

        // Check if words should be broken
        if (typeof breakWords !== 'undefined' && breakWords === true) {
            // Split haystack into words
            const haystackWords = haystack.split(' ');
            const needleWords = needle.split(' ');

            // Iterate through all words
            for (let s = 0; s < haystackWords.length; s++) {
                const haystackWord = haystackWords[s];
                for (let p = 0; p < needleWords.length; p++) {
                    const needleWord = needleWords[p];
                    if (haystackWord.indexOf(needleWord) !== -1) {
                        return true;
                    }
                }
            }
        } else {
            if (haystack.indexOf(needle) !== -1) {
                return true;
            }
        }
    }

    // Not found
    return false;
};
