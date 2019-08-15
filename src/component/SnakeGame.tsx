import * as React from "react";
import { Context } from "../game/Context";
import { GameLogic, IGameLogicEvents } from "../GameLogic";
import { IOptions } from "../model/Options";

interface ISnakeGameProps extends Partial<IGameLogicEvents>, IOptions { }

interface ISnakeGameState {
    canvas?: HTMLCanvasElement;
}

export class SnakeGame extends React.Component<ISnakeGameProps, {}> implements IGameLogicEvents {

    public state: ISnakeGameState = { };

    private gameLogic: GameLogic | null = null;

    public componentDidUpdate(prevProps: ISnakeGameProps, prevState: ISnakeGameState) {
        if (this.state.canvas && this.state.canvas !== prevState.canvas) {
            if (this.gameLogic) {
                this.gameLogic.stop();
            }

            this.gameLogic = new GameLogic(this.props, this.state.canvas, this);
            this.gameLogic.start();
        } else {
            if (this.gameLogic) {
                this.gameLogic.stop();
            }

            this.gameLogic = null;
        }
    }

    public render() {
        const {
            countOfHorizontalFields,
            countOfVerticalFields,
            fieldSize,
        } = this.props;

        const width: number = countOfHorizontalFields * fieldSize;
        const height: number = countOfVerticalFields * fieldSize;

        return (
            <canvas
                ref={(canvas: HTMLCanvasElement) => !this.state.canvas ? this.setState({ canvas }) : null}
                style={{
                    height,
                    width,
                }}
                width={width}
                height={height}
            />
        );
    }

    public onLoose(context: Context) {
        if (this.props.onLoose) {
            this.props.onLoose(context);
        }

        this.resetGame();
    }

    public onWin(context: Context) {
        if (this.props.onWin) {
            this.props.onWin(context);
        }

        this.resetGame();
    }

    public onRestart(context: Context) {
        if (this.props.onRestart) {
            this.props.onRestart(context);
        }

        this.resetGame();
    }

    public onPause(context: Context) {
        if (this.props.onPause) {
            this.props.onPause(context);
        }
    }

    public onResume(context: Context) {
        if (this.props.onResume) {
            this.props.onResume(context);
        }
    }

    public onLoopStart(context: Context) {
        if (this.props.onLoopStart) {
            this.props.onLoopStart(context);
        }
    }

    public onLoopFinish(context: Context) {
        if (this.props.onLoopFinish) {
            this.props.onLoopFinish(context);
        }
    }

    private resetGame() {
        if (this.gameLogic) {
            this.gameLogic.stop();
            this.gameLogic = null;
        }

        if (this.state.canvas) {
            this.gameLogic = new GameLogic(this.props, this.state.canvas, this);
            this.gameLogic.start();
        }
    }

}
