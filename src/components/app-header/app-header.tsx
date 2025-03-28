import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slice/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.getUserName);
  return <AppHeaderUI userName={userName} />;
};
