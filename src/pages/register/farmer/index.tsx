// @ts-nocheck
import React from "react";
import { ReactNode, useEffect, useState } from "react";

// ** MUI Components
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, BoxProps, styled } from "@mui/system";
import BlankLayout from "src/@core/layouts/BlankLayout";

import {
  Button,
  Card,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
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
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getRoleAndPermissions,
} from "src/slice/farmers";
import { getAllCategories } from "src/slice/categoriesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import { getLogoAPI } from "src/slice/settingSlice";
import FooterSection from "src/views/components/landdingPage/footerSection";
import moment from "moment";

import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";

import { getAllContent } from "src/slice/landingPageSlice";
import Topbar from "src/views/components/topbar";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [docMessage, setDocMessage] = useState("");
  const { getAddressByPinCodeData, allDistrict, allState } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
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
      .matches(/^\d{12}$/, "Please enter a valid aadhar number"),
    DOB: yup.string().required("Date of birth is required"),
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles([...selectedFiles, file]);
  };
  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };
  const ImagePreviewer = ({ file, index }) => {
    if (isValidUrl(file?.file?.file)) {
      return (
        <div key={index} style={{ padding: 15 }}>
          <img
            src={file?.file?.file}
            style={{
              objectFit: "contained",
              width: "100px",
              height: "100px",
              aspectRatio: "1",
            }}
            alt={`File ${file?.index}`}
            width="150px"
            height="auto"
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              // dlajks
              handleRemoveFile(file?.index, file?.file?.id);
            }}
          >
            <GridDeleteIcon />
          </IconButton>
        </div>
      );
    } else {
      if (
        file?.file?.type?.startsWith("image") ||
        file?.file?.type?.startsWith("application/pdf")
      ) {
        if (file?.file?.type?.startsWith("image")) {
          return (
            <div key={file?.index} style={{ padding: 15 }}>
              <img
                src={URL.createObjectURL(file?.file)}
                style={{
                  objectFit: "contained",
                  width: "100px",
                  height: "100px",
                  aspectRatio: "1",
                }}
                alt={`File ${file?.index}`}
                width="150px"
                height="auto"
              />
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                  handleRemoveFile(file?.index);
                }}
              >
                <GridDeleteIcon />
              </IconButton>
            </div>
          );
        } else {
          return (
            <div
              key={file?.index}
              style={{ padding: 15, display: "flex", flexDirection: "row" }}
            >
              <Document
                style={{
                  width: "100px",
                  height: "100px",
                  aspectRatio: "1",
                }}
                file={file?.file}
              >
                <Page pageNumber={1} />
              </Document>
              <IconButton
                aria-label="delete"
                color="error"
                sx={{
                  alignSelf: "end",
                }}
                onClick={() => {
                  handleRemoveFile(file?.index);
                }}
              >
                <GridDeleteIcon />
              </IconButton>
            </div>
          );
        }
      }
    }
  };
  const handleFarmerSubmit = (values: any) => {
    const payload = [
      { adminId: 0 },
      { firstName: values?.firstName },
      { middleName: values?.middleName },
      { lastName: values?.lastName },
      { dateOfBirth: moment(values?.DOB).format() },
      { aadharNumber: values?.aadharNumber },
      { mobileNumber: values?.mobileNumber },
      { wpNumber: values?.wpNumber },
      { address: values?.address },
      { villageName: values?.villageName },
      { taluka: values?.taluka },
      { district: values?.district },
      { state: values?.state },
      { pinCode: pincode },
      { caste: values?.caste },
      { maritalStatus: values?.maritalStatus },
      { gender: values?.gender },
      { religion: values?.religion },
      { landDistrict: values?.landDistrict },
      { subDivision: values?.subDivision },
      { circle: values?.circle },
      { mouza: values?.mouza },
      { landVillage: values?.landVillage },
      { pattaType: values?.pattaType },
      { latNo: values?.latNo },
      { pattaNo: values?.pattaNo },
      { landArea: values?.landArea },
      { landType: values?.landType },
      { farmerLandOwnershipType: values?.farmerLandOwnershipType },
      { appliedForSoilTesting: "yes" ? 1 : 0 },
    ];
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`Document`, file);
    });
    payload.forEach((entry: any) => {
      //@ts-ignore
      const key = Object.keys(entry)[0];
      const value = entry[key];
      formData.append(key, value);
    });
    dispatch(createFarmer(formData)).then((res) => {
      router.push("/");
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
  const handlePincode = (e: any) => {
    setPincode(e);
    let payload = {
      pincode: e,
    };
    dispatch(getAdressByPincode(payload));
  };
  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);
  useEffect(() => {
    if (selectedFiles.length > 0) {
      setDocMessage("");
    } else {
      setDocMessage("Please select documents");
    }
  }, [selectedFiles]);
  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        height={200}
        BGImg={"/images/logo/slider6.jpg"}
        bannerName="Farmer Registration"
        bannerContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
      />
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
              if (
                values?.appliedForSoilTesting === "yes" &&
                selectedFiles?.length > 0
              ) {
                setDocMessage("Please select documents");
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
                        error={Boolean(errors.DOB && touched.DOB)}
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
                      <ErrorMessage
                        name="DOB"
                        render={(msg) => (
                          <div style={{ color: "red" }}>{msg}</div>
                        )}
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
                    {/* <Grid item sm={6} xs={12}>
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
                    </Grid> */}
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
                      <Grid xs={12}>
                        <div
                          styele={{
                            border: "1px solid #e9e9ea",
                            padding: "10px",
                            borderRadius: "6px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              margin: " 60px 22px 0px 43px",
                              border: "1px solid #e9e9ea",
                            }}
                          >
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {selectedFiles.length > 0 ? (
                                selectedFiles?.map((file, index) => {
                                  return (
                                    <ImagePreviewer
                                      key={index}
                                      file={{ file: file, index: index }}
                                    />
                                  );
                                })
                              ) : (
                                <ProfilePicture
                                  src={
                                    "/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg"
                                  }
                                  alt="profile-picture"
                                />

                                // <Typography>No files selected.</Typography>
                              )}
                            </div>
                            <div>
                              <input
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                              />
                              <label htmlFor="file-input">
                                <Button
                                  //   variant='contained'
                                  component="span"
                                >
                                  Select File
                                </Button>
                              </label>
                            </div>
                          </div>
                        </div>
                        {
                          <p
                            style={{
                              marginLeft: "30px",
                              color: "red",
                            }}
                          >
                            {docMessage}
                          </p>
                        }
                      </Grid>
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
      <FooterSection
        DATA={getContentData}
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
      />
    </>
  );
};
index.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

index.guestGuard = true;
export default index;
