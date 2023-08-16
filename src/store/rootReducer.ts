import { combineReducers } from '@reduxjs/toolkit'
import categoriesSlice from 'src/slice/categoriesSlice'
import farmersSlice from 'src/slice/farmers'
import productSlice from 'src/slice/productSlice'

const rootReducer = combineReducers({
  farmerReducer: farmersSlice,
  categoriesReducer: categoriesSlice,
  productReducer: productSlice
})

export default rootReducer
