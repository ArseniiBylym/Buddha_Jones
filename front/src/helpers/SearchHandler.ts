import { trimEnd as _trimEnd } from 'lodash';
import * as pathToRegexp from 'path-to-regexp';

export class SearchHandler {
    /**
     * Function to search for a needle in haystack with some additional features like searching by words in a sentence
     *
     * @param {string} haystack - String to search in for needle matching results
     * @param {string} needle - String to search for in the haystack
     * @param {boolean} [ignoreCase = false] - Ignore casing of letters in both haystack and needle
     * @param {boolean} [breakWords = false] - Break haystack on empty space character into array of strings and
     *                                         check if at least one matches
     * @returns boolean
     */
    public static searchPhraseInString = (
        haystack: string,
        needle: string,
        ignoreCase: boolean = false,
        breakWords: boolean = false
    ): boolean => {
        // Prepare strings
        haystack = haystack.trim();
        needle = needle.trim();

        // No match if both strings are empty
        if (haystack === '' && needle === '') {
            return false;
        }

        // Prepare case
        if (ignoreCase) {
            haystack = haystack.toLowerCase();
            needle = needle.toLowerCase();
        }

        // Check if words should be broken
        if (breakWords) {
            // Split into words
            const haystackWords = haystack.split(' ');
            const needleWords = needle.split(' ');

            // Iterate through words and compare them
            return haystackWords.some(haystackWord => {
                return needleWords.some(needleWord => haystackWord.indexOf(needleWord) !== -1);
            });
        }

        // Simple find
        if (haystack.indexOf(needle) !== -1) {
            return true;
        }

        // Not found
        return false;
    };

    public static urlPathMatchesRoute = (pathname: string, route: string, exact: boolean = false): boolean => {
        pathname = _trimEnd(pathname, '/');

        if (exact) {
            return pathname.toLowerCase() === route.toLowerCase();
        }

        const re = pathToRegexp(route);
        return re.exec(pathname) ? true : false;
    };
}
