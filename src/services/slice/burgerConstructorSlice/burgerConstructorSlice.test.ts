import reducer, {
  burgerConstructorActions,
  initialState
} from './burgerConstructorSlice';
import { bun, ingredient, ingredients } from '../mockData';

describe('burgerConstructorSlice reducer', () => {
  it('should correctly save bun into bun and not change ingredients', () => {
    const action = burgerConstructorActions.addIngredient(bun);
    const nextState = reducer(initialState, action);

    expect(nextState.bun).toMatchObject(bun);
    expect(nextState.ingredients).toEqual([]);
  });

  it('should correctly save ingredients into ingredients', () => {
    const action = burgerConstructorActions.addIngredient(ingredient);
    const nextState = reducer(initialState, action);

    expect(nextState.ingredients[0]).toMatchObject(ingredient);
    expect(nextState.ingredients).toHaveLength(1);
  });

  it('should correctly remove ingredient from ingredients', () => {
    const initialStateWithIngredients = {
      bun,
      ingredients: ingredients
    };
    const action = burgerConstructorActions.removeIngredient('fixed-id-1');

    const nextState = reducer(initialStateWithIngredients, action);

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients).toMatchObject([ingredients[1]]);
  });

  it('should correctly change the order of ingredients', () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [ingredients[0], ingredients[1]]
    };
    const action = burgerConstructorActions.moveIngredient({ from: 0, to: 1 });
    const nextState = reducer(initialStateWithIngredients, action);

    expect(nextState.ingredients[0]).toMatchObject(ingredients[1]);
    expect(nextState.ingredients[1]).toMatchObject(ingredients[0]);
  });

  it('should correctly clear state', () => {
    const initialStateWithIngredients = {
      bun,
      ingredients: ingredients
    };
    const action = burgerConstructorActions.clearConstructor();
    const nextState = reducer(initialStateWithIngredients, action);

    expect(nextState.bun).toEqual(null);
    expect(nextState.ingredients).toEqual([]);
  });
});
