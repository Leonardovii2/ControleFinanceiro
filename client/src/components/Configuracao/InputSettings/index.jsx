import Button from "../../Button";
import styles from "./styles.module.css";

export default function InputSettings({
  label,
  value,
  type,
  onChange,
  onSubmit,
  placeholder,
  id,
  nameButton,
  nameLoading,
  disabled,
}) {
  return (
    <div className={styles.content}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={styles.input}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <Button
        onSubmit={onSubmit}
        buttonText={nameButton}
        loadingText={nameLoading}
        loading={disabled}
      />
    </div>
  );
}
