import { combineReducers } from '@reduxjs/toolkit'
import brandSlice from 'src/slice/brandsSlice'
import categoriesSlice from 'src/slice/categoriesSlice'
import contentSectionSlice from 'src/slice/contentSectionSlice'
import dashboardSlice from 'src/slice/dashboardSlice'
import farmersSlice from 'src/slice/farmers'
import inquirySlice from 'src/slice/inquirySlice'
import landingPageSlice from 'src/slice/landingPageSlice'
import productSectionSlice from 'src/slice/productSectionSlice'
import productSlice from 'src/slice/productSlice'
import servicesSlice from 'src/slice/servicesSlice'
import settingsSlice from 'src/slice/settingSlice'
import sliderSlice from 'src/slice/sliderSlice'
import smallProductSlice from 'src/slice/smallProductSlice'

const rootReducer = combineReducers({
  farmerReducer: farmersSlice,
  categoriesReducer: categoriesSlice,
  servicesReducer: servicesSlice,
  brandsReducer: brandSlice,
  sliderReducer: sliderSlice,
  productReducer: productSlice,
  settingsReducer: settingsSlice,
  dashboardReducer: dashboardSlice,
  contentSectionReducer: contentSectionSlice,
  productSectionReducer: productSectionSlice,
  smallProductReducer: smallProductSlice,
  inquiryReducer: inquirySlice,

  landingPageReducer: landingPageSlice
})

export default rootReducer
