/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback, useEffect } from 'react';
import { useGetCompanyAsyncQuery } from '../../store/companies';
import styles from './styles.module.css';
import Button from '../../shared/Button';
import Checkbox from '../../shared/Checkbox';
import Trash from '../../assets/icons/trash.svg?react';
import Input from '../../shared/Input';
import Select from '../../shared/Select';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
]

const Example = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<unknown[]>(items);
  const token =  localStorage.getItem('token')
  const { refetch } = useGetCompanyAsyncQuery({ id: '12', auth: token });

  const toggleIsEnabled = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);

  const getCompanies = useCallback(() => {
    refetch();
  }, [refetch]);

  async function getAuth() {
    const response = await fetch('proxy/auth?user=USERNAME');
    const body = response.headers.get('Authorization')
    if (body) {
      localStorage.setItem('token', body);
    }
  }

  useEffect(() => {
    getAuth()
  }, [])

  const handleSelect = (value: any) => {
    setSelectedItems(value)
  }

  return (
    <div className={styles.container} style={{ maxWidth: '210px'}}>
      <Checkbox
        id="enabled"
        label="Enabled"
        checked={isEnabled}
        onChange={toggleIsEnabled}
      />
      <Select
        optionsList={items}
        // multiselect
        disabled={!isEnabled}
        onOptionSelect={handleSelect}
        selectedOptions={selectedItems}
        defaultAll={'All'}
        style={{ width: '210px' }}
        defaultText={'Select...'}
      />

      <Select
        optionsList={items}
        multiselect
        disabled={!isEnabled}
        onOptionSelect={handleSelect}
        selectedOptions={selectedItems}
        defaultAll={'All'}
        style={{ width: '210px' }}
        defaultText={'Select...'}
      />
      <Input
        label="Label"
        disabled={!isEnabled}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <Button
        disabled={!isEnabled}
        label="Label"
        variant="outlined"
        icon={<Trash/>}
        onClick={getCompanies}
      />
    </div>
  );
};

export default Example;
