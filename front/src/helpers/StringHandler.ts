export class StringHandler {
    public static capitalizeAllWordsInPhrase = (phrase: string): string => {
        return phrase.trim().replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    };

    public static joinWordsExcludingNulls = (
        words: Array<string | number | null | undefined>,
        separator: string
    ): string => {
        return words
            .map(word => (typeof word === 'number' ? word.toString() : typeof word === 'string' ? word : null))
            .filter(word => typeof word === 'string' && word !== null && word !== '')
            .join(separator);
    };

    public static constructUserName = (
        username: string,
        userFirstName: string | null | undefined,
        userLastName: string | null | undefined
    ): string => {
        if (userFirstName || userLastName) {
            return StringHandler.joinWordsExcludingNulls([userFirstName, userLastName], ' ');
        }

        return username;
    };
}
