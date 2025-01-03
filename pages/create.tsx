import { useState, useEffect } from "react";
import PaletteModel from "../models/PaletteModel";
import SideNav from "../components/SideNav/SideNav";
import NavBar from "@/components/NavBar/NavBar";
import styled from "styled-components";
import PaletteView from "@/components/PaletteView/PaletteView";

export default function Create() {

    const [delegate, setDelegate] = useState({ optimization: "Universal", contrast: "CIE L* (d65)", editing: null });
    const [model, setModel] = useState<any>();
    const [mode, setMode] = useState("Palette");

    useEffect(() => {
        const data = [
            { index: 1, semantic: "primary", keys: ["oklch(52.95% 0.1609 244.63)"] },
            { index: 2, semantic: "secondary", keys: ["#867356", "#3a2f1e", "#cec6b9"] },
            { index: 3, semantic: "positive", keys: ["#007c00"] },
            { index: 4, semantic: "negative", keys: ["#d80000"] },
            { index: 5, semantic: "highlight", keys: ["#ffc107"] },
            { index: 6, semantic: "info", keys: ["#035ef9", "#d2e3ff", "#013391", "#0248c3",  "#91b9ff"] },
            { index: 7, semantic: "system", keys: ["#0A66D8"] },
            { index: 8, semantic: "neutral", keys: null },
        ]
        setModel(new PaletteModel(data))
    }, [])

    if (!model) return

    return (
        <>
            <NavBar model={model} delegate={delegate} /> 
            <Main>
               <Left>
                    <SideNav model={model} setModel={setModel} delegate={delegate} setDelegate={setDelegate} mode={mode} setMode={setMode} />
                </Left> 
                 <Right>
                    <PaletteView model={model} delegate={delegate} mode={mode} />
                </Right> 
            </Main>
        </>
    )
}

const Left = styled.div`
  flex: 0 0 280px;
  border-right: 1px solid #e3e3e3;
    background: #f7f7f7;
`

const Right = styled.div`
      background: #f1f1f1;

    flex-grow: 1;
`

const Main = styled.div`
  display: flex;
  height:100%
`
