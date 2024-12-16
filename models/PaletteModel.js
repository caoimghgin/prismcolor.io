import ColumnModel from "./ColumnModel";

export default class PaletteModel {

    columns = []

    constructor(args) {
        if (!Array.isArray(args)) return

        args.forEach((arg, index) => {
            this.columns.push(new ColumnModel(index, arg.semantic, arg.keys));
        })

        // window.addEventListener('EXPORT_DATA', (e) => {
        //     console.log(this.columns)
        // });

    }

}