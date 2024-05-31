import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Notfound from '../Pages/Notfound';
import Footer from './Footer';
import Dashboard from '../Pages/Dashboard';
import Users from '../Pages/Users';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser';
import RequireAuth from '../AuthProtect/RequireAuth';
import PersistLogin from '../AuthProtect/PersistLogin';
import Products from '../Pages/Products';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import Cookies from 'universal-cookie';
export default function AuthLayout() {
        let cookie = new Cookies();

    return <>
        <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/register' element={cookie.get('Bearer') ? <Home/>:<SignUp/>}/>
            <Route path='/login' element={cookie.get('Bearer') ? <Home/>:<SignIn/>}/>
            {/* protected rotes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path='/dashboard' element={<Dashboard />} >
                        <Route path='users' element={<Users />} />
                        <Route path='users/:id' element={<UpdateUser />} />
                        <Route path='users/create' element={<CreateUser />} />
                        <Route path='products' element={<Products />} />
                        <Route path='products/:id' element={<UpdateProduct />} />
                        <Route path='Products/create' element={<CreateProduct />} />
                    </Route>
                </Route>
            </Route>


            <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />


    </>
}