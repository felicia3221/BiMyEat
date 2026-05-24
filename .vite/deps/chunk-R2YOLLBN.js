import {
  useLayoutEffect2
} from "./chunk-MCK7C6VD.js";
import {
  require_react
} from "./chunk-OELA7GPI.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/.pnpm/@radix-ui+react-use-size@1._fb962cb49ac164b50bba04a6c471547b/node_modules/@radix-ui/react-use-size/dist/index.mjs
var React = __toESM(require_react(), 1);
function useSize(element) {
  const [size, setSize] = React.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}

// node_modules/.pnpm/@radix-ui+react-use-previou_5b2719c208b6c5a0ceb25ddb145cd0cc/node_modules/@radix-ui/react-use-previous/dist/index.mjs
var React2 = __toESM(require_react(), 1);
function usePrevious(value) {
  const ref = React2.useRef({ value, previous: value });
  return React2.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

export {
  useSize,
  usePrevious
};
//# sourceMappingURL=chunk-R2YOLLBN.js.map
