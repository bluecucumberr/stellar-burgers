import { fetchIngredients } from '../../thunks';
import { bun } from '../mockData';
import { ingredientsSlice, initialState } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  it('should set isLoading=true when fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  test('should save ingredients when fetchIngredients.fulfilled', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: bun
    });
    expect(nextState.ingredients).toEqual(bun);
    expect(nextState.isLoading).toBe(false);
  });

  it('should set error when fetchIngredients.rejected', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.rejected.type
    });
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Произошла ошибка при загрузке ингредиентов');
  });
});
