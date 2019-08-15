import { Context } from "./Context";
import { Handler } from "./Handler";

export interface IInputEvents {
    onLeft: () => void;
    onUp: () => void;
    onRight: () => void;
    onDown: () => void;
    onPause: () => void;
    onRestart: () => void;
}

export class InputHandler extends Handler {

    constructor(
        context: Context,
        private events: IInputEvents,
    ) {
        super(context);
    }

    public startKeyboardInput() {
        document.onkeydown = this.onKeyboardPress.bind(this);
    }

    public stopKeyboardInput() {
        document.onkeydown = null;
    }

    private onKeyboardPress(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 65: /* A */
            case 37: /* Left */
                this.events.onLeft();
                break;
            case 87: /* W */
            case 38: /* Top */
                this.events.onUp();
                break;
            case 68: /* D */
            case 39: /* Right */
                this.events.onRight();
                break;
            case 83: /* S */
            case 40: /* Down */
                this.events.onDown();
                break;
            case 80: /* P */
                this.events.onPause();
                break;
            case 82: /* R */
                this.events.onRestart();
                break;
        }
    }

}
