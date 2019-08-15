import * as React from "react";
import * as ReactDOM from "react-dom";

import { SnakeGame } from "../src/component/SnakeGame";
import { Context } from "../src/game/Context";

ReactDOM.render(
    <SnakeGame
        colors={{
            field: "#bdc3c7",
            food: "#9b59b6",
            snake: "#3498db",
        }}
        countOfHorizontalFields={50}
        countOfVerticalFields={25}
        fieldSize={20}
        loopTime={100}
        pauseAllowed={false}
        restartAllowed={false}
        onLoose={(context: Context) => alert(`You loosed with ${context.game.points} points.`)}
        onWin={(context: Context) => alert(`You won with ${context.game.points} points.`)}
    />,
    document.getElementById("react"),
);
