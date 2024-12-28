import ColumnModel from "./ColumnModel";

export default class PaletteModel {

    scales = []

    constructor(props) {
        if (!Array.isArray(props)) return
        props.forEach((prop, index) => {
            const semantic = prop.semantic
            const keys = prop.keys
            const model = new ColumnModel(index, semantic, keys)
            this.scales.push(model);
        })
    }

}