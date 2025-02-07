import ModeEdit from './Mode/Edit.js';
import ModeView from './Mode/View.js';

export default function PaletteView(props: any) {
  if (!props) return;
  const { model, delegate, mode } = props;
  if (props.delegate.editing) return <ModeEdit model={model} delegate={delegate} />;
  return <ModeView model={model} delegate={delegate} />;
}
