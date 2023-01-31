import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('Card component', () => {
  it('renders correctly', () => {
    const id = 1;
    const name = 'dog1';
    const image = 'dog1.jpg';
    const temperaments = 'friendly';

    const history = createMemoryHistory();

    const { getByAltText, getByText } = render(
      <Router history={history}>
      <Card
        id={id}
        name={name}
        image={image}
        temperaments={temperaments}
      />
      </Router>
    );

    expect(getByAltText(name)).toBeInTheDocument();
    expect(getByText(temperaments)).toBeInTheDocument(); 
  });
});
