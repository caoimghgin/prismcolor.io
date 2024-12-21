import ModeView from "./Mode/View.js"
import EditView from "./Mode/Edit.js"

export default function SideNav(props) {
    const { model, delegate, setDelegate, mode, setMode } = props

    if (props.mode === "Palette") {
        return ( <ModeView model={model} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode}/> )
    } 
    return ( <EditView model={model} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode}/> )

}