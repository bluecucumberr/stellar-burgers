import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { burgerConstructorActions } from '../../services/slice/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        burgerConstructorActions.moveIngredient({ from: index, to: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerConstructorActions.moveIngredient({ from: index, to: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(burgerConstructorActions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
