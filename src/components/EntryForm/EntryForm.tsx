import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./EntryForm.module.scss";
interface EntryFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
}
type Data = {
  title: string;
  description: string;
};

const EntryForm: React.FC<EntryFormProps> = React.memo(
  ({ onSubmit, initialData }) => {
    const { register, handleSubmit, reset } = useForm<Data>();
    useEffect(() => {
      if (initialData) {
        reset(initialData);
      }
    }, [initialData, reset]);
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <label className={styles.label}>Название записи:</label>
          <input
            {...register("title", { required: true })}
            className={styles.input}
          />
        </div>
        <div className={styles.inputs}>
          <label className={styles.label}>Описание:</label>
          <textarea
            {...register("description", { required: true })}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          {initialData !== undefined ? "Обновить запись" : "Добавить запись"}
        </button>
      </form>
    );
  }
);

export default EntryForm;
