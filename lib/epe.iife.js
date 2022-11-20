var epe = (function (vue) {
  'use strict';

  /**
   * The inverse of `_.toPairs`; this method returns an object composed
   * from key-value `pairs`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} pairs The key-value pairs.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.fromPairs([['a', 1], ['b', 2]]);
   * // => { 'a': 1, 'b': 2 }
   */
  function fromPairs(pairs) {
    var index = -1,
        length = pairs == null ? 0 : pairs.length,
        result = {};

    while (++index < length) {
      var pair = pairs[index];
      result[pair[0]] = pair[1];
    }
    return result;
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */

  (process.env.NODE_ENV !== 'production')
      ? Object.freeze({})
      : {};
  (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isObject = (val) => val !== null && typeof val === 'object';

  const epPropKey = "__epPropKey";
  const isEpProp = (val) => isObject(val) && !!val[epPropKey];
  const buildProp = (prop, key) => {
    if (!isObject(prop) || isEpProp(prop))
      return prop;
    const { values, required, default: defaultValue, type, validator } = prop;
    const _validator = values || validator ? (val) => {
      let valid = false;
      let allowedValues = [];
      if (values) {
        allowedValues = Array.from(values);
        if (hasOwn(prop, "default")) {
          allowedValues.push(defaultValue);
        }
        valid || (valid = allowedValues.includes(val));
      }
      if (validator)
        valid || (valid = validator(val));
      if (!valid && allowedValues.length > 0) {
        const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
        vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
      }
      return valid;
    } : void 0;
    const epProp = {
      type,
      required: !!required,
      validator: _validator,
      [epPropKey]: true
    };
    if (hasOwn(prop, "default"))
      epProp.default = defaultValue;
    return epProp;
  };
  const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ]));

  const withInstall = (main, extra) => {
    main.install = (app) => {
      for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
        app.component(comp.name, comp);
      }
    };
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        main[key] = comp;
      }
    }
    return main;
  };

  const configProviderContextKey = Symbol();

  const rowContextKey = Symbol("rowContextKey");

  const globalConfig = vue.ref();
  function useGlobalConfig(key, defaultValue = void 0) {
    const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
    if (key) {
      return vue.computed(() => {
        var _a, _b;
        return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
      });
    } else {
      return config;
    }
  }

  const defaultNamespace = "el";
  const statePrefix = "is-";
  const _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`;
    if (blockSuffix) {
      cls += `-${blockSuffix}`;
    }
    if (element) {
      cls += `__${element}`;
    }
    if (modifier) {
      cls += `--${modifier}`;
    }
    return cls;
  };
  const useNamespace = (block) => {
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
    const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
    const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
    const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
    const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
    const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
    const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
    const is = (name, ...args) => {
      const state = args.length >= 1 ? args[0] : true;
      return name && state ? `${statePrefix}${name}` : "";
    };
    const cssVar = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarBlock = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${block}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarName = (name) => `--${namespace.value}-${name}`;
    const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
    return {
      namespace,
      b,
      e,
      m,
      be,
      em,
      bm,
      bem,
      is,
      cssVar,
      cssVarName,
      cssVarBlock,
      cssVarBlockName
    };
  };

  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  const RowJustify = [
    "start",
    "center",
    "end",
    "space-around",
    "space-between",
    "space-evenly"
  ];
  const RowAlign = ["top", "middle", "bottom"];
  const rowProps = buildProps({
    tag: {
      type: String,
      default: "div"
    },
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      values: RowJustify,
      default: "start"
    },
    align: {
      type: String,
      values: RowAlign,
      default: "top"
    }
  });

  const __default__$1 = vue.defineComponent({
    name: "ElRow"
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: rowProps,
    setup(__props) {
      const props = __props;
      const ns = useNamespace("row");
      const gutter = vue.computed(() => props.gutter);
      vue.provide(rowContextKey, {
        gutter
      });
      const style = vue.computed(() => {
        const styles = {};
        if (!props.gutter) {
          return styles;
        }
        styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
        return styles;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).is(`justify-${props.justify}`, _ctx.justify !== "start"),
            vue.unref(ns).is(`align-${props.align}`, _ctx.align !== "top")
          ]),
          style: vue.normalizeStyle(vue.unref(style))
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]);
      };
    }
  });
  var Row = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);

  const ElRow = withInstall(Row);

  const _hoisted_1 = {
    class: "filter-area"
  };
  const _hoisted_2 = {
    class: "filter-content"
  };
  const _hoisted_3 = {
    key: 0,
    class: "tool-func"
  };
  const _hoisted_4 = {
    key: 0,
    class: "divider"
  };
  const _hoisted_5 = {
    key: 1,
    class: "tool"
  };
  const __default__ = {
    name: 'ToolBar'
  };
  var script = /*#__PURE__*/vue.defineComponent({
    ...__default__,
    props: {
      divider: {
        type: Boolean,
        required: false,
        default: true
      },
      paddingSize: {
        type: String,
        required: false,
        default: ''
      },
      clearPadding: {
        type: Array,
        required: false,
        default: () => []
      },
      toolMaxWidth: {
        type: String,
        required: false,
        default: '150px'
      },
      border: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    setup(__props) {
      const {
        divider,
        paddingSize,
        clearPadding,
        border
      } = __props;
      const slots = vue.useSlots();
      const paddingDic = ['small', 'base', 'large']; // padding的枚举项
      const display = vue.ref('展开');
      const _display = () => {
        if (display.value === '展开') {
          display.value = '隐藏';
        } else {
          display.value = '展开';
        }
      };
      const styleComputed = () => {
        const styleObj = {};
        if (paddingSize && paddingDic.indexOf(paddingSize) < 0) {
          styleObj.padding = paddingSize;
          if (clearPadding !== null && clearPadding !== void 0 && clearPadding.length) {
            clearPadding.map(it => {
              styleObj['padding-' + it] = '0px';
            });
          }
        }
        return styleObj;
      };
      const classComputed = vue.computed(() => {
        const classArr = [];
        if (paddingSize && paddingDic.indexOf(paddingSize) >= 0) {
          classArr.push('padding-' + paddingSize);
          if (clearPadding !== null && clearPadding !== void 0 && clearPadding.length) {
            classArr.push(...clearPadding.map(it => 'padding-clear-' + it));
          }
        }
        if (border) {
          classArr.push('yl-tool-bar_border');
        }
        return classArr;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["yl-tool-bar", vue.unref(classComputed)]),
          style: styleComputed
        }, [vue.createElementVNode("div", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [vue.createVNode(vue.unref(ElRow), null, {
          default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "filter"), vue.unref(slots).more && display.value == '隐藏' ? vue.renderSlot(_ctx.$slots, "more", {
            key: 0
          }) : vue.createCommentVNode("v-if", true)]),
          _: 3 /* FORWARDED */
        })]), vue.unref(slots).tool || vue.unref(slots).more ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [vue.unref(slots).tool ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "tool-slot",
          style: vue.normalizeStyle({
            maxWidth: __props.toolMaxWidth
          })
        }, [vue.renderSlot(_ctx.$slots, "tool")], 4 /* STYLE */)) : vue.createCommentVNode("v-if", true), vue.unref(slots).more ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          onClick: _display,
          class: "display-btn"
        })) : vue.createCommentVNode("v-if", true)])) : vue.createCommentVNode("v-if", true)]), divider ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4)) : vue.createCommentVNode("v-if", true), vue.unref(slots).default ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [vue.renderSlot(_ctx.$slots, "default")])) : vue.createCommentVNode("v-if", true)], 2 /* CLASS */);
      };
    }
  });

  script.__file = "src/components/tool-bar/tool-bar.vue";

  const components = [script];
  const install = function (Vue) {
    components.map(component => {
      Vue.component(component.name, component);
    });
  };
  var index = {
    install,
    ToolBar: script
  };

  return index;

})(Vue);
