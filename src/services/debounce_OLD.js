import debounce from "lodash/debounce";
import { useEffect } from "react";

const useDebouncedEffect = (effect, deps, delay) => {
 useEffect(() => {
  const handler = debounce(() => effect(), delay);

  handler();

  return () => handler.cancel();
 }, [...(deps || []), delay]);
};

export default useDebouncedEffect;
