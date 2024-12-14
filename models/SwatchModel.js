import Color from 'colorjs.io';
import { luminanceToWeight } from "../utilities";
import { weights } from "../constants";

export default class SwatchModel {

    constructor(args) {

        const { color, destinationSpace, priority, isKey, isAnchor } = args

        this.color = this.normalizeColorToDestinationGamut(color, destinationSpace);
        this.value = { origin: color.to(color.space.id).toString(), destination: color.to(destinationSpace).toString(), hex: color.as("hex") }
        this.weight = luminanceToWeight(color.lab.l)
        this.index = weights.findIndex(item => item === this.weight);
        this.priority = (priority ? priority : 0)
        this.isKey = isKey;
        this.isAnchor = isAnchor;
        this.wcag_white = color.contrast(new Color("White"), "WCAG21")
        this.wcag_black = color.contrast(new Color("Black"), "WCAG21")
        this.apca_white = color.contrast(new Color("White"), "APCA")
        this.apca_black = color.contrast(new Color("Black"), "APCA")
        this.lab_d65_l = color.lab_d65.l
        this.hex = color.as("hex")
    }

    normalizeColorToDestinationGamut(color, destinationSpace) {
        if (destinationSpace === "srgb" && !color.inGamut(destinationSpace)) {
            const result = color.toGamut({space: "srgb"});
            return result
        }
        return color
    }

}
