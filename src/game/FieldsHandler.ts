import { IFieldPosition } from "../model/FieldPosition";
import { Context } from "./Context";
import { Handler } from "./Handler";

export interface IFieldsHandlerEvents {
    onSnakeTouchesHerself: (position: IFieldPosition) => void;
    onSnakeTouchesFood: (position: IFieldPosition) => void;
    onSnakeIsOutOfBounce: (position: IFieldPosition) => void;
}

export class FieldsHandler extends Handler {

    constructor(
        context: Context,
        private events: IFieldsHandlerEvents,
    ) {
        super(context);
    }

    public rebuild() {
        this.context.fields = { };

        this.addEmptyFields();
        this.addSnake();
        this.addFood();
    }

    public check() {
        this.checkIsSnakeOutOfBounce();
        this.checkForCollisions();
    }

    private checkIsSnakeOutOfBounce() {
        const {
            countOfHorizontalFields,
            countOfVerticalFields,
        } = this.context.options;

        for (const part of this.context.snake.parts) {
            if (
                part.x >= countOfHorizontalFields ||
                part.y >= countOfVerticalFields ||
                part.x < 0 ||
                part.y < 0
            ) {
                this.events.onSnakeIsOutOfBounce(part);
            }
        }
    }

    private checkForCollisions() {
        const { fields } = this.context;

        for (const key of Object.keys(fields)) {
            const { content, position } = fields[key];

            if (content.length > 1) {
                const snakePresent: boolean = content.indexOf("snake") > -1;
                const foodPresent: boolean = content.indexOf("food") > -1;

                if (foodPresent && snakePresent) {
                    this.events.onSnakeTouchesFood(position);
                } else if (snakePresent) {
                    this.events.onSnakeTouchesHerself(position);
                }
            }
        }
    }

    private addEmptyFields() {
        const {
            countOfHorizontalFields,
            countOfVerticalFields,
        } = this.context.options;

        for (let x = 0; x < countOfHorizontalFields; x++) {
            for (let y = 0; y < countOfVerticalFields; y++) {
                const position: IFieldPosition = { x, y };

                this.context.fields[this.getMapKey(position)] = {
                    content: [],
                    position,
                };
            }
        }
    }

    private addSnake() {
        const { parts } = this.context.snake;
        const { fields } = this.context;

        for (const part of parts) {
            const mapKey: string = this.getMapKey(part);

            if (fields[mapKey]) {
                fields[mapKey].content.push("snake");
            } else {
                fields[mapKey] = {
                    content: ["snake"],
                    position: part,
                };
            }
        }
    }

    private addFood() {
        const { fields, food } = this.context;

        fields[this.getMapKey(food)].content.push("food");
    }

    private getMapKey(position: IFieldPosition): string {
        return `${position.x}-${position.y}`;
    }

}
