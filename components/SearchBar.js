import React from "react";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Rechercher un film…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.searchbar}
    />
  );
}
export default SearchBar;
