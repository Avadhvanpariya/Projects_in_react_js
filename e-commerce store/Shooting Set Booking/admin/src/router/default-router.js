import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'
// user
import UserProfile from '../views/dashboard/app/user-profile'
import UserAdd from '../views/dashboard/app/user-add'
import UserList from '../views/dashboard/app/user-list'
import UserUpdate from '../views/dashboard/app/user-profile'

//Admin
import AdminList from '../views/dashboard/admin/admin-list'
import AdminAdd from '../views/dashboard/admin/admin-add'
import AdminProfile from '../views/dashboard/admin/admin-profile'

//Order
import OrderUpdate from '../views/dashboard/order/order-profile'
import OrderAdd from '../views/dashboard/order/order-add'
import OrderList from '../views/dashboard/order/order-list'

//Booking
import BookingList from '../views/dashboard/booking/booking-list'
import BookingView from '../views/dashboard/booking/booking-view'
import BookingScan from '../views/dashboard/booking/scaning'
import RtlSupport from '../views/dashboard/special-pages/RtlSupport'

//admin
import Admin from '../views/dashboard/admin/admin'
import Default from '../layouts/dashboard/default'

//inquiry
import InquiryList from '../views/dashboard/inquiry/inquiry-list'
import InquiryView from '../views/dashboard/inquiry/inquiry-profile'

//Scanning List
import ScanningList from '../views/dashboard/scaningData/scanning-list'
import ScanningView from '../views/dashboard/scaningData/scanning-view'

//Picnic
import PicnicList from '../views/dashboard/picnic-order/picnic-order-list'
import PicnicView from '../views/dashboard/picnic-order/picnic-order-profile'
import PicnicAdd from '../views/dashboard/picnic-order/picnic-order-add'


export const DefaultRouter = [
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: 'dashboard',
        element: <Index />,
      },
      {
        path: 'dashboard/special-pages/rtl-support',
        element: <RtlSupport />,
      },
      {
        path: 'dashboard/user-profile',
        element: <UserProfile />,
      },
      {
        path: 'dashboard/user-add',
        element: <UserAdd />,
      },
      {
        path: 'dashboard/user-list',
        element: <UserList />,
      },
      {
        path: 'dashboard/user-update',
        element: <UserUpdate />,
      },
      {
        path: 'dashboard/admin-list',
        element: <AdminList />,
      },
      {
        path: 'dashboard/admin-add',
        element: <AdminAdd />,
      },
      {
        path: 'dashboard/admin-profile',
        element: <AdminProfile />,
      },
      {
        path: 'dashboard/admin',
        element: <Admin />,
      },
      {
        path: 'dashboard/order-list',
        element: <OrderList />,
      },
      {
        path: 'dashboard/order-add',
        element: <OrderAdd />,
      },
      {
        path: 'dashboard/order-update',
        element: <OrderUpdate />,
      },
      {
        path: 'dashboard/booking',
        element: <BookingList />,
      },
      {
        path: 'dashboard/booking-view',
        element: <BookingView />,
      },
      {
        path: 'dashboard/scanning-list',
        element: <ScanningList />,
      },
      {
        path: 'dashboard/scanning-view',
        element: <ScanningView />,
      },
      {
        path: 'dashboard/picnic-list',
        element: <PicnicList />,
      },
      {
        path: 'dashboard/picnic-view',
        element: <PicnicView />,
      },
      {
        path: 'dashboard/picnic-add',
        element: <PicnicAdd />,
      },
      {
        path: 'dashboard/scan',
        element: <BookingScan />,
      },
      {
        path: 'dashboard/inquiry-list',
        element: <InquiryList />,
      },
      {
        path: 'dashboard/inquiry-view',
        element: <InquiryView />,
      },
    ],
  },
]
