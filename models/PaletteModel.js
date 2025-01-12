import ScaleModel from "./ScaleModel";

export default class PaletteModel {

    values = []

    constructor(props) {
        if (!Array.isArray(props)) return
        props.forEach((prop, index) => {
            const semantic = prop.semantic
            const keys = prop.keys
            const model = new ScaleModel(index, semantic, keys)
            this.values.push(model);
        })
    }

}