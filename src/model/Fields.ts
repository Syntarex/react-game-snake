import { IFieldPosition } from "./FieldPosition";

export interface IField {
    content: Array<"snake" | "food">;
    position: IFieldPosition;
}

export interface IFields {
    [index: string]: IField;
}
