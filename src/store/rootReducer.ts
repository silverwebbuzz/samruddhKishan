import { combineReducers } from "@reduxjs/toolkit";
import brandSlice from "src/slice/brandsSlice";
import categoriesSlice from "src/slice/categoriesSlice";
import centersSlice from "src/slice/centerSlice";
import contentSectionSlice from "src/slice/contentSectionSlice";
import dashboardSlice from "src/slice/dashboardSlice";
import faqSlice from "src/slice/faqSlice";
import farmersSlice from "src/slice/farmers";
import footerSlice from "src/slice/footerSlice";
import inquirySlice from "src/slice/inquirySlice";
import landingPageSlice from "src/slice/landingPageSlice";
import pagesSlice from "src/slice/pagesSlice";
import productSectionSlice from "src/slice/productSectionSlice";
import productSlice from "src/slice/productSlice";
import servicesSlice from "src/slice/servicesSlice";
import settingsSlice from "src/slice/settingSlice";
import sliderSlice from "src/slice/sliderSlice";
import smallProductSlice from "src/slice/smallProductSlice";
import updateTestimonials from "src/slice/testimonialsSlice";

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
  faqReducer: faqSlice,
  testimonialsReducer: updateTestimonials,
  footerReducer: footerSlice,
  centersReducer: centersSlice,
  landingPageReducer: landingPageSlice,
  pagesReducer: pagesSlice,
});

export default rootReducer;
