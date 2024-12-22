import Swatch from "./Swatch"
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimationVariants = {
    initial: {
        scale: 0.75,
        y: 50
    },
    animate: (index) => ({ 
        scale: 1,
        y: 0,
        transition: {
            duration: 0.05 * index,
            type: 'spring' 
        }
    })
}

export default function SwatchGroupView(props) {
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [props.delegate]);

    if (!props.model) return
    return (
        <Container>
            <Title>{props.model.semantic}</Title>
            <Main className="ScaleView">
                {props.model.swatches.map((model, index) => {
                    return (
                        <motion.div
                            key={`${key}-${index}`}
                            variants={AnimationVariants}
                            initial="initial"
                            animate="animate"
                            custom={index}
                        >
                            <Swatch model={model} delegate={props.delegate} />
                        </motion.div>
                    );
                })}
            </Main>
        </Container>
    )
}

const Container = styled.div`
    margin: 16px;
    display: flex;
    `

const Title = styled.div`
  flex: 0 0 100px;
    padding-top: 18px;
    font-weight: bold;
    font-size: 12px;
    `

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
    flex: 1;
    background: white;
    `