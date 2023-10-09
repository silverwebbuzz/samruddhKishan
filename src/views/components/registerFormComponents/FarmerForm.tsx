import { ErrorMessage, Form, Formik } from "formik";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  createFarmer,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getSingleFarmer,
  updateFarmer,
  uploadImage,
} from "src/slice/farmers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import { DateType } from "src/types/forms/reactDatepickerTypes";
import moment from "moment";
import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
const FarmerForm = () => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (values?.appliedForSoilTesting === "yes" && file?.length > 0) {
          handleSubmit(values);
        } else if (values?.appliedForSoilTesting === "no") {
          handleSubmit(values);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
      }) => (
        <>
          <Form>
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Divider>
                <Chip
                  sx={{
                    fontSize: "22px",
                    padding: "15px",
                    fontWeight: "bold",
                    textAlign: "left",
                    backgroundColor: "#f6f5f8",
                  }}
                  label="Farmer Details"
                />
              </Divider>
            </Box>
            <Grid
              container
              spacing={6}
              sx={{
                padding: "10px",
              }}
            >
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="firstName"
                  error={Boolean(errors.firstName && touched.firstName)}
                  fullWidth
                  label="First Name *"
                  placeholder="First Name"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="firstName"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.middleName}
                  name="middleName"
                  error={Boolean(errors.middleName && touched.middleName)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Middle Name"
                  placeholder="Middle Name"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="middleName"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.lastName}
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.lastName && touched.lastName)}
                  fullWidth
                  label="Last Name *"
                  placeholder="Last Name"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="lastName"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.DOB}
                  name="DOB"
                  onChange={handleChange}
                  fullWidth
                  type="date"
                  label="Date of birth *"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0], // Set max to today's date
                  }}
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.aadharNumber}
                  name="aadharNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.aadharNumber && touched.aadharNumber)}
                  fullWidth
                  type="number"
                  label="Aadhar Number *"
                  placeholder="Aadhar Number"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="aadharNumber"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.mobileNumber}
                  name="mobileNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  error={Boolean(errors.mobileNumber && touched.mobileNumber)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Mobile Number *"
                  placeholder="Mobile Number"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="mobileNumber"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.wpNumber}
                  name="wpNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  error={Boolean(errors.wpNumber && touched.wpNumber)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Whatsapp Number *"
                  placeholder="Whatsapp Number"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="wpNumber"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.address}
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Address"
                  placeholder="Address"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "black",
                      "&.Mui-focused": {
                        color: "black", // Set the label color when focused
                      },
                    }}
                    id="demo-simple-select-label"
                  >
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="state"
                    value={values?.state}
                    label="State"
                    onChange={(e: any) => {
                      setFieldValue("state", e?.target?.value);
                      setSTATE(e?.target?.value);
                    }}
                    sx={{
                      "& .MuiSelect-root": {
                        borderWidth: "1px !important",
                        borderColor: "#8d8686 !important", // Set the desired color for the select
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black !important", // Set the desired border color for the select
                      },

                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px !important",
                        borderColor: "#8d8686 !important",
                      },
                      "&.Mui-error": {
                        color: "red", // Set the label color when the Select is in an error state
                      },
                    }}
                  >
                    {allState?.data?.map((name) => (
                      <MenuItem key={name?.name} value={name?.name}>
                        {name?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Tooltip title="Please select state first">
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "black", // Set the label color when focused
                        },
                      }}
                      id="demo-simple-select-label"
                    >
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="district"
                      disabled={STATE.length <= 0}
                      value={values?.district}
                      label="District"
                      onChange={handleChange}
                      sx={{
                        "& .MuiSelect-root": {
                          borderWidth: "1px !important",
                          borderColor: "#8d8686 !important", // Set the desired color for the select
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black !important", // Set the desired border color for the select
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px !important",
                          borderColor: "#8d8686 !important",
                        },
                        "&.Mui-error": {
                          color: "red", // Set the label color when the Select is in an error state
                        },
                      }}
                    >
                      {allDistrict?.map((name) => (
                        <MenuItem key={name?.name} value={name?.name}>
                          {name?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  value={pincode}
                  name="pinCode"
                  error={Boolean(errors.pinCode && touched.pinCode)}
                  onChange={(e) => {
                    handlePincode(e.target.value);
                    setFieldValue("pinCode", e.target.value);
                  }}
                  fullWidth
                  type="number"
                  label="Pin Code"
                  placeholder="Pin Code"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
                <ErrorMessage
                  name="pinCode"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Tooltip
                  title="Please enter pincode first"
                  disableFocusListener={!(pincode.length <= 0)}
                  disableHoverListener={!(pincode.length <= 0)}
                  disableTouchListener={!(pincode.length <= 0)}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "black", // Set the label color when focused
                        },
                      }}
                      id="demo-simple-select-label"
                    >
                      Taluka
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="taluka"
                      disabled={pincode?.length <= 0}
                      value={values?.taluka && values?.taluka}
                      label="Taluka"
                      onChange={handleChange}
                      noOptionsMessage={() => "No taluka Found"}
                      sx={{
                        "& .MuiSelect-root": {
                          borderWidth: "1px !important",
                          borderColor: "#8d8686 !important", // Set the desired color for the select
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black !important", // Set the desired border color for the select
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px !important",
                          borderColor: "#8d8686 !important",
                        },
                        "&.Mui-error": {
                          color: "red", // Set the label color when the Select is in an error state
                        },
                      }}
                    >
                      {getAddressByPinCodeData?.taluka &&
                        getAddressByPinCodeData?.taluka?.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Tooltip
                  title="Please enter pincode first"
                  disableFocusListener={!(pincode.length <= 0)}
                  disableHoverListener={!(pincode.length <= 0)}
                  disableTouchListener={!(pincode.length <= 0)}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "black", // Set the label color when focused
                        },
                      }}
                      id="demo-simple-select-label"
                    >
                      Village Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="villageName"
                      disabled={pincode.length <= 0}
                      value={values?.villageName && values?.villageName}
                      label="villageName"
                      onChange={handleChange}
                      sx={{
                        "&.Mui-error fieldset": {
                          borderColor: "red !important",
                        },
                        "& fieldset": {
                          borderWidth: "1px !important",
                          borderColor: "#8d8686 !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#7da370 !important",
                          borderWidth: "2px !important",
                        },
                        "& label.MuiInputLabel-root": {
                          color: "black", // Set the label font color to blue
                        },
                      }}
                    >
                      {getAddressByPinCodeData?.village?.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.religion}
                  name="religion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Religion"
                  placeholder="Religion"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "text.primary" }}
                >
                  Gender{" "}
                </Typography>
                <RadioGroup
                  row
                  value={values && values?.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio value="male" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio value="female" />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "text.primary" }}
                >
                  Marital Status
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  value={values?.maritalStatus && values?.maritalStatus}
                  name="maritalStatus"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="married"
                    control={<Radio />}
                    label="Married"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Divider>
                <Chip
                  sx={{
                    fontSize: "22px",
                    padding: "15px",
                    fontWeight: "bold",
                    textAlign: "left",
                    backgroundColor: "#f6f5f8",
                  }}
                  label="Land Details"
                />
              </Divider>
            </Box>

            <Grid
              container
              spacing={6}
              sx={{
                padding: "10px",
              }}
            >
              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.landDistrict}
                  name="landDistrict"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.landDistrict && touched.landDistrict)}
                  fullWidth
                  label="Land District"
                  placeholder="Land Distric"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.subDivision}
                  name="subDivision"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="SubDivision"
                  placeholder="SubDivision"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.circle}
                  name="circle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Circle"
                  placeholder="Circle"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  value={values?.landVillage}
                  name="landVillage"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Land Village"
                  placeholder="landVillage"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.mouza}
                  name="mouza"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Mouza"
                  placeholder="mouza"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.pattaType}
                  name="pattaType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="PattaType"
                  placeholder="PattaType"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.latNo}
                  name="latNo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="LatNo"
                  placeholder="LatNo"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.pattaNo}
                  name="pattaNo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="PattaNo"
                  placeholder="PattaNo"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "black",
                      "&.Mui-focused": {
                        color: "black", // Set the label color when focused
                      },
                    }}
                    shrink
                    htmlFor="auth-login-v2-password"
                  >
                    Land Area
                  </InputLabel>
                  <OutlinedInput
                    label="landArea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    notched
                    value={values?.landArea}
                    name="landArea"
                    type={"number"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Box
                          edge="end"
                          sx={{
                            color: "black",
                          }}
                        >
                          Sqft.
                        </Box>
                      </InputAdornment>
                    }
                    sx={{
                      "& fieldset": {
                        borderWidth: "1px !important",
                        borderColor: "#8d8686 !important",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#8d8686 !important",
                        borderWidth: "1px !important",
                      },
                      "& input": {
                        color: "black", // Set the desired text color for the input
                      },
                      "& label.MuiInputLabel-root": {
                        color: "black", // Set the label font color to blue
                      },
                      mb: 4,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.landType}
                  name="landType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Land Type"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                  placeholder="Land Type"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <TextField
                  value={values?.farmerLandOwnershipType}
                  name="farmerLandOwnershipType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  label="Farmer LandOwner Ship Type"
                  placeholder="Farmer LandOwner Ship Type"
                  sx={{
                    "&.Mui-error fieldset": {
                      borderColor: "red !important",
                    },
                    "& fieldset": {
                      borderWidth: "1px !important",
                      borderColor: "#8d8686 !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7da370 !important",
                      borderWidth: "2px !important",
                    },
                    "& label.MuiInputLabel-root": {
                      color: "black", // Set the label font color to blue
                    },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "text.primary" }}
                >
                  Upload Land Document
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  value={values?.appliedForSoilTesting}
                  name="appliedForSoilTesting"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              {values?.appliedForSoilTesting === "yes" ? (
                <>
                  <Grid item sm={6} xs={12}></Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "text.primary" }}
                    >
                      Upload Land Document
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <FilePreview file={fileForView} />

                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          "&:hover": {
                            backgroundColor: "#5E7954",
                          },
                        }}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFile(e)}
                        />
                      </Button>
                    </Box>
                    {values?.appliedForSoilTesting === "yes" ? (
                      file?.length <= 0 ? (
                        <div style={{ color: "red" }}>
                          {"Please select an image"}
                        </div>
                      ) : null
                    ) : null}
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Box
              sx={{
                padding: 5,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mr: 1,
                  "&:hover": {
                    backgroundColor: "#5E7954",
                  },
                }}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  router.back();
                }}
                variant="outlined"
                type="button"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FarmerForm;
