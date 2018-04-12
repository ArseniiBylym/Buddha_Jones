/**
 * Limit string length to certain amount of characters
 *
 * @param {string} phrase - String to limit in length
 * @param {number} limit - Number of characters to limit to
 * @param {string} [ending = '...'] String to append at the end of the limited phrase
 * @returns string
 */
const truncuateString = exports.truncuateString = (phrase, limit, ending) => {
    // Defaults
    phrase = typeof phrase !== 'undefined' && phrase ? phrase : '';
    limit = typeof limit !== 'undefined' && limit !== null ? limit : null;
    ending = typeof ending !== 'undefined' && ending !== null ? ending : '...';

    // Check if phrase is longer than limit
    if (limit !== null && phrase && phrase.length > limit) {
        return phrase.slice(0, limit) + ending;
    } else {
        return phrase;
    }
};

/** Pad the string with  Prepend or append character or string to another string until end string is of certain length
 *
 * @param {string} phrase - String to prepend or append to
 * @param {number} length - Amount of characters end string should reach
 * @param {string} character - Character or string to fill remaining length with
 * @param {boolean} [onLeft = true] - Determines if character is going to get appended or prepended
 * @returns string
 */
const padWithCharacter = exports.padWithCharacter = (phrase, length, character, onLeft) => {
    // Defaults
    phrase = typeof phrase !== 'undefined' ? phrase : '';
    length = typeof length !== 'undefined' && length ? length : 0;
    character = typeof character !== 'undefined' && character !== null
        ? typeof character === 'number' && typeof character.toString !== 'undefined'
            ? character.toString()
            : typeof character === 'string'
                ? character
                : ''
        : '';
    onLeft = typeof onLeft !== 'undefined' ? onLeft : true;

    // Count characters length
    const charactersCount = character.length;

    // Check if phrase is shorter than desired length
    if (length > 0 && charactersCount > 0) {
        const brokenDownCharacter = character.split('');
        let brokenDownPadCount = 0;
        while (phrase.length < length) {
            const char = brokenDownCharacter[brokenDownPadCount];

            if (onLeft) {
                phrase = char + phrase;
            } else {
                phrase = phrase + char;
            }

            if (brokenDownPadCount + 1 < charactersCount) {
                brokenDownPadCount++;
            } else {
                brokenDownPadCount = 0;
            }
        }
    }

    return phrase;
};

/**
 * Capitalize all words in a string, optionally remove empty spaces
 *
 * @param {string} phrase - String to capitalize
 * @param {boolean} [removeSpaces = false] - Optionally remove empty spaces to create camel case
 * @returns string
 */
const capitalizePhraseOrWord = exports.capitalizePhraseOrWord = (word, removeSpaces) => {
    // Defaults
    word = typeof word !== 'undefined' && word ? word : '';
    removeSpaces = typeof removeSpaces !== 'undefined' && removeSpaces !== null ? removeSpaces : false;

    if (typeof word === 'string' && typeof word.replace !== 'undefined') {
        // Capitalize all words
        word = word.replace(/[^-'`"\s]+/g, (word) => {
            return word.replace(/^./, (first) => {
                return first.toUpperCase();
            });
        });

        // Remove spaces
        if (removeSpaces) {
            word = word.replace(/ /g, '');
        }
    }

    return word;
};
