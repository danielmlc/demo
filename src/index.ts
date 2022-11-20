import ToolBar from './components/tool-bar/tool-bar.vue';

const components = [
  ToolBar,
];

const install = function (Vue: any) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  ToolBar,
};
