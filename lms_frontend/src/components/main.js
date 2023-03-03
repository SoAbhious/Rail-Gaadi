import Home from './home';
import Header from './header';
import Footer from './footer';
import About from './about';
import VerifyUser from './user/verifyUser';
import Login from './user/login';
import Register from './user/register';
import Dashboard from './user/dashboard';
import Passengers from './user/passengers';
// import UpdateDetails from './user/updatedetails';
import ChangePassword from './user/changepassword';
import UserBooking from './user/bookings';
import AdminLogin from './admin/login';
import AdminDashboard from './admin/dashboard';
// import AdminUsers from './admin/users';
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


function Main() {
    return (
      <div className="Main">
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/user-login' element={<Login/>} />
          <Route path='/user-register' element={<Register/>} />
          <Route path='/user-dashboard' element={<Dashboard/>} />
          <Route path='/user-passengers' element={<Passengers/>} />
          <Route path='/user-update-details' element={<UserUpdateDetails/>} />
          <Route path='/user-change-password' element={<ChangePassword/>} />
          <Route path='/user-bookings' element={<UserBooking/>} />
          <Route path='/admin-login' element={<AdminLogin/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>} />
          <Route path='/admin-update-details' element={<AdminUpdateDetails/>} />
          <Route path='/admin-change-password' element={<AdminChangePassword/>} />
          <Route path='/admin-manage-users' element={<AdminManage/>} />
          <Route path='/admin-logout' element={<AdminLogout/>} />
          <Route path='/user-logout' element={<UserLogout/>} />
          <Route path='/admin-bookings' element={<AdminBooking/>} />
          <Route path='/admin-bookings/:id' element={<AdminTicket/>} />
          <Route path='/admin-manage-trains' element={<AdminTrains/>} />
          <Route path='/verify-user/:id' element={<VerifyUser/>} />
          <Route path='/routes' element={<AdminRoutes/>} />
          <Route path='/add-routes' element={<AddRoutes/>} />
          <Route path='/bookTrain' element={<BookTrain/>} />
          <Route path='/book-ticket' element={<Ticket/>} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/printTicket' element={<PrintTicket/>} />
          <Route path='/train-report' element={<TrainReport/>} />
          <Route path='/admin-manage-stations' element={<Stations/>} />
        </Routes>
        {/* <Footer/> */}
      </div>
    );
  }
  
  export default Main;
  