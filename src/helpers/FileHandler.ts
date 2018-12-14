export class FileHandler {
    // tslint:disable-next-line:no-any
    public static readFileAsDataUri = (file: File): Promise<any> => {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = resolve;
            fileReader.readAsDataURL(file);
        });
    };
}
