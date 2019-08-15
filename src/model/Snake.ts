import { Direction } from "./Direction";
import { IFieldPosition } from "./FieldPosition";

export interface ISnake {
    direction: Direction;
    parts: IFieldPosition[];
    ate: boolean;
}
