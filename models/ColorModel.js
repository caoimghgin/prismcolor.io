import Color from 'colorjs.io';
import { colorToHex, percentToEightBit, toCoords, gamutMap, rgbObject } from '../utilities';

export default class ColorModel extends Color {

    constructor(...args) {
        super(...args);
        this.wcag_white = this.contrast(new Color("White"), "WCAG21")
        this.wcag_black = this.contrast(new Color("Black"), "WCAG21")
        this.apca_white = this.contrast(new Color("White"), "APCA")
        this.apca_black = this.contrast(new Color("Black"), "APCA")
    }

    as(space) {
        if (space === "hex") return colorToHex(this)
        if (space === 'srgb_8bit_array') return percentToEightBit(toCoords(gamutMap(this, "srgb")))
        if (space === 'srgb_8bit') return rgbObject(percentToEightBit(toCoords(gamutMap(this, "srgb"))))
        return this.clone().to(space).toString()
    }
}