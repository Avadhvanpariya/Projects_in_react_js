import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'

import AdminProfile from '../views/dashboard/admin/admin-profile'


//Booking
import RtlSupport from '../views/dashboard/special-pages/RtlSupport'

//admin
import Default from '../layouts/dashboard/default'

//Admin
import AdminList from '../views/dashboard/admin/admin-list'
import AdminAdd from '../views/dashboard/admin/admin-add'
import AdminUpdate from '../views/dashboard/admin/admin-update'


//User
import UserAdd from '../views/dashboard/user/user-add'
import UserList from '../views/dashboard/user/user-list'
import UserUpdate from '../views/dashboard/user/user-update'
import OrderList from '../views/dashboard/order/orderlist'
import OrderView from '../views/dashboard/order/orderview'
import ProductList from '../views/dashboard/product/productlist'
import AddProduct from '../views/dashboard/product/product-add'
import ProductView from '../views/dashboard/product/Product-view'
import ProductUpdate from '../views/dashboard/product/Product-update'
import Analytics from '../views/dashboard/analytics/analytics'
import AbandonedCheckouts from '../views/dashboard/abandoned/abandoned-checkouts'
import AbandonedView from '../views/dashboard/abandoned/abandoned-view'
import Paymentlist from '../views/dashboard/payment-details/paymentlist'
import Paymentview from '../views/dashboard/payment-details/paymentview'

//Inquiry
import InquiryView from '../views/dashboard/inquiry/inquiry-view'
import InquiryList from '../views/dashboard/inquiry/inquiry-list'

//Video Book Data
import BookDataList from '../views/dashboard/video-call-book/videoBook-list'
import BookDataView from '../views/dashboard/video-call-book/data-view'


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
        path: 'dashboard/admin-profile',
        element: <AdminProfile />,
      },
      {
        path: 'admin',
        element: <AdminList />,
      },
      {
        path: 'admin/add-admin',
        element: <AdminAdd />,
      },
      {
        path: 'admin/update-admin',
        element: <AdminUpdate />,
      },
      {
        path: 'user',
        element: <UserList />,
      },
      {
        path: 'user/add-user',
        element: <UserAdd />,
      },
      {
        path: 'user/update-user',
        element: <UserUpdate />,
      },
      {
        path: 'order',
        element: <OrderList />,
      },
      {
        path: 'order/orderView',
        element: <OrderView />,
      },
      {
        path: 'product',
        element: <ProductList />,
      },
      {
        path: 'product/add-product',
        element: <AddProduct />,
      },
      {
        path: 'product/view-product',
        element: <ProductView />,
      },
      {
        path: 'product/update-product',
        element: <ProductUpdate />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'abandoned_checkouts',
        element: <AbandonedCheckouts />,
      },
      {
        path: 'abandoned/view',
        element: <AbandonedView />,
      },
      {
        path: 'paymentlist',
        element: <Paymentlist />,
      },
      {
        path: 'payment/payment-view',
        element: <Paymentview />,
      },
      {
        path: 'inquiry/list',
        element: <InquiryList />,
      },
      {
        path: 'inquiry/inquiry-view',
        element: <InquiryView />,
      },
      {
        path: 'video-book/list',
        element: <BookDataList />,
      },
      {
        path: 'video-book/view',
        element: <BookDataView />,
      },
    ],
  },
]
