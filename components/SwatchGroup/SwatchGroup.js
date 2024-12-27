import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { optimizations } from '../../models/OptimizationModel.js';
import Swatch from './Swatch';

const AnimationVariants = {
  animateIn: {
    scale: 1,
    y: 0,
  },
  animateOut: {
    scale: 0,
    y: 50,
  },
  noAnimation: {},
};

export default function SwatchGroupView(props) {
  if (!props.model) return null;

  const optimization = optimizations.find((item) => item.name === props.delegate.optimization);

  // Ref to store the previous optimization object
  const previousOptimization = useRef(null);

  useEffect(() => {
    if (previousOptimization.current && previousOptimization.current.name !== optimization?.name) {
      console.log(
        'Optimization changed from',
        previousOptimization.current.name,
        'to',
        optimization?.name
      );
    }

    previousOptimization.current = optimization; // Update the ref after comparison
  }, [optimization]);

  return (
    <Container>
      <Title>{props.model.semantic}</Title>
      <Main className="ScaleView">
        {props.model.swatches.map((model, index) => {
          // Compare weights for the current index
          const previousWeight = previousOptimization.current?.values[index]?.weight;
          const currentWeight = optimization?.values[index]?.weight;

          // Determine the correct animation
          const animate = !previousOptimization.current
            ? AnimationVariants.noAnimation
            : previousWeight === undefined && currentWeight !== undefined
              ? AnimationVariants.animateIn
              : previousWeight !== undefined && currentWeight === undefined
                ? AnimationVariants.animateOut
                : AnimationVariants.noAnimation;

          return (
            <motion.div key={index} animate={animate} variants={AnimationVariants} custom={index}>
              <Swatch model={model} delegate={props.delegate} />
            </motion.div>
          );
        })}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  margin: 16px;
  display: flex;
`;

const Title = styled.div`
  flex: 0 0 100px;
  padding-top: 18px;
  font-weight: bold;
  font-size: 12px;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  background: white;
`;
