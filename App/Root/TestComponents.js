var components = {
  'Components/SimpleListItem': require("../Components/SimpleListItem").default
};

var TestComponents = {
  find(name) {
    return components[name];
  }
};

export default TestComponents;
