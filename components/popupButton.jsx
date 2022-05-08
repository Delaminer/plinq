import { CgMathPlus } from "react-icons/cg";
import { FiExternalLink } from "react-icons/fi";

const buttonStyle = {
  boxShadow: '0px 0px 8px rgba(82, 60, 245, 0.15)',
  borderRadius: '8px'
}

export default function PopupButton({ text, plus, ...props }) {
  return (
    <div className="rounded-lg p-4 m-2 flex justify-between items-center cursor-pointer" style={buttonStyle} {...props}>
      <b className="text-base">{text}</b>
      {plus ? <CgMathPlus /> : <FiExternalLink />}
    </div>
  );
}
