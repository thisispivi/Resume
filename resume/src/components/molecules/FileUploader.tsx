import type { ChangeEvent } from "react";

interface FileUploaderProps {
  label: string;
  hint: string;
  onFileSelect: (file: File | null) => void;
}

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
        className="file-uploader__input"
        type="file"
        accept=".json,application/json"
        onChange={handleChange}
      />
      <span className="file-uploader__hint">{hint}</span>
    </label>
  );
}

export default FileUploader;
