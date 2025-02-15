import { usePaletteStore } from '../../store/usePaletteStore';
import EditMode from './Mode/Edit';
import ViewMode from './Mode/View';

export default function PaletteView() {
  const { model, delegate } = usePaletteStore();

  if (!model) return null;

  // Show edit mode when a scale is being edited
  if (delegate.editing) {
    return <EditMode />;
  }

  // Otherwise show view mode with all scales
  return <ViewMode />;
}
