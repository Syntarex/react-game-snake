import { Direction } from "../model/Direction";
import { IFieldPosition } from "../model/FieldPosition";
import { Context } from "./Context";
import { Handler } from "./Handler";

export class SnakeHandler extends Handler {

    private nextDirection: Direction;

    constructor(context: Context) {
        super(context);

        this.nextDirection = context.snake.direction;
    }

    public setNextDirection(direction: Direction) {
        this.nextDirection = direction;
    }

    public eat() {
        this.context.updateSnake({ ate: true });
    }

    public move() {
        this.prepareDirection();

        const { ate, direction, parts } = this.context.snake;
        const newParts: IFieldPosition[] = [];

        if (parts.length === 0) {
            throw new Error("The snake got no parts.");
        }

        let newHead = { ...parts[0] };

        switch (direction) {
            case "left":
                newHead = {
                    ...newHead,
                    x: newHead.x - 1,
                };
                break;
            case "up":
                newHead = {
                    ...newHead,
                    y: newHead.y - 1,
                };
                break;
            case "right":
                newHead = {
                    ...newHead,
                    x: newHead.x + 1,
                };
                break;
            case "down":
                newHead = {
                    ...newHead,
                    y: newHead.y + 1,
                };
                break;
        }

        newParts.push(newHead);

        if (parts.length > 1) {
            const sliceTo: number = ate ? parts.length : parts.length - 1;
            newParts.push(...parts.slice(0, sliceTo));
        }

        this.context.updateSnake({
            ate: false,
            parts: newParts,
        });
    }

    private prepareDirection() {
        let blockedDirection: Direction = "left";

        switch (this.context.snake.direction) {
            case "left":
                blockedDirection = "right";
                break;
            case "up":
                blockedDirection = "down";
                break;
            case "right":
                blockedDirection = "left";
                break;
            case "down":
                blockedDirection = "up";
                break;
        }

        if (this.nextDirection !== blockedDirection) {
            this.context.updateSnake({ direction: this.nextDirection });
        }
    }

}
