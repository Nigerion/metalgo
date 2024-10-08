import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry } from "../service/slices/entriesSlice";
// import EntryForm from "../components/EntryForm/EntryForm";
import EntryList from "@/components/EntryList/EntryList";
import EntryData from "@/components/EntryData/EntryData";

const EntryForm = lazy(() => import("../components/EntryForm/EntryForm"));

type Data = {
  title: string;
  description: string;
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const entries = useSelector((state: any) => state.entries.entries);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  if (!userData) return <div>Загрузка...</div>;

  const handleAddEntry = (data: Data) => {
    const newRecord = {
      id: Date.now().toString(), // Уникальный ID для каждой записи
      ...data,
    };
    dispatch(addEntry(newRecord));
  };

  return (
    <div>
      <EntryData name={userData.name} email={userData.email}></EntryData>
      <EntryForm onSubmit={handleAddEntry} />
      <EntryList entries={entries}></EntryList>
    </div>
  );
};

export default Profile;
