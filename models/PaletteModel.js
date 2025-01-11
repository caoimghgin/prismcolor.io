import ScaleModel from "./ScaleModel";

export default class PaletteModel {

    scales = []

    constructor(props) {
        if (!Array.isArray(props)) return
        props.forEach((prop, index) => {
            const semantic = prop.semantic
            const keys = prop.keys
            const model = new ScaleModel(index, semantic, keys)
            this.scales.push(model);
        })
    }

}