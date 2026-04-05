import { AddTodo } from './components/AddTodo';
import { TodoItem } from './components/TodoItem';
import { FilterBar } from './components/FilterBar';
import { useTodos } from './hooks/useTodos';
import './App.css';

export default function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    activeCount,
  } = useTodos();

  const hasCompleted = allTodos.some(t => t.completed);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo</h1>
        <p className="app-subtitle">ダブルクリックでタスクを編集</p>
      </header>

      <main className="app-main">
        <AddTodo onAdd={addTodo} />

        {allTodos.length > 0 && (
          <>
            <ul className="todo-list">
              {todos.length === 0 ? (
                <li className="empty-msg">該当するタスクはありません</li>
              ) : (
                todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                ))
              )}
            </ul>
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              hasCompleted={hasCompleted}
              onClearCompleted={clearCompleted}
            />
          </>
        )}

        {allTodos.length === 0 && (
          <div className="empty-state">
            <p>タスクを追加して始めましょう！</p>
          </div>
        )}
      </main>
    </div>
  );
}
