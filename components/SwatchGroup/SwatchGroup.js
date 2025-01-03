import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { findOptimizationType } from '../../utilities';
import Swatch from './Swatch';

const AnimationVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animateIn: {
    scale: [0, 0.75, 1],
    opacity: [0, 0.5, 1],
    // transition: { duration: 3 },
  },
  animateOut: {
    scale: [1, 0.9, 0],
    opacity: [1, 0.5, 0],
    transition: { when: 'afterChildren' },
  },
};

export default function SwatchGroupView(props) {
  if (!props.model) return null;

  const optimization = findOptimizationType(props.delegate.optimization);

  return (
    <Container>
      <Title>{props.model.semantic}</Title>
      <Main className="ScaleView">
        {props.model.swatches.map((model, index) => {
          const currentWeight = optimization?.values[index]?.weight;

          return (
            <AnimatePresence initial={false} mode="popLayout">
              {currentWeight && (
                <motion.div
                  layout
                  key={index}
                  initial={'initial'}
                  animate={'animateIn'}
                  variants={AnimationVariants}
                  // exit={'animateOut'}
                >
                  <Swatch model={model} delegate={props.delegate} />
                </motion.div>
              )}
            </AnimatePresence>
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
