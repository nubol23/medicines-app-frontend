import React, {useRef} from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const EditableElement = (props) => {
  const {onChange} = props;
  const element = useRef();

  let elements = React.Children.toArray(props.children);
  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }

  const onMouseUp = () => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  };

  useUpdateEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  }, []);

  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: onMouseUp
  });

  return elements;
};

export default EditableElement;