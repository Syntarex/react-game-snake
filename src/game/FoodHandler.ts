import { IField } from "../model/Fields";
import { generateRandomDecimalBetween } from "../utils/MathUtils";
import { Handler } from "./Handler";

export class FoodHandler extends Handler {

    public regenerate() {
        const { fields } = this.context;

        const emptyFields: IField[] = [];

        for (const key of Object.keys(fields)) {
            const field: IField = fields[key];

            if (field.content.length === 0) {
                emptyFields.push(field);
            }
        }

        if (emptyFields.length === 0) {
            throw new Error("There are no empty fields to generate food on.");
        }

        const randomEmptyField: IField = emptyFields[generateRandomDecimalBetween(
            0,
            emptyFields.length - 1,
        )];

        this.context.food = { ...randomEmptyField.position };
    }

}
