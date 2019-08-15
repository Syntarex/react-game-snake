import { IContext } from "../model/Context";
import { Context } from "./Context";

export abstract class Handler {

    constructor(
        protected context: Context,
    ) {}

    public log(obj: any) {
        /* tslint:disable-next-line */
        console.log(obj);
    }

    public logContext() {
        this.log({ ...this.context });
    }

}
