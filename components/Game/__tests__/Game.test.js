import Game from "..";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

test('Renders Components Nicely', () => {
    const tree = renderer.create(<Game></Game>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  