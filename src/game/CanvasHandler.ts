import { IField } from "../model/Fields";
import { Context } from "./Context";
import { Handler } from "./Handler";

export class CanvasHandler extends Handler {

    private renderer: CanvasRenderingContext2D;

    constructor(context: Context) {
        super(context);

        const renderer: CanvasRenderingContext2D | null = this.context.canvas.getContext("2d");
        if (renderer) {
            this.renderer = renderer;
        } else {
            throw new Error("canvas rendering context couldn't be initialized.");
        }
    }

    public clear() {
        this.renderer.clearRect(
            0,
            0,
            this.getFieldWidth(),
            this.getFieldHeight(),
        );
    }

    public draw() {
        const { fields } = this.context;

        for (const key of Object.keys(fields)) {
            this.drawField(fields[key]);
        }
    }

    private drawField(field: IField) {
        const { fieldSize, colors } = this.context.options;
        let color: string = colors.field;

        if (field.content.indexOf("snake") > -1) {
            color = colors.snake;
        } else if (field.content.indexOf("food") > -1) {
            color = colors.food;
        }

        this.renderer.fillStyle = color;

        this.renderer.fillRect(
            field.position.x * fieldSize,
            field.position.y * fieldSize,
            fieldSize,
            fieldSize,
        );
    }

    private getFieldWidth(): number {
        const {
            countOfHorizontalFields,
            fieldSize,
        } = this.context.options;

        return countOfHorizontalFields * fieldSize;
    }

    private getFieldHeight(): number {
        const {
            countOfVerticalFields,
            fieldSize,
        } = this.context.options;

        return countOfVerticalFields * fieldSize;
    }

}
