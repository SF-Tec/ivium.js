import styles from './ToggleSwitch.module.css';

type ToggleSwitchProps = {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

const ToggleSwitch = ({
  checked,
  disabled,
  label,
  onChange,
}: ToggleSwitchProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={styles.container}>
      <span className={styles['label-text']}>{label}</span>
      <div className={styles['toggle-switch']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name={label}
          id={label}
          checked={checked}
          disabled={disabled}
          onChange={handleCheckboxChange}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
