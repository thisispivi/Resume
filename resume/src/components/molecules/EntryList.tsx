import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import type { EditableEntry } from "@/components/molecules/EntryFields";

interface EntryListProps<T extends EditableEntry> {
  entries: T[];
  onChange: (entries: T[]) => void;
  /** Blank entry appended by the add button. */
  emptyEntry: T;
  /** Collapsed label for an entry; falls back to a numbered placeholder when empty. */
  getHeader: (entry: T) => string;
  renderFields: (entry: T, onFieldChange: (key: string, value: unknown) => void) => ReactNode;
  addLabel: string;
  emptyMessage: string;
}

/**
 * Repeatable list of collapsible entries with add, remove, and reorder actions.
 *
 * Entries are keyed by index because resume entries carry no stable id; the
 * list is short and edits are local, so React's reconciliation stays correct.
 */
function EntryList<T extends EditableEntry>({
  addLabel,
  emptyEntry,
  emptyMessage,
  entries,
  getHeader,
  onChange,
  renderFields,
}: EntryListProps<T>) {
  const { t } = useTranslation();

  const handleAdd = () => {
    onChange([...entries, structuredClone(emptyEntry)]);
  };

  const handleRemove = (index: number) => {
    onChange(entries.filter((_, position) => position !== index));
  };

  const handleMove = (index: number, offset: number) => {
    const target = index + offset;
    if (target < 0 || target >= entries.length) return;
    const next = [...entries];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const handleFieldChange = (index: number, key: string, value: unknown) => {
    const next = [...entries];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  return (
    <div className="entry-list">
      {entries.length === 0 ? <p className="entry-list__empty">{emptyMessage}</p> : null}

      {entries.map((entry, index) => (
        <details className="entry-list__item" key={`entry-${String(index)}`} open={false}>
          <summary className="entry-list__summary">
            <ChevronDownIcon
              aria-hidden="true"
              className="entry-list__marker"
              height={6}
              width={10}
            />
            <span className="entry-list__title">
              {getHeader(entry) || `${addLabel} ${String(index + 1)}`}
            </span>
            <span className="entry-list__actions">
              <button
                aria-label={t("editor.moveUp")}
                className="entry-list__action"
                disabled={index === 0}
                onClick={(event) => {
                  event.preventDefault();
                  handleMove(index, -1);
                }}
                type="button"
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  className="entry-list__action-icon entry-list__action-icon--up"
                  height={6}
                  width={10}
                />
              </button>
              <button
                aria-label={t("editor.moveDown")}
                className="entry-list__action"
                disabled={index === entries.length - 1}
                onClick={(event) => {
                  event.preventDefault();
                  handleMove(index, 1);
                }}
                type="button"
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  className="entry-list__action-icon"
                  height={6}
                  width={10}
                />
              </button>
              <button
                aria-label={t("editor.remove")}
                className="entry-list__action entry-list__action--danger"
                onClick={(event) => {
                  event.preventDefault();
                  handleRemove(index);
                }}
                type="button"
              >
                <TrashIcon aria-hidden="true" height={13} width={13} />
              </button>
            </span>
          </summary>

          <div className="entry-list__body">
            {renderFields(entry, (key, value) => handleFieldChange(index, key, value))}
          </div>
        </details>
      ))}

      <button className="entry-list__add" onClick={handleAdd} type="button">
        + {addLabel}
      </button>
    </div>
  );
}

export default EntryList;
