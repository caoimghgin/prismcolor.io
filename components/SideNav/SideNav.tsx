import styled from 'styled-components';
import EditMode from './Mode/Edit.js';
import ViewMode from './Mode/View.js';

interface Props {
  model: any;
  setModel: any;
  delegate: any;
  setDelegate: any;
}

export default function SideNav(props: Props) {
  const { model, setModel, delegate, setDelegate } = props;

  if (!props.delegate.editing) {
    return (
      <Wrapper>
        <ViewMode model={model} delegate={delegate} setDelegate={setDelegate} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <EditMode model={model} setModel={setModel} delegate={delegate} setDelegate={setDelegate} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 16px;
`;
