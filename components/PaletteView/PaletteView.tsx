import ModeView from "./Mode/View.js"
import ModeEdit from "./Mode/Edit.js"

export default function PaletteView(props: any) {
    if (!props) return
    const { model, delegate, mode } = props
    if (props.delegate.editing) return ( <ModeEdit model={model} mode={mode} delegate={delegate} /> )
    return ( <ModeView model={model} mode={mode} delegate={delegate} /> )
}