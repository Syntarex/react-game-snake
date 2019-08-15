export interface IOptions {
    countOfHorizontalFields: number;
    countOfVerticalFields: number;
    fieldSize: number;
    loopTime: number;
    colors: {
        snake: string;
        food: string;
        field: string;
    };
    restartAllowed: boolean;
    pauseAllowed: boolean;
}
