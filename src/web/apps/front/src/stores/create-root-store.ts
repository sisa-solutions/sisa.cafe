import { reaction } from 'mobx';
import RootStore from './root-store';

type Props = {
  pathName: string;
};

const createRootStore = ({ pathName }: Props): RootStore => {
  const rootStore = new RootStore();

  reaction(
    () => rootStore.sidebarStore.isSidebarOpen,
    (value) => {
      document.documentElement.style.setProperty('--sisa-sidebar-open', value ? '1' : '0');
    }
  );

  return rootStore;
};

export default createRootStore;
