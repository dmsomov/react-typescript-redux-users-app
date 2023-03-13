import { Provider } from 'react-redux';

import { store } from './store';
import { Home } from './pages/home';

export const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
