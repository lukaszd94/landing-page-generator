import { create } from 'zustand';
import axios from 'axios';

export const usePageComponentsStore = create((set) => ({
  currentPageComponentId: null,
  currentPageComponent: {
    id: null,
    pageId: null,
    type: null,
    name: null,
    htmlCode: null,
    cssCode: null,
    jsCode: null,
    htmlVars: null,
    cssVars: null,
    jsVars: null
  },
  pageComponents: [],
  selectedPageComponent: null,

  setCurrentPageComponentId: (pageComponentId) => set((state) => ({ currentPageComponentId: pageComponentId })),
  setCurrentPageComponent: (pageComponent) => set((state) => ({ currentPageComponent: { ...state.currentPageComponent, ...pageComponent } })),
  setPageComponents: (pageComponents) => set((state) => ({ pageComponents: pageComponents })),
  setSelectedPageComponent: (selectedPageComponent) => set((state) => ({ selectedPageComponent: selectedPageComponent })),
  addNewToPageComponents: (newPageComponent) => set((state) => ({
    pageComponents: [...state.pageComponents, newPageComponent],
    selectedPageComponent: newPageComponent
  })),
  deleteFromPageComponents: (deletedPageComponentId) => set((state) => ({
    pageComponents: state.pageComponents.filter(item => item.id !== deletedPageComponentId),
    selectedPageComponent: null
  })),
  getPageComponents: async () => {
    const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    const pageComps = data.payload;

    set((state) => ({
      pageComponents: pageComps.map(pageComp => {
        return {
          id: pageComp.id,
          label: pageComp.name
        }
      }),
      selectedPageComponent: null
    }))
  },
}))
