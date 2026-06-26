import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
export default function ImageUpload() {
  const inputRef = useRef(null);

  const openFilePicker = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div>
      {/* Upload Button */}
      <button onClick={openFilePicker}>
        <FaPlus />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}