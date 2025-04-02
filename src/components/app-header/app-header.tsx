import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userSelectors } from '../../services/slice/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.getUserName);
  return <AppHeaderUI userName={userName} />;
};
