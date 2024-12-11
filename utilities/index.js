import { targets } from "../constants";

export const hexToDecimal = (value) => {
    return eightBitToDecimal(hexToRgb(value))
}

export const eightBitToDecimal = (value) => {
    return value.map(item => item / 255)
}

export const decimalToEightBit = (value) => {
    return value.map(item => item * 255)
}

export const percentToEightBit = (value) => {
    return value.map(item => Math.round(item / 100 * 255))
}

export const rgbObject = (rgb) => {
    return { r: rgb[0], g: rgb[1], b: rgb[2] }
}

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

export const rgbToHex = (rgb) => {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

export const colorToHex = (color) => {
    return rgbToHex(percentToEightBit(toCoords(gamutMap(color, "srgb"))))
}

// Takes a the L* of CIEL*a*b* in D65
export const luminanceToWeight = (luminance) => {
    const value = luminanceToTarget(luminance)
    const result = String((100 - value) * 10).padStart(3, '0');
    return result === '1000' ? '999' : result;
};

export const luminanceToTarget = (luminance) => {
    return targets.reduce(function (prev, curr) {
        return (Math.abs(curr - luminance) < Math.abs(prev - luminance) ? curr : prev);
    });
}

export const gamutMap = (color, space) => {
    return color.clone().to(space).toString()
}

export const toCoords = (value) => {
    const result = value.replace(/[|&;$%@"<>()+,a-z]/g, "")
    return result.split(" ").map(item => parseFloat(item))
}

export const dpsConstrast = (a, b) => {
    return ((Math.abs(a ** 1.618 - b ** 1.618) ** 0.618) * 1.414 - 40).toFixed(2)
}