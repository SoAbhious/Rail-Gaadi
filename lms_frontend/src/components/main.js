import Home from './home';
import Header from './header';
import Footer from './footer';
import About from './about';
import VerifyUser from './user/verifyUser';
import Login from './user/login';
import Register from './user/register';
import Dashboard from './user/dashboard';
import Passengers from './user/passengers';
import ChangePassword from './user/changepassword';
import UserBooking from './user/bookings';
import AdminLogin from './admin/login';
import AdminDashboard from './admin/dashboard';
import UserUpdateDetails from './user/updatedetails';
import AdminUpdateDetails from './admin/updatedetails';
import AdminChangePassword from './admin/changepassword';
import {Routes, Route, HashRouter} from 'react-router-dom'
import AdminManage from './admin/manage';
import AdminLogout from './admin/logout';
import UserLogout from './user/logout';
import AdminBooking from './admin/bookings';
import AdminTicket from './admin/ticket';
import AdminTrains from './admin/trains';
import AdminRoutes from './admin/routes';
import AddRoutes from './admin/AddRoute'
import BookTrain from './bookTrain';
import Ticket from './user/ticket';
import Payment from './user/payment';
import PrintTicket from './user/PrintTicket';
import TrainReport from './admin/trainReport';
import Stations from './admin/stations';
import ProtectedUser from './user/ProtectedUser';
import ProtectedAdmin from './admin/ProtectedAdmin';
import Protected from './Protected';
import PageNotFound from './PageNotFound';


function Main() {
    return (
      <div className="Main">
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/user-login' element={<Login/>} />
          <Route path='/user-register' element={<Register/>} />
          <Route path='/user-dashboard' element={<ProtectedUser Component={Dashboard}/>} />
          <Route path='/user-passengers' element={<ProtectedUser Component={Passengers}/>} />
          <Route path='/user-update-details' element={<ProtectedUser Component={UserUpdateDetails}/>} />
          <Route path='/user-change-password' element={<ProtectedUser Component={ChangePassword}/>} />
          <Route path='/user-bookings' element={<ProtectedUser Component={UserBooking}/>} />
          <Route path='/admin-login' element={<AdminLogin/>} />
          <Route path='/admin-dashboard' element={<ProtectedAdmin Component={AdminDashboard}/>} />
          <Route path='/admin-update-details' element={<ProtectedAdmin Component={AdminUpdateDetails}/>} />
          <Route path='/admin-change-password' element={<ProtectedAdmin Component={AdminChangePassword}/>} />
          <Route path='/admin-manage-users' element={<ProtectedAdmin Component={AdminManage}/>} />
          <Route path='/admin-logout' element={<AdminLogout/>} />
          <Route path='/user-logout' element={<UserLogout/>} />
          <Route path='/admin-bookings' element={<ProtectedAdmin Component={AdminBooking}/>} />
          <Route path='/admin-bookings/:id' element={<Protected Component={AdminTicket}/>} />
          <Route path='/admin-manage-trains' element={<ProtectedAdmin Component={AdminTrains}/>} />
          <Route path='/verify-user/:id' element={<VerifyUser/>} />
          <Route path='/routes' element={<ProtectedAdmin Component={AdminRoutes}/>} />
          <Route path='/add-routes' element={<ProtectedAdmin Component={AddRoutes}/>} />
          <Route path='/bookTrain' element={<ProtectedUser Component={BookTrain}/>} />
          <Route path='/book-ticket' element={<ProtectedUser Component={Ticket}/>} />
          <Route path='/payment' element={<ProtectedUser Component={Payment}/>} />
          <Route path='/printTicket' element={<Protected Component={PrintTicket}/>} />
          <Route path='/train-report' element={<ProtectedAdmin Component={TrainReport}/>} />
          <Route path='/admin-manage-stations' element={<ProtectedAdmin Component={Stations}/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
        {/* <Footer/> */}
      </div>
    );
  }
  
  export default Main;
  