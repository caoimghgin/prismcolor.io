import { useState, useEffect } from "react";
import PaletteModel from "../models/PaletteModel"
import SwatchGroup from "../components/SwatchGroup/SwatchGroup"
import SideNav from "../components/SideNav/SideNav"
import styled from "styled-components";

export default function Create() {
    const [appDelegate, setAppDelegate] = useState({ displayContrast: "wcag21", displayValue: "ciel*d65" });
    const [data, setData] = useState<SemanticPaletteScale[]>();
    const [model, setModel] = useState<any>();

    useEffect(() => {
        setData([
            { index: 1, semantic: "primary", keys: ["#FF5308"] },
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

    return render(model, appDelegate, setAppDelegate)

}

const render = (model: any, delegate: any, setDelegate: any) => {
    if (!model) return
    return (
        <div>
            <NavBar />
            <Container>
                <Left>
                    <SideNav />
                </Left>
                <Main>
                    <PaletteViewStyle>
                        {model.columns.map((column: any, index: number) =>
                            <SwatchGroup key={index} model={column} delegate={delegate} variant={"BAR"} />
                        )}
                    </PaletteViewStyle>

                </Main>

            </Container>
        </div>
    )
}

const PaletteViewStyle = styled.div`
border:1px solid #e3e3e3;
border-radius: 8px;
margin:16px;
background: #ffffff;
`
const Left = styled.div`
  flex: 0 0 300px;
  border-right: 1px solid #e3e3e3;
  background: #f7f7f7;
`
const Main = styled.div`
  flex: 1;
  background: #f1f1f1;
`
const Container = styled.div`
  display: flex;
    `
const NavBar = styled.div`
  width: 100%;
  height: 56px;
  border-bottom:1px solid #e3e3e3;
  background: #ffffff;
`