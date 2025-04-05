import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        ({ id }) => id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (to < 0 || to >= state.ingredients.length) return;

      const movedItem = state.ingredients.splice(from, 1)[0];
      state.ingredients.splice(to, 0, movedItem);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
export const constructorSelectors = {
  getIngredients: (state: { 'burger-constructor': ConstructorState }) =>
    state['burger-constructor'].ingredients,
  getBun: (state: { 'burger-constructor': ConstructorState }) =>
    state['burger-constructor'].bun,
  getConstructorItems: (state: { 'burger-constructor': ConstructorState }) => ({
    bun: state['burger-constructor'].bun,
    ingredients: state['burger-constructor'].ingredients
  })
};
