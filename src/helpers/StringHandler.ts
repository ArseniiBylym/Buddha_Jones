export class StringHandler {
    public static capitalizeAllWordsInPhrase = (phrase: string): string => {
        return phrase.trim().replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    };
}
