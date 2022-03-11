import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

// components
import Sidebar from '../components/Sidebar/Sidebar';

// views
import Dashboard from '../views/Dashboard';
import HeaderStats from '../components/Headers/HeaderStats';
import AdminNavbar from '../pages/Shared/Navbar/AdminNavbar';
import CreateQuestions from '../views/CreateQuestions';
import AnswerSheets from '../views/AnswerSheets';


const Admin = () => {
    return (
        <>
        <Sidebar />
        <div className="relative md:ml-64 bg-gray-100">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-20">
            <Switch>
              <Route path="/admin/dashboard" exact component={Dashboard} />
              <Route path="/admin/settings" exact component={CreateQuestions} />
              <Route path="/admin/tables" exact component={AnswerSheets} />
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </>
    );
};

export default Admin;