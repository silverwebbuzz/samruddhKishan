import { combineReducers } from '@reduxjs/toolkit'
import farmersSlice from 'src/slice/farmers'

const rootReducer = combineReducers({
  farmerReducer: farmersSlice
})

export default rootReducer
