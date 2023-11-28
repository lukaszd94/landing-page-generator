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

  generator: {
    pageTypes: [],
    themes: [],
    layouts: [],
    components: [],
    selectedPageType: null,
    selectedTheme: null,
    selectedLayout: null,
    selectedComponents: [],
    selectedTempPageComponent: null
  },
  setSelectedPageType: (pageType) => set((state) => ({ generator: { ...state.generator, selectedPageType: pageType } })),
  getPageTypes: async () => {
    // const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    // const pageComps = data.payload;

    set((state) => ({
      generator: {
        ...state.generator,
        pageTypes: [{
          id: 1,
          label: 'page type 1'
        }]
      }
    }))
  },
  setSelectedTheme: (theme) => set((state) => ({ generator: { ...state.generator, selectedTheme: theme } })),
  getThemes: async () => {
    // const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    // const pageComps = data.payload;

    set((state) => ({
      generator: {
        ...state.generator,
        themes: [{
          id: 1,
          label: 'theme 1'
        }]
      }
    }))
  },
  setSelectedLayout: (layout) => set((state) => ({ generator: { ...state.generator, selectedLayout: layout } })),
  getLayouts: async () => {
    // const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    // const pageComps = data.payload;

    set((state) => ({
      generator: {
        ...state.generator,
        layouts: [{
          id: 1,
          label: 'layout 1'
        }]
      }
    }))
  },
  setSelectedTempPageComponent: (tempPageComponent) => set((state) => ({ generator: { ...state.generator, selectedTempPageComponent: tempPageComponent } })),
  addTempPageComponentToPage: (tempPageComponent) => set((state) => ({
    generator: {
      ...state.generator,
      selectedComponents: [
        ...state.generator.selectedComponents,
        tempPageComponent
      ],
      selectedTempPageComponent: null
    }
  })),
  removeTempPageComponentToPage: (id) => set((state) => ({
    generator: {
      ...state.generator,
      selectedComponents: state.generator.selectedComponents.filter(item => item.id !== id)
    }
  })),
  getLayouts: async () => {
    // const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    // const pageComps = data.payload;

    set((state) => ({
      generator: {
        ...state.generator,
        layouts: [{
          id: 1,
          label: 'layout 1'
        }]
      }
    }))
  }
}))
