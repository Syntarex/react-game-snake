import { Context } from "./Context";
import { Handler } from "./Handler";

export interface IGameEvents {
    onLoop: () => void;
    onStart: () => void;
}

export class GameHandler extends Handler {

    constructor(
        context: Context,
        private events: IGameEvents,
    ) {
        super(context);
    }

    public increasePoints() {
        this.context.updateGame({ points: this.context.game.points + 1 });
    }

    public resetPoints() {
        this.context.updateGame({ points: 0 });
    }

    public pause() {
        this.context.updateGame({ pause: true });
    }

    public resume() {
        this.context.updateGame({ pause: false });
    }

    public startLoop() {
        this.events.onStart();

        if (!this.context.game.loop) {
            this.context.updateGame({
                loop: setInterval(
                    this.onLoop.bind(this),
                    this.context.options.loopTime,
                ),
            });
        }
    }

    public stopLoop() {
        if (this.context.game.loop) {
            clearInterval(this.context.game.loop);
            this.context.updateGame({ loop: undefined });
        }
    }

    private onLoop() {
        if (!this.context.game.pause) {
            this.events.onLoop();
        }
    }

}
