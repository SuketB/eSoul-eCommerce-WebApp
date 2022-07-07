import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from './components/ui/Layout.js'
import CartScreen from './screens/CartScreen.js'
import Home from './screens/Home.js'
import LoginScreen from './screens/LoginScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import OrdersListScreen from './screens/OrdersListScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import ProductsListScreen from './screens/ProductsListScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import UsersListScreen from './screens/UsersListScreen.js'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route path='/home'>
          <Home></Home>
        </Route>
        <Route path='/products/:id'>
          <ProductScreen></ProductScreen>
        </Route>
        <Route path='/cart/:id?'>
          <CartScreen></CartScreen>
        </Route>
        <Route path='/login'>
          <LoginScreen></LoginScreen>
        </Route>
        <Route path='/register'>
          <RegisterScreen></RegisterScreen>
        </Route>
        <Route path='/profile'>
          <ProfileScreen></ProfileScreen>
        </Route>
        <Route path='/shipping'>
          <ShippingScreen></ShippingScreen>
        </Route>
        <Route path='/payment'>
          <PaymentScreen></PaymentScreen>
        </Route>
        <Route path='/place-order'>
          <PlaceOrderScreen></PlaceOrderScreen>
        </Route>
        <Route path='/orders/:id'>
          <OrderScreen></OrderScreen>
        </Route>
        <Route path='/admin/users' exact>
          <UsersListScreen></UsersListScreen>
        </Route>
        <Route path='/admin/users/:id/edit'>
          <UserEditScreen></UserEditScreen>
        </Route>
        <Route path='/admin/products' exact>
          <ProductsListScreen></ProductsListScreen>
        </Route>
        <Route path='/admin/products/:id/edit' exact>
          <ProductEditScreen></ProductEditScreen>
        </Route>
        <Route path='/admin/orders'>
          <OrdersListScreen></OrdersListScreen>
        </Route>
        <Route path='/search/:keyword' exact>
          <Home></Home>
        </Route>
        <Route path='/page/:pageNumber' exact>
          <Home></Home>
        </Route>
        <Route path='/search/:keyword/page/:pageNumber'>
          <Home></Home>
        </Route>
        <Route path='/admin/products/page/:pageNumber'>
          <ProductsListScreen></ProductsListScreen>
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
