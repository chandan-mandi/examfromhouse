import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.min.css";
// import "tailwindcss";

import Navbar from './pages/Shared/Navbar/Navbar';
import Home from './pages/Home/Home/Home';
import Contact from './pages/Shared/Contact/Contact';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login/Login';
import SignUp from './pages/Login/SignUp/SignUp';
import AuthProvider from './contexts/AuthProvider';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import FormTab from './pages/Dashboard/FormTab/FormTab';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import Exam from './pages/Dashboard/ExamForm/Exam/Exam';
import ExamForm from './pages/Dashboard/ExamForm/ExamForm/ExamForm';
import Success from './pages/Dashboard/ExamForm/Success/Success';
import QuestionForm from './pages/Dashboard/QuestionForm/QuestionForm/QuestionForm';
import ReuseQuestion from './pages/Dashboard/QuestionForm/ReuseQuestion/ReuseQuestion';
import Responses from './pages/Dashboard/Responses/Responses';
import Review from './pages/Dashboard/Review/Review';
import ViewProfile from './pages/ViewProfile/ViewProfile';
import MyResults from './pages/Dashboard/MyResults/MyResults';
import ViewResponse from './pages/Dashboard/ExamForm/ViewResponse/ViewResponse';
import { Toaster } from 'react-hot-toast';
import Admin from './layouts/Admin';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/features">
            <Features></Features>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/profile">
            <ViewProfile />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/questionSet/:quesId">
            <FormTab />
          </PrivateRoute>
          <PrivateRoute path="/form">
            <QuestionForm />
          </PrivateRoute>
          <PrivateRoute path="/exam">
            <Exam />
          </PrivateRoute>
          <PrivateRoute path="/myResults">
            <MyResults />
          </PrivateRoute>
          <PrivateRoute path="/examForm/:quesCode">
            <ExamForm></ExamForm>
          </PrivateRoute>
          <PrivateRoute path="/reuseQuestion/:questionId">
            <ReuseQuestion />
          </PrivateRoute>
          <PrivateRoute path="/review">
            <Review />
          </PrivateRoute>
          <PrivateRoute path="/success">
            <Success></Success>
          </PrivateRoute>
          <PrivateRoute path="/result/:id">
            <Responses />
          </PrivateRoute>
          <PrivateRoute path="/viewResponse/:resId">
            <ViewResponse />
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
