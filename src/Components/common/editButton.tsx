import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-primary text-white px-4 py-2 rounded hover:bg-(--btn-hover-bg) transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
  >
    <FontAwesomeIcon icon={faPenToSquare} />
    Edit
  </button>
);

export default EditButton;
