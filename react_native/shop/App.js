import React, {useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import ShopNavigator from './navigation/ShopNavigator';



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
      'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
    })
};

export default function App() {
  const [fetchedFonts, setFetchedFonts] = useState(false);

  if (!fetchedFonts) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFetchedFonts(true)} />
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}