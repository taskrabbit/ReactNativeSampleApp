import React from "react";
import invariant from 'invariant';
import _         from 'underscore';

const create = ({extensionName, requiredParams = {}, exports = {}, optionalParams, ...BaseLib}) => {
  invariant(
    extensionName,
    'extensionName required when defining an extension'
  );

  const Extension = (Component, params = {}) => {

    const componentName = Component.displayName || Component.name;
    const containerName = `${extensionName} (${componentName})`;

    _.pairs(requiredParams).forEach(([key, text]) => {
      invariant(
        params[key],
        `Extension params required ${containerName} ${key}: ${text}`
      );
    });

    var ComponentContainer = React.createClass(Object.assign(params, {
      mixins: [BaseLib],

      displayName: containerName,

      params: params,

      getInitialState() {
        return {};
      },

      originalComponent() {
        if (!this.refs._ExtensionComponent) { return null; }

        if (this.refs._ExtensionComponent.originalComponent) {
          return this.refs._ExtensionComponent.originalComponent();
        }
        return this.refs._ExtensionComponent;
      },

      // Implement getExtensionProps if you want to add more behavior passed to the Component
      // it will allow accessing in the Extended Component with this.props[ExtensionName]
      getExtensionProps() {
        return {
          [extensionName]: Object.assign({variables: this.getExportedVariables()}, this.getExportedMethods())
        }
      },

      getExportedVariables() {
        var _variables = {};
        (exports.variables || []).forEach((variableName) => _variables[variableName] = this.state[variableName]);

        return _variables;
      },

      getExportedMethods() {
        var _methods = {};
        (exports.methods || []).forEach((methodName) => _methods[methodName] = this[methodName]);

        return _methods;
      },

      renderComponent() {
        return (
          <Component
            {...this.props}
            {...this.getExtensionProps()}
            ref="_ExtensionComponent"
          />
        );
      },

      render() {
        if (this.renderExtension) {
          return this.renderExtension();
        }

        return this.renderComponent();
      },

    }));

    return ComponentContainer;
  };

  return Extension;
};

export {create};
