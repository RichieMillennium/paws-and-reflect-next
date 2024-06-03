import { useDispatch, useSelector, useStore } from 'react-redux';
import { TPawsDispatch, TPawsState, TPawsStore } from '../redux/store';

export const usePawsDispatch = useDispatch.withTypes<TPawsDispatch>();
export const usePawsSelector = useSelector.withTypes<TPawsState>();
export const usePawsStore = useStore.withTypes<TPawsStore>();
