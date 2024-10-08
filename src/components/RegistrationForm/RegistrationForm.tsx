import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./RegistrationForm.module.scss";

interface IRegistrationFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationFormInputs>();
  const router = useRouter();

  const onSubmit = (data: IRegistrationFormInputs) => {
    localStorage.setItem("userData", JSON.stringify(data));
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>Авторизация</h1>
      <div className={styles.inputs}>
        <label className={styles.label}>Имя:</label>
        <input
          {...register("name", { required: true })}
          className={styles.input}
        />
        {errors.name && (
          <span className={styles.error}>Это поле обязательно</span>
        )}
      </div>
      <div className={styles.inputs}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={styles.input}
        />
        {errors.email && (
          <span className={styles.error}>Это поле обязательно</span>
        )}
      </div>
      <div className={styles.inputs}>
        <label className={styles.label}>Пароль:</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className={styles.input}
        />
        {errors.password && (
          <span className={styles.error}>
            Пароль должен содержать минимум 6 символов
          </span>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
