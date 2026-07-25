interface ResumeHighlightsProps {
  items?: string[];
}

/** Bullet list of achievements rendered under an experience, project, or education entry. */
function ResumeHighlights({ items }: ResumeHighlightsProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="resume-highlights">
      {items.map((item, index) => (
        <li className="resume-highlights__item" key={`${item}-${String(index)}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ResumeHighlights;
