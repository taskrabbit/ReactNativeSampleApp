var components = {
  'Components/SimpleListItem': require("../Components/SimpleListItem")
};

var TestComponents = {
  find(name) {
    return components[name];
  }
};

module.exports = TestComponents;
