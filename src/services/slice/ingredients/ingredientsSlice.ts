import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { fetchIngredients } from '../../thunks';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Произошла ошибка при загрузке игнредиентов';
      });
  }
});

export const ingredientsSelectors = {
  getIngredients: (state: RootState) => state.ingredients.ingredients,
  getIsLoading: (state: RootState) => state.ingredients.isLoading,
  getError: (state: RootState) => state.ingredients.error
};

// export const ingredientsActions = {
//   ...ingredientsSlice.actions,
//   fetchIngredients
// };

export default ingredientsSlice;
