import { observable, action, makeObservable } from 'mobx';

class SidebarStore {
  @observable isSidebarOpen: boolean = false;

  @action
  toggleSidebar = () => {
    this.isSidebarOpen = !this.isSidebarOpen;
  };

  @action
  openSidebar = () => {
    this.isSidebarOpen = true;
  };

  @action
  closeSidebar = () => {
    this.isSidebarOpen = false;
  };

  constructor() {
    makeObservable(this);
  }
}

export default SidebarStore;
