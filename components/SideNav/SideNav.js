import styled from "styled-components";

import ViewMode from "./Mode/View.js"
import EditMode from "./Mode/Edit.js"

export default function SideNav(props) {
    const { model, setModel, delegate, setDelegate, mode, setMode } = props

    if (!props.delegate.editing) {
        return ( <Wrapper><ViewMode model={model} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode}/></Wrapper> )
    }
    return ( <Wrapper><EditMode model={model} setModel={setModel} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode}/></Wrapper> )

}

const Wrapper = styled.div`
flex-grow: 1;
padding: 16px;
`;