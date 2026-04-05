import type { Filter } from '../types';

interface Props {
  filter: Filter;
  setFilter: (f: Filter) => void;
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export function FilterBar({ filter, setFilter, activeCount, hasCompleted, onClearCompleted }: Props) {
  return (
    <div className="filter-bar">
      <span className="active-count">{activeCount}件 残り</span>
      <div className="filter-buttons">
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'すべて' : f === 'active' ? '未完了' : '完了'}
          </button>
        ))}
      </div>
      {hasCompleted && (
        <button onClick={onClearCompleted} className="clear-btn">
          完了を削除
        </button>
      )}
    </div>
  );
}
