import { CgMathPlus } from "react-icons/cg";
import { FiExternalLink } from "react-icons/fi";

export default function PopupButton({ text, plus }) {
  return (
    <div className="my-8 rounded-lg shadow-xl p-4">
      <div>{text}</div>
      {plus ? <CgMathPlus /> : <FiExternalLink />}
    </div>
  );
}
