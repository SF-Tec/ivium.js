import styles from './ToggleSwitch.module.css';

type ToggleSwitchProps = {
  checked: boolean;
  disabled: boolean;
  label: string;
  errorText?: string;
  onChange: (checked: boolean) => void;
};

const ToggleSwitch = ({
  checked,
  disabled,
  label,
  errorText,
  onChange,
}: ToggleSwitchProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles['toggle-and-label']}>
        <span className={styles['label-text']}>{label}</span>
        <div className={styles['toggle-switch']}>
          <input
            checked={checked}
            className={styles.checkbox}
            disabled={disabled}
            id={label}
            name={label}
            onChange={handleCheckboxChange}
            type="checkbox"
          />
          <label className={styles.label} htmlFor={label}>
            <span className={styles.inner} />
            <span className={styles.switch} />
          </label>
        </div>
      </div>
      {errorText && <span className={styles['error-text']}>{errorText}</span>}
    </div>
  );
};

export default ToggleSwitch;
