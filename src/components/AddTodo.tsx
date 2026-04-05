import { useState, type FormEvent } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
}

export function AddTodo({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, dueDate || undefined);
    setText('');
    setPriority('medium');
    setDueDate('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="add-row">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="add-input"
          autoFocus
        />
        <button type="submit" className="add-btn" disabled={!text.trim()}>
          追加
        </button>
      </div>
      <div className="add-options">
        <label className="option-label">
          優先度:
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
            className="priority-select"
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </label>
        <label className="option-label">
          期限:
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="date-input"
          />
        </label>
      </div>
    </form>
  );
}
