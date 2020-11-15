import React, { useState } from 'react';
import { Button } from '../../components/core/Button';
import { Icons } from '../../components/core/icons/icons';
import { TextInput } from '../../components/core/TextInput';

interface ISearchBarProps {
  onSearch?: (name: string) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const [name, setName] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && props.onSearch) {
      props.onSearch(name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <TextInput
        className="flex-grow-1 mr-3"
        placeholder="Наименование блюда"
        value={name}
        onChange={setName}
      />
      <Button
        type="submit"
        text="Поиск"
        size="small"
        disableShadow={true}
        rightIcon={Icons.SEARCH}
      />
    </form>
  );
};
