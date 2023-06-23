import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Input = ({ pHolder = "", text, id, type, _ref, valid, content, setContent, icons = false }) => {

  const [focus, setFocus] = useState(false);

  return (
    <div className="c_input">
      <label htmlFor={id}>
        {text}
        {
          valid && content && focus && icons ?
          <FontAwesomeIcon className="text-success" icon={faCheck} />
          :
          !valid && content && focus && icons ?
          <FontAwesomeIcon className="text-danger" icon={faXmark} />
              : null
        }
      </label>
      <input
        ref={_ref}
        type={type}
        className="form-input"
        id={id}
        aria-invalid={valid ? "false" : "true"}
        aria-describedby="confirmnote"
        placeholder={pHolder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default Input;