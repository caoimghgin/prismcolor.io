import styled from "styled-components"
import SwatchGroup from "../SwatchGroup/SwatchGroup"

export default function PaletteView(props: any) {
    if (!props) return
    return (
        <PaletteViewStyle>
            {props.model.columns.map((column: any, index: number) =>
                <SwatchGroup key={index} model={column} delegate={props.delegate} />
            )}
        </PaletteViewStyle>
    )
}

const PaletteViewStyle = styled.div`
border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
background: #ffffff;
`