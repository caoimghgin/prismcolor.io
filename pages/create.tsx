import { useState, useEffect } from "react";
import PaletteModel from "../models/PaletteModel";
import SideNav from "../components/SideNav/SideNav";
import NavBar from "@/components/NavBar/NavBar";
import styled from "styled-components";
import PaletteView from "@/components/PaletteView/PaletteView";

export default function Create() {

    const [delegate, setDelegate] = useState({ optimization: "Universal", contrast: "WCAG21" });
    const [data, setData] = useState<SemanticPaletteScale[]>();
    const [model, setModel] = useState<any>();
    const [mode, setMode] = useState("Palette");

    useEffect(() => {
        setData([
            { index: 1, semantic: "primary", keys: ["oklch(52.95% 0.1609 244.63)"] },
            { index: 2, semantic: "secondary", keys: ["#7b6747", "oklab(35.512% 0.00687 0.03516)"] },
            { index: 3, semantic: "positive", keys: ["#007c00"] },
            { index: 4, semantic: "negative", keys: ["#d80000"] },
            { index: 5, semantic: "highlight", keys: ["#ffc107"] },
            { index: 6, semantic: "info", keys: ["#035ef9"] },
            { index: 7, semantic: "system", keys: ["#0A66D8"] },
            { index: 8, semantic: "neutral", keys: null },
        ])
    }, [])

    useEffect(() => {
        if (!data) return
        setModel(new PaletteModel(data))
    }, [data])

    return render(model, delegate, setDelegate, mode, setMode)

}

const render = (model: any, delegate: any, setDelegate: any, mode: any, setMode: any) => {
    if (!model) return
    return (
        <Wrapper>
            <NavBar />
            <Main>
                <Left>
                    <SideNav model={model} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode}/>
                </Left>
                    <PaletteView model={model} delegate={delegate} mode={mode} />
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`

const Left = styled.div`
  flex: 0 0 280px;
  border-right: 1px solid #e3e3e3;
  background: #f1f1f1;

`

const Right = styled.div`
    background: #f7f7f7;


`

const Main = styled.div`
  display: flex;
  height:100%
`
