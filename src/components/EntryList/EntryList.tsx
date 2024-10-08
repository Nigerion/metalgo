import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEntry, updateEntry } from "../../service/slices/entriesSlice";
import styles from "./EntryList.module.scss";
import EntryForm from "../EntryForm/EntryForm";
interface Entry {
  id: string;
  title: string;
  description: string;
}

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  const dispatch = useDispatch();
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteEntry(id));
  };
  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
  };
  const handleUpdateEntry = (data: { title: string; description: string }) => {
    if (editingEntry) {
      dispatch(updateEntry({ ...editingEntry, ...data }));
      setEditingEntry(null);
    }
  };
  return (
    <div className={styles.list}>
      <h2>Мои записи</h2>
      <ul>
        {entries.map((entrie) => (
          <li key={entrie.id}>
            <h3>{entrie.title}</h3>
            <p>{entrie.description}</p>
            <button
              onClick={() => handleEdit(entrie)}
              className={styles.button}
            >
              Редактировать
            </button>
            <button
              onClick={() => handleDelete(entrie.id)}
              className={styles.button}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      {editingEntry && (
        <div>
          <h2>Редактировать запись</h2>
          <EntryForm
            onSubmit={handleUpdateEntry}
            initialData={{
              title: editingEntry.title,
              description: editingEntry.description,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EntryList;
