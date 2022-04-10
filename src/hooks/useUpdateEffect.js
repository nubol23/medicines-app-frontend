import {useEffect, useRef} from "react";

const UseUpdateEffect = (f, deps) => {
  const didRunFirstRender = useRef(false);

  useEffect(() => {
    if (didRunFirstRender.current) {
      f()
    }
    didRunFirstRender.current = true;
  }, deps);
};

export default UseUpdateEffect;