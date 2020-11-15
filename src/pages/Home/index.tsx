import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MenuContainer } from '../../features/MenuContainer';
import { RoutePath } from '../../routes/paths';
import { SearchBar } from './SearchBar';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (name: string) => {
    dispatch(push(`${RoutePath.SEARCH}?name=${name}`));
  };

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <SearchBar
          onSearch={handleSearch}
        />
      </div>
      <MenuContainer />
    </React.Fragment>
  );
};
