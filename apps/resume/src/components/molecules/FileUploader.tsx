import type { ChangeEvent } from "react";

interface FileUploaderProps {
  label: string;
  hint: string;
  onFileSelect: (file: File | null) => void;
}

/** File input for uploading JSON resume data, with a label and hint text. */
function FileUploader({ label, hint, onFileSelect }: FileUploaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onFileSelect(file);
    event.target.value = "";
  };

  return (
    <label className="file-uploader">
      <span className="file-uploader__label">{label}</span>
      <input
        accept=".json,application/json"
        className="file-uploader__input"
        onChange={handleChange}
        type="file"
      />
      <span className="file-uploader__hint">{hint}</span>
    </label>
  );
}

export default FileUploader;
