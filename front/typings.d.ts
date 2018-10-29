declare type IClassNames = {
    [className: string]: string;
};

declare module '*.scss' {
    const classNames: IClassNames;
    export = classNames;
}
