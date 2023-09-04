import { combineReducers } from '@reduxjs/toolkit'
import brandSlice from 'src/slice/brandsSlice'
import categoriesSlice from 'src/slice/categoriesSlice'
import dashboardSlice from 'src/slice/dashboardSlice'
import farmersSlice from 'src/slice/farmers'
import inquirySlice from 'src/slice/inquirySlice'
import productSlice from 'src/slice/productSlice'
import servicesSlice from 'src/slice/servicesSlice'
import settingsSlice from 'src/slice/settingSlice'

const rootReducer = combineReducers({
  farmerReducer: farmersSlice,
  categoriesReducer: categoriesSlice,
  servicesReducer: servicesSlice,
  brandsReducer: brandSlice,
  productReducer: productSlice,
  settingsReducer: settingsSlice,
  dashboardReducer: dashboardSlice,
  inquiryReducer: inquirySlice
})

export default rootReducer
