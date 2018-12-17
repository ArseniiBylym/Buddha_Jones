export class AsyncHandler {
    static timeout = (ms: number): Promise<Function> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
}
