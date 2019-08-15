import { IFields } from "./Fields";
import { IGame } from "./Game";
import { IOptions } from "./Options";
import { ISnake } from "./Snake";

export interface IContext {
    fields: IFields;
    snake: ISnake;
    game: IGame;
    options: IOptions;
    canvas: HTMLCanvasElement;
}
