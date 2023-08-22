import { combineReducers } from '@reduxjs/toolkit'
import brandSlice from 'src/slice/brandsSlice'
import categoriesSlice from 'src/slice/categoriesSlice'
import farmersSlice from 'src/slice/farmers'
import productSlice from 'src/slice/productSlice'
import servicesSlice from 'src/slice/servicesSlice'

const rootReducer = combineReducers({
  farmerReducer: farmersSlice,
  categoriesReducer: categoriesSlice,
  servicesReducer: servicesSlice,
  brandsReducer: brandSlice,
  productReducer: productSlice
})

export default rootReducer
