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
        if (a === null || b === null) {
            return a === null && b !== null ? -1 : b === null ? 1 : 0;
        }

        const versionASeq = a.seq !== null ? a.seq : -1;
        const versionBSeq = b.seq !== null ? b.seq : -1;

        if (versionASeq < 0 || versionBSeq < 0) {
            return a.id < 0 && b.id >= 0 ? -1 : a.id >= 0 && b.id < 0 ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        }

        return versionASeq < versionBSeq ? -1 : versionASeq > versionBSeq ? 1 : 0;
    };
}
