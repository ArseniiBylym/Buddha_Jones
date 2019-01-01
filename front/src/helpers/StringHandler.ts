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

    public static constructProjectCampaignName = (campaignName: string, projectCampaignName: string | null): string => {
        let str = projectCampaignName ? '(' + projectCampaignName + ') ' : '';
        str += campaignName;
        return str;
    };

    public static constructSpotRevisionsAndGraphicsIncludedDescription = (
        numberOfRevisions: number | null,
        graphicsIncluded: boolean = false
    ): string => {
        let str =
            numberOfRevisions === null
                ? 'No revisions'
                : numberOfRevisions === 0
                ? 'Unlimited revisions'
                : numberOfRevisions === 1
                ? '1 revision'
                : numberOfRevisions + ' revisions';

        str += str ? ', ' : '';
        str += graphicsIncluded ? 'graphics included' : 'graphics not included';

        return str;
    };

    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    graphicsIncluded: boolean;
}
