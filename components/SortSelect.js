import React from "react";
import styles from "../styles/SortSelect.module.css";

function SortSelect({ onChange }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className={styles.sortSelect}
    >
      <option value="">Trier par…</option>
      <option value="rating-desc">Note décroissante</option>
      <option value="rating-asc">Note croissante</option>
      <option value="title-asc">Titre A → Z</option>
    </select>
  );
}
export default SortSelect;
