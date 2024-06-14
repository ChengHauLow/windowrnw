import { UserProvider } from './context/UserContext';
import { MenuProvider } from './context/MenuContext';
import { Provider} from 'react-redux';
import store from './store/Store';
import MainApp from './layout/MainApp';

function App(){
  return (
    <Provider store={store}>
      <MenuProvider>
        <UserProvider>
          <MainApp />
        </UserProvider>
      </MenuProvider>
    </Provider>
  );
}

export default App;
