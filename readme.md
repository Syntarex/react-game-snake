# react-snakegame
Play snake with this simple to use typed react component.

## Installation
```
npm install react-snakegame --save
```

## Usage
```
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Context, SnakeGame } from "react-snakegame";

ReactDOM.render(
    <SnakeGame
        colors={{
            field: "#bdc3c7",
            food: "#9b59b6",
            snake: "#3498db",
        }}
        countOfHorizontalFields={20}
        countOfVerticalFields={20}
        fieldSize={20}
        loopTime={200}
        pauseAllowed={true}
        restartAllowed={true}
        onLoose={(context: Context) => alert(`You loosed with ${context.game.points} points.`)}
        onPause={(context: Context) => alert("paused")}
        onRestart={(context: Context) => alert("restarted")}
        onResume={(context: Context) => alert("onResume")}
        onWin={(context: Context) => alert(`You won with ${context.game.points} points.`)}
    />,
    document.getElementById("react"),
);
```

### Context
The context object gets passed to each event of the react component. This object allows you to manipulate the game entirely by just re-setting properties.

Example: Getting player's points
```
context.game.points
```

Example: Moving food to another position
```
context.food = { x: 1, y: 3 };
```

Example: Pausing the game
```
context.updateGame({ pause: true });
```

### Events
Each event gets the context passed as the first parameter.
| Name         	| Trigger                                                                           	|
|--------------	|-----------------------------------------------------------------------------------	|
| onLoose      	| The snake touches herself or one of the walls.                                    	|
| onWin        	| No space left to respawn new food.                                                	|
| onRestart    	| Player pressed R and restartAllowed = true.                               	|
| onPause      	| Player pressed P, pauseAllowed = true and context.game.pause = false. 	|
| onResume     	| Player pressed P, pauseAllowed = true and context.game.pause = true.  	|
| onLoopStart  	| Before the game recalculated the context and drawn anything.                      	|
| onLoopFinish 	| After the game recalculated the context and drawn everything.                     	|

### Options
| Name                    	| Type                                                  	|  Description                                                       	|
|-------------------------	|-------------------------------------------------------	|--------------------------------------------------------------------	|
| colors                  	| ```{ snake: string; food: string; field: string; }``` 	| Colors to draw the game in.                                        	|
| countOfHorizontalFields 	| number                                                	| Count of how many fields the snake can move horizontally.          	|
| countOfVerticalFields   	| number                                                	| Count of how many fields the snake can move vertically.            	|
| fieldSize               	| number                                                	| Width and height in px of each field.                              	|
| loopTime                	| number                                                	| The amount of time in ms it takes for the snake to move one field. 	|
| pauseAllowed            	| boolean                                               	| The player is allowed to pause the game.                           	|
| restartAllowed          	| boolean                                               	| The player is allowed to restart the game.                         	|

## Game
A simple game from the late 70s. Goal is it to eat as much food as you can. Touching yourself or the walls will end in a loose. The food will respawn after the snake ate it.

### Controls
You can control the snake by using **WASD** or the **arrow keys**. 

**P** will pause the game.

**R** will restart the game.