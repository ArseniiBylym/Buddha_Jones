export class SortHandler {
    public static sortVersionsBySequenceOrId = (
        a: {
            id: number;
            seq: number | null;
        } | null = null,
        b: {
            id: number;
            seq: number | null;
        } | null = null
    ): number => {
        // If fake version IDs are sent (0 or lower), make sort variable null
        a = a && a.id ? a : null;
        b = b && b.id ? b : null;

        // If one of versions is not defined, put undefined / null versions at the bottom
        if (a === null || b === null) {
            return a === null && b !== null ? 1 : b === null ? -1 : 0;
        }

        // Check if version sequence number exists, otherwise set -1 as default
        const versionASeq = a.seq !== null ? a.seq : -1;
        const versionBSeq = b.seq !== null ? b.seq : -1;

        // Put versions sequences with negative number at the end (-1 or lower)
        if (versionASeq < 0 || versionBSeq < 0) {
            return a.id < 0 && b.id >= 0 ? -1 : a.id >= 0 && b.id < 0 ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        }

        // Sort versions by sequence number starting with smallest number (0 or higher)
        return versionASeq < versionBSeq ? -1 : versionASeq > versionBSeq ? 1 : 0;
    };
}
