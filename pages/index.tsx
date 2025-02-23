import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Button, Group } from '@mantine/core';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
    </>
  );
}

function HeroSection() {
  const router = useRouter();
  return (
    <Background>
      <Container>
        <LeftSection>
          <Title>Say hello to PrismColor</Title>
          <Subtitle>The universal color palette creation tool for any design system</Subtitle>
          <Group justify="left" mt="xl">
            <Button onClick={() => router.push('/create')}>Create Your Palette</Button>
            <Button variant="default" onClick={() => router.push('/view')}>
              Learn More
            </Button>
          </Group>
        </LeftSection>
        <RightSection>
          <Image src="Images/HeroImage.png" alt="Landing Page Image" style={{ width: '600px' }} />
        </RightSection>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 640px;
  padding: 0 20px;
  background: radial-gradient(farthest-side at bottom left, #85e2f9, transparent 1000px),
    radial-gradient(farthest-corner at bottom right, rgba(112, 135, 251, 0.5), transparent 2000px);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftSection = styled.div`
  flex: 0.5;
  padding: 20px;
  width: 400px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    display: none;
  };
`;

const Title = styled.h1`
  font-size: 3.4rem;
  font-weight: 800;
  margin-block-start: 0em;
  margin-block-end: 14px;
  line-height: 1;
  width: 400px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.2;
  margin-block-start: 0em;
  margin-block-end: 18px;
  width: 350px;
  color: #666;
`;



const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;
