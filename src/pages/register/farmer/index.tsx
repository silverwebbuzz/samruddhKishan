import React from "react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";

// ** Next Import

// ** MUI Components
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, BoxProps, styled } from "@mui/system";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormControlLabelProps,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";
import PageBanner from "src/views/components/landdingPage/pageBanner/PageBanner";

import {
  createFarmer,
  createUser1,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getRoleAndPermissions,
  uploadImage,
} from "src/slice/farmers";
import { getAllCategories } from "src/slice/categoriesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import { getLogoAPI } from "src/slice/settingSlice";
import FooterSection from "src/views/components/landdingPage/footerSection";
import moment from "moment";
import CentersForm from "src/views/components/registerFormComponents/CentersForm";
import ApmcForm from "src/views/components/registerFormComponents/ApmcForm";
import VendorForm from "src/views/components/registerFormComponents/VendorForm";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import CustomRadioImg from "src/@core/components/custom-radio/image";
import { CustomRadioImgData } from "src/@core/components/custom-radio/types";
import { getAllContent } from "src/slice/landingPageSlice";
const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");
  const [district, setDistrict] = useState("");
  const [rolePrefill, setRolePrefill] = useState("f1");
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0);
  const [taluka, setTaluka] = useState("");
  const [fileForView, setFileForView] = useState("");
  const [file, setFile] = useState("");
  const {
    getRoles,
    getAddressByPinCodeData,
    allDistrict,
    allState,
    deleteUser,
    updateUsers12,
    createUser12,
  } = useSelector((state: any) => state?.rootReducer?.farmerReducer);
  const { categories } = useSelector(
    (state: any) => state?.rootReducer?.categoriesReducer
  );
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );

  const { getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    mobileNumber: yup
      .string()
      .required("Mobile Number is required")
      .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid mobile number")
      .max(10, "Mobile number must be 10 digits"),
    wpNumber: yup
      .string()
      .required("Whatsapp Number is required")
      .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid whatsapp number")
      .max(10, "Whatsapp Number must be 10 digits"),
    aadharNumber: yup
      .string()
      .required("Aadhar number is required")
      .matches(/^\d{12}$/, "Please enter a valid aadhar number"),
  });

  const handleFarmerSubmit = (values: any) => {
    console.log("values", values);
    const payload = {
      adminId: 0,
      firstName: values?.firstName,
      middleName: values?.middleName,
      lastName: values?.lastName,
      // asPerAbove: values?.asPerAbove,
      dateOfBirth: moment(values?.DOB).format(),
      aadharNumber: values?.aadharNumber,
      mobileNumber: values?.mobileNumber,
      wpNumber: values?.wpNumber,
      address: values?.address,
      villageName: values?.villageName,
      taluka: values?.taluka,
      district: values?.district,
      state: values?.state,
      pinCode: pincode,
      caste: values?.caste,
      maritalStatus: values?.maritalStatus,
      gender: values?.gender,
      religion: values?.religion,
      landDistrict: values?.landDistrict,
      subDivision: values?.subDivision,
      circle: values?.circle,
      mouza: values?.mouza,
      landVillage: values?.landVillage,
      pattaType: values?.pattaType,
      latNo: values?.latNo,
      pattaNo: values?.pattaNo,
      landArea: values?.landArea,
      landType: values?.landType,
      farmerLandOwnershipType: values?.farmerLandOwnershipType,
      appliedForSoilTesting: "yes" ? 1 : 0,
      filename: fileForView?.name,
    };
    console.log("payload", payload);
    dispatch(createFarmer(payload)).then((res) => {
      if (res?.payload?.id) {
        let payload = {
          id: res?.payload?.id,
          file: file,
        };
        dispatch(uploadImage(payload));
        router.push("/");
      }
    });
  };

  const pincodeAutoCall = () => {
    let payload = {
      pincode: pincode ? pincode : "",
    };
    getAdressByPincode(payload);
  };
  useEffect(() => {
    if (pincode) {
      pincodeAutoCall();
    }
  }, [pincode]);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, pageSize: 10 }));
  }, []);
  useEffect(() => {
    dispatch(getAllState());
    dispatch(getLogoAPI());
    dispatch(getAllContent());

    dispatch(getRoleAndPermissions());
  }, []);
  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }));
  }, [STATE]);
  const ProfilePicture = styled("img")(({ theme }: any) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));
  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };
  const FilePreview = ({ file, onRemove }: any) => {
    if (isValidUrl(file)) {
      return (
        <Box>
          <ProfilePicture src={file} alt="profile-picture" />
        </Box>
      );
    } else {
      if (file?.type?.startsWith("image")) {
        return (
          <Box>
            <ProfilePicture
              src={URL.createObjectURL(file)}
              alt="profile-picture"
            />
          </Box>
        );
      } else {
        return (
          <Box>
            <ProfilePicture
              src={
                "/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg"
              }
              alt="profile-picture"
            />
          </Box>
        );
      }
    }
  };
  return (
    <Box
      style={{
        padding: "5%",
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <Card
        sx={{
          padding: "3%",
        }}
      >
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
              label="Farmers Registration"
            />
          </Divider>
        </Box>
        <Formik
          enableReinitialize
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            state: "",
            district: "",
            pinCode: "",
            taluka: "",
            villageName: "",
            role: "f1",
            middleName: "",
            asPerAbove: "",
            DOB: "",
            aadharNumber: "",
            mobileNumber: "",
            wpNumber: "",
            address: "",
            caste: "",
            maritalStatus: "married",
            gender: "male",
            religion: "",
            landDistrict: "",
            subDivision: "",
            circle: "",
            mouza: "",
            landVillage: "",
            pattaType: "",
            latNo: "",
            pattaNo: "",
            landArea: "",
            landType: "",
            farmerLandOwnershipType: "",
            appliedForSoilTesting: "yes",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values?.appliedForSoilTesting === "yes" && file?.length > 0) {
              handleFarmerSubmit(values);
            } else if (values?.appliedForSoilTesting === "no") {
              handleFarmerSubmit(values);
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
            <Form>
              <div
                style={{
                  padding: "10px",
                  marginLeft: "5px",
                }}
              >
                <Grid container xs={12} md={12} spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      error={Boolean(errors.firstName && touched.firstName)}
                      fullWidth
                      label="First Name *"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.middleName}
                      name="middleName"
                      error={Boolean(errors.middleName && touched.middleName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Middle Name"
                      placeholder="Middle Name"
                    />
                    <ErrorMessage
                      name="middleName"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.lastName}
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.lastName && touched.lastName)}
                      fullWidth
                      label="Last Name *"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
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
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.aadharNumber}
                      name="aadharNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.aadharNumber && touched.aadharNumber
                      )}
                      fullWidth
                      type="number"
                      label="Aadhar Number *"
                      placeholder="Aadhar Number"
                    />
                    <ErrorMessage
                      name="aadharNumber"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      error={Boolean(
                        errors.mobileNumber && touched.mobileNumber
                      )}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Mobile Number *"
                      placeholder="Mobile Number"
                    />
                    <ErrorMessage
                      name="mobileNumber"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
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
                    />
                    <ErrorMessage
                      name="wpNumber"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.address}
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Address"
                      placeholder="Address"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
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
                      >
                        {allState?.data?.map((name: any) => (
                          <MenuItem key={name?.name} value={name?.name}>
                            {name?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Tooltip title="Please select state first">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
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
                        >
                          {allDistrict?.map((name: any) => (
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
                      size="small"
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
                    />
                    <ErrorMessage
                      name="pinCode"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Tooltip
                      title="Please enter pincode first"
                      disableFocusListener={!(pincode.length <= 0)}
                      disableHoverListener={!(pincode.length <= 0)}
                      disableTouchListener={!(pincode.length <= 0)}
                    >
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
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
                        >
                          {getAddressByPinCodeData?.taluka &&
                            getAddressByPinCodeData?.taluka?.map(
                              (name: any) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              )
                            )}
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
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
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
                        >
                          {getAddressByPinCodeData?.village?.map(
                            (name: any) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.religion}
                      name="religion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Religion"
                      placeholder="Religion"
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                      }}
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
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                      }}
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
                      size="small"
                      value={values?.landDistrict}
                      name="landDistrict"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.landDistrict && touched.landDistrict
                      )}
                      fullWidth
                      label="Land District"
                      placeholder="Land Distric"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.subDivision}
                      name="subDivision"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="SubDivision"
                      placeholder="SubDivision"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.circle}
                      name="circle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Circle"
                      placeholder="Circle"
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      value={values?.landVillage}
                      name="landVillage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Land Village"
                      placeholder="landVillage"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.mouza}
                      name="mouza"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Mouza"
                      placeholder="mouza"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.pattaType}
                      name="pattaType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="PattaType"
                      placeholder="PattaType"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.latNo}
                      name="latNo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="LatNo"
                      placeholder="LatNo"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.pattaNo}
                      name="pattaNo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="PattaNo"
                      placeholder="PattaNo"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <FormControl fullWidth size="small">
                      <InputLabel shrink htmlFor="auth-login-v2-password">
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
                      size="small"
                      value={values?.landType}
                      name="landType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Land Type"
                      placeholder="Land Type"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      size="small"
                      value={values?.farmerLandOwnershipType}
                      name="farmerLandOwnershipType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Farmer LandOwner Ship Type"
                      placeholder="Farmer LandOwner Ship Type"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                      }}
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
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>

                  {values?.appliedForSoilTesting === "yes" ? (
                    <>
                      <Grid item sm={6} xs={12}></Grid>
                      <Grid item sm={6} xs={12}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: "text.primary",
                          }}
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
                              onChange={(e: any) =>
                                handleFile(e?.target?.files[0])
                              }
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
                  <Grid xs={12} md={12}>
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
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};
index.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

index.guestGuard = true;
export default index;
