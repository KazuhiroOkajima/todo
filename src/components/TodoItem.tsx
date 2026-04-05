import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const PRIORITY_LABELS = { low: '低', medium: '中', high: '高' };

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function handleEditSubmit() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <li className={`todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-check"
      />
      <div className="todo-body">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="edit-input"
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => !todo.completed && setEditing(true)}
          >
            {todo.text}
          </span>
        )}
        <div className="todo-meta">
          <span className={`priority-badge priority-badge-${todo.priority}`}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className={`due-date ${overdue ? 'overdue-label' : ''}`}>
              {overdue ? '期限切れ: ' : '期限: '}{todo.dueDate}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        aria-label="削除"
      >
        ✕
      </button>
    </li>
  );
}
