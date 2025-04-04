import { accessToken, refreshToken } from '../fixtures/token.json';
import { order } from '../fixtures/order.json';

const selectors = {
  ingredientList: '[data-cy=main] .common_button',
  bunList: '[data-cy=bun] .common_button',
  constructorItem: '.constructor-element__text',
  modal: '#modals div:first-child',
  closeModalIcon: 'div:first-child > button > svg',
  bunCard: '[data-cy=bun]',
  orderButton: 'main section:nth-child(2) .button',
  burgerConstructor: 'main section:last-child div'
};

const fillConstructor = () => {
  cy.get(selectors.bunList).eq(0).click();
  cy.get(selectors.ingredientList).eq(0).click();
};

beforeEach(() => {
  cy.intercept('GET', 'api/auth/token', { fixture: 'token.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  cy.setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  cy.visit('/');
});

afterEach(() => {
  cy.clearAllCookies();
  localStorage.removeItem('refreshToken');
});

describe('Burger constructor page', () => {
  describe('Constructor functionality', () => {
    it('allows building a burger from ingredients', () => {
      fillConstructor();

      cy.get(selectors.constructorItem).eq(0).should('contain', '(верх)');
      cy.get(selectors.constructorItem)
        .eq(1)
        .should('contain', 'Биокотлета из марсианской Магнолии');
      cy.get(selectors.constructorItem).eq(2).should('contain', '(низ)');
    });
  });

  describe('Ingredient modal behavior', () => {
    it('opens when ingredient card is clicked', () => {
      cy.get(selectors.bunCard).eq(0).click();
      cy.get(selectors.modal)
        .find('h3')
        .should('contain.text', 'Краторная булка N-200i');
    });

    it('closes modal by clicking close icon', () => {
      cy.get(selectors.bunCard).eq(0).click();
      cy.get(selectors.modal).first().find(selectors.closeModalIcon).click();
      cy.get(selectors.modal).should('not.exist');
    });

    it('closes modal when clicking overlay', () => {
      cy.get(selectors.bunCard).eq(0).click();
      cy.get(selectors.modal).as('modal-window');
      cy.get('@modal-window').find('div:nth-child(2)').as('overlay');
      cy.get('@overlay').click({ force: true });
      cy.get('modal-window').should('not.exist');
    });
  });

  describe('Order process', () => {
    it('creates an order and resets constructor', () => {
      fillConstructor();

      cy.get(selectors.orderButton).click();
      cy.get(selectors.modal)
        .first()
        .within(() => {
          cy.get('h2').should('contain.text', order.number);
          cy.get(selectors.closeModalIcon).click();
        });

      cy.get(selectors.modal).should('not.exist');

      cy.get(selectors.burgerConstructor)
        .eq(0)
        .should('contain', 'Выберите булки');
      cy.get(selectors.burgerConstructor)
        .eq(1)
        .should('contain', 'Выберите начинку');
      cy.get(selectors.burgerConstructor)
        .eq(2)
        .should('contain', 'Выберите булки');
    });
  });
});
