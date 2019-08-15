import { CanvasHandler } from "./game/CanvasHandler";
import { Context } from "./game/Context";
import { FieldsHandler, IFieldsHandlerEvents } from "./game/FieldsHandler";
import { FoodHandler } from "./game/FoodHandler";
import { GameHandler, IGameEvents } from "./game/GameHandler";
import { IInputEvents, InputHandler } from "./game/InputHandler";
import { SnakeHandler } from "./game/SnakeHandler";
import { IFieldPosition } from "./model/FieldPosition";
import { IOptions } from "./model/Options";

export interface IGameLogicEvents {
    onLoose: (context: Context) => void;
    onWin: (context: Context) => void;
    onRestart: (context: Context) => void;
    onPause: (context: Context) => void;
    onResume: (context: Context) => void;
    onLoopStart: (context: Context) => void;
    onLoopFinish: (context: Context) => void;
}

export class GameLogic implements IInputEvents, IFieldsHandlerEvents, IGameEvents {

    private context: Context;
    private loop?: NodeJS.Timeout;

    private canvasHandler: CanvasHandler;
    private fieldsHandler: FieldsHandler;
    private gameHandler: GameHandler;
    private inputHandler: InputHandler;
    private snakeHandler: SnakeHandler;
    private foodHandler: FoodHandler;

    constructor(
        options: IOptions,
        canvas: HTMLCanvasElement,
        private events: IGameLogicEvents,

    ) {
        this.context = new Context(options, canvas);

        this.canvasHandler = new CanvasHandler(this.context);
        this.fieldsHandler = new FieldsHandler(this.context, this);
        this.gameHandler = new GameHandler(this.context, this);
        this.inputHandler = new InputHandler(this.context, this);
        this.snakeHandler = new SnakeHandler(this.context);
        this.foodHandler = new FoodHandler(this.context);
    }

    public onLeft() {
        this.snakeHandler.setNextDirection("left");
    }

    public onUp() {
        this.snakeHandler.setNextDirection("up");
    }

    public onRight() {
        this.snakeHandler.setNextDirection("right");
    }

    public onDown() {
        this.snakeHandler.setNextDirection("down");
    }

    public onPause() {
        if (this.context.options.pauseAllowed) {
            if (this.context.game.pause) {
                this.gameHandler.resume();
                this.events.onResume(this.context);
            } else {
                this.gameHandler.pause();
                this.events.onPause(this.context);
            }
        }
    }

    public onRestart() {
        if (this.context.options.restartAllowed) {
            this.events.onRestart(this.context);
        }
    }

    public onSnakeIsOutOfBounce(position: IFieldPosition) {
        this.events.onLoose(this.context);
    }

    public onSnakeTouchesHerself(position: IFieldPosition) {
        this.events.onLoose(this.context);
    }

    public onSnakeTouchesFood(position: IFieldPosition) {
        this.snakeHandler.eat();
        this.foodHandler.regenerate();
        this.gameHandler.increasePoints();
    }

    public onStart() {
        this.fieldsHandler.rebuild();
        this.foodHandler.regenerate();
    }

    public onLoop() {
        this.events.onLoopStart(this.context);

        this.snakeHandler.move();

        this.fieldsHandler.rebuild();
        this.fieldsHandler.check();

        this.canvasHandler.clear();
        this.canvasHandler.draw();

        this.events.onLoopFinish(this.context);
    }

    public start() {
        this.inputHandler.startKeyboardInput();
        this.gameHandler.startLoop();
    }

    public stop() {
        this.inputHandler.stopKeyboardInput();
        this.gameHandler.stopLoop();
    }

}
