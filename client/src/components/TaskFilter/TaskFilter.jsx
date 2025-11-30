import React from "react";
import "./TaskFilter.scss";

export default function TaskFilters({ search, setSearch, sortBy, setSortBy }) {
  return (
    <div className="TaskFilters">
      <input
        type="text"
        placeholder="Sort by..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">No sorting</option>
        <option value="title-asc">Name ↑</option>
        <option value="title-desc">Name ↓</option>
        <option value="priority-asc">Priority ↑</option>
        <option value="priority-desc">Priority ↓</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}
