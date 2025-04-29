/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useEffect, useState, useId } from "react";
import { useSelectContext } from "./context/index";
import Chevron from '../../assets/icons/chevron.svg?react';
import Check from '../../assets/icons/check.svg?react';
import styles from "./select.module.css";

type SelectProps = {
  defaultText: string;
  defaultAll: string;
  optionsList: any[];
  multiselect?: boolean;
  disabled?: boolean;
  selectedOptions?: any[];
  style?: CSSProperties;
  onOptionSelect?: (selectedOption: any[] | any) => void;
};

function Select(props: SelectProps) {
  const selectId = useId(); // Generate unique ID for this select
  const { activeSelectId, setActiveSelectId } = useSelectContext();
  const {
    defaultText,
    optionsList,
    multiselect = false,
    selectedOptions = [],
    onOptionSelect,
    defaultAll,
    style,
    disabled,
  } = props;
  const [defaultSelectText, setDefaultSelectText] = useState(defaultText);
  const [selected, setSelected] = useState<any[]>(
    selectedOptions,
  );

  const isOpen = activeSelectId === selectId;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      e?.target instanceof HTMLElement &&
      !e?.target?.classList?.contains(styles.selectContainer) &&
      !e?.target?.classList?.contains(styles.selectOptions) &&
      !e?.target?.classList?.contains(styles.selectOption) &&
      !e?.target?.classList?.contains(styles.checkmark) &&
      !e?.target?.classList?.contains(styles.selectedText)
    ) {
      setActiveSelectId(null);
    }
  };

  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (selectedOptions.length === optionsList.length) {
      setDefaultSelectText(defaultAll);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListDisplay = () => {
    setActiveSelectId(isOpen ? null : selectId);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>, option: any) => {
    if (multiselect) {
      e.stopPropagation()
      const newSelected = [...selected];
      const optionIndex = newSelected.indexOf(option);
      if (optionIndex === -1) {
        newSelected.push(option);
      } else {
        newSelected.splice(optionIndex, 1);
      }
      setSelected(newSelected);
      if (newSelected.length > 0) {
        if (newSelected.length === optionsList.length) {
          setDefaultSelectText(defaultAll);
        } else {
          setDefaultSelectText(newSelected.map((opt) => opt).join(", "));
        }
      } else {
        setDefaultSelectText(defaultText);
      }
      if (onOptionSelect) {
        onOptionSelect(newSelected);
      }
    } else {
      setDefaultSelectText(option);
      setActiveSelectId(null);
      if (onOptionSelect) {
        onOptionSelect([option]);
      }
    }
  };

  return (
    <div
      className={`${styles.selectContainer} ${isOpen && styles.focused} ${disabled && styles.disabled}`}
      style={style}
      onClick={!disabled ? handleListDisplay : () => false}
    >
      <div
        className={`${styles.selectedText} ${isOpen && styles.selectedTextActive}`}
      >
        {defaultSelectText}
        <Chevron />
      </div>
      {isOpen && (
        <ul className={styles.selectOptions}>
          {optionsList.map((option) => {
            const isSelected = selected.some(
              (item: any) => item === option,
            );
            return (
              <li
                className={
                  styles.selectOption +
                  (isSelected ? " " + styles.active : "")
                }
                data-name={option}
                key={option}
                onClick={(e) => handleOptionClick(e, option)}
              >
                {multiselect && (<>
                  <input
                    onChange={(e) => {
                      handleOptionClick(e, option);
                    }}
                    type="checkbox"
                    checked={isSelected}
                  />
                  <span className={styles.checkmark} >
                    {isSelected && (<Check />)}
                  </span>
                </>)}
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Select;
