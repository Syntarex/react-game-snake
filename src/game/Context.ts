import { IContext } from "../model/Context";
import { IFieldPosition } from "../model/FieldPosition";
import { IFields } from "../model/Fields";
import { IGame } from "../model/Game";
import { IOptions } from "../model/Options";
import { ISnake } from "../model/Snake";

export class Context implements IContext {

    public fields: IFields;
    public snake: ISnake;
    public game: IGame;
    public food: IFieldPosition;

    constructor(
        public options: IOptions,
        public canvas: HTMLCanvasElement,
    ) {
        if (
            options.countOfHorizontalFields < 3 ||
            options.countOfVerticalFields < 3
        ) {
            throw new Error("The field have to be at least 3x3 fields.");
        }

        this.fields = { };

        this.snake = {
            ate: false,
            direction: "right",
            parts: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
            ],
        };

        this.game = {
            pause: false,
            points: 0,
        };

        this.food = { x: 2, y: 0 };
    }

    public updateSnake(snake: Partial<ISnake>) {
        this.snake = {
            ...this.snake,
            ...snake,
        };
    }

    public updateGame(game: Partial<IGame>) {
        this.game = {
            ...this.game,
            ...game,
        };
    }

    public updateOptions(options: Partial<IOptions>) {
        this.options = {
            ...this.options,
            ...options,
        };
    }

}
