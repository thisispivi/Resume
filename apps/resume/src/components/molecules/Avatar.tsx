import { useState } from "react";
import { getInitials } from "@/utils/resume";

interface AvatarProps {
  name: string;
  photo?: string;
  className?: string;
}

/** Displays a user photo or falls back to initials when the image is unavailable. */
function Avatar({ name, photo, className = "" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name);
  const showPhoto = Boolean(photo) && !hasError;

  return (
    <div className={`avatar ${className}`.trim()}>
      {showPhoto ? (
        <img alt={name} className="avatar__img" onError={() => setHasError(true)} src={photo} />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
}

export default Avatar;
