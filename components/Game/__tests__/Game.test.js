import Game from "../Game";
import { render } from '@testing-library/react';
import MyApp from '../../../pages/_app';
import renderer from 'react-test-renderer';

test('Renders Components Nicely', () => {
    const tree = renderer.create(<MyApp>
      <Game></Game>
      </MyApp>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  