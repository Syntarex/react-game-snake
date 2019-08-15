export interface IGame {
    points: number;
    pause: boolean;
    loop?: NodeJS.Timeout;
}
