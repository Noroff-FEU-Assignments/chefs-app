import { useRef, useEffect } from "react";

function ChangeHeadTitle(newTitle, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect( () => {
    document.title = newTitle;
  }, [newTitle]);

  useEffect( () => () => { 
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [])
}

export default ChangeHeadTitle;