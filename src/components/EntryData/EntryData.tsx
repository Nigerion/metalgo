import React from "react";
import styles from "./EntryData.module.scss";
interface Props {
  name: string;
  email: string;
}

const EntryData = ({ name, email }: Props) => {
  return (
    <div className={styles.info}>
      <h1>Профиль</h1>
      <p>Имя: {name}</p>
      <p>Email: {email}</p>
      <h2>Записи:</h2>
    </div>
  );
};

export default EntryData;
