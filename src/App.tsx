import { useState } from 'react' // useXXX -> React hooks
import './App.css'
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import ListUsers from './modules/User/ListUsers';
import ListRoles from './modules/Role/ListRoles';
import Dashboard from './modules/Doahboard/DashBoard';
import UserDetail from './modules/User/UserDetails';
import RoleDetail from './modules/Role/RoleDetail';
import Login from './components/Login';
import AccountDetail from './modules/Account/AccountDetail';

function App() {

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/account' element={<AccountDetail />} />
          <Route path="/users">
            <Route index element={<ListUsers />} />
            <Route path=":id" element={<UserDetail />} />
          </Route>
          <Route path="/roles">
            <Route index element={<ListRoles />} />
            <Route path=":id" element={<RoleDetail />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
