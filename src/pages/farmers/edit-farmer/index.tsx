//@ts-nocheck
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import {
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import moment from "moment";

// ** Icon Imports
import { ErrorMessage, Form, Formik } from "formik";
import Chip from "src/@core/components/mui/chip";
import {
  createFarmer,
  deleteFarmerImages,
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
import styled from "@emotion/styled";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
const ProfilePicture = styled("img")(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const FarmerDetails = () => {
  const { allDistrict, allState, getFarmer, getAddressByPinCodeData } =
    useSelector((state: any) => state?.rootReducer?.farmerReducer);
  const [STATE, setSTATE] = useState("");
  const [Taluka, setTaluka] = useState("");
  const [file, setFile] = useState("");
  const farmerData = JSON.parse(localStorage.getItem("FarmerData"));
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [villageName, setVillageName] = useState("");
  const [landDistrict, setLandDistrict] = useState("");
  const [url, setUrl] = useState("");
  const [fileForView, setFileForView] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const [newSelectedFiles, setNewSelectedFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);

  const initialValues = {
    firstName: getFarmer?.firstName,
    middleName: getFarmer?.middleName,
    lastName: getFarmer?.lastName,
    wpNumber: getFarmer?.wpNumber,
    DOB: moment(getFarmer && getFarmer?.dateOfBirth)
      .utc()
      .add(1, "day")
      .format("YYYY-MM-DD"),
    aadharNumber: getFarmer?.aadharNumber,
    mobileNumber: getFarmer?.mobileNumber,
    address: getFarmer?.address,
    villageName: getFarmer?.villageName,
    taluka: getFarmer?.taluka,
    district: getFarmer?.district,
    state: getFarmer?.state,
    pinCode: getFarmer?.pinCode,
    caste: getFarmer?.caste,
    maritalStatus: getFarmer?.maritalStatus,
    gender: getFarmer && getFarmer?.gender,
    religion: getFarmer?.religion,
    landDistrict: getFarmer?.landDistrict,
    subDivision: getFarmer?.subDivision,
    circle: getFarmer?.circle,
    mouza: getFarmer?.mouza,
    landVillage: getFarmer?.landVillage,
    pattaType: getFarmer?.pattaType,
    latNo: getFarmer?.latNo,
    pattaNo: getFarmer?.pattaNo,
    landArea: getFarmer?.landArea,
    landType: getFarmer?.landType,
    farmerLandOwnershipType: getFarmer?.farmerLandOwnershipType,
    appliedForSoilTesting:
      getFarmer?.appliedForSoilTesting === 1 ? "yes" : "no",
    maritalStatus: getFarmer?.maritalStatus,
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name  is required"),
    middleName: yup.string().required("Middle name is required"),
    lastName: yup.string().required("Last name is required"),
    pinCode: yup.string().matches(/^\d{6}$/, "Invalid PIN code"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      // .min(10)
      .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid mobile number"),
    wpNumber: yup
      .string()
      .required("Whatsapp number is required")
      // .min(10)
      .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid mobile number"),
    aadharNumber: yup
      .string()
      // .required('Aadhar number is required')
      .matches(
        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
        "please enter a valid aadhar number"
      ),
  });
  const handleSubmit = (values: any) => {
    const userData: any = JSON.parse(localStorage.getItem("userData"));
    const payload = [
      { firstName: values?.firstName },
      { middleName: values?.middleName },
      { lastName: values?.lastName },
      { dateOfBirth: moment(values?.DOB).format() },
      { aadharNumber: values?.aadharNumber },
      { mobileNumber: values?.mobileNumber },
      { wpNumber: values?.wpNumber },
      { address: values?.address },
      { villageName: villageName },
      { taluka: Taluka },
      { district: district },
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
      {
        appliedForSoilTesting: values?.appliedForSoilTesting === "yes" ? 1 : 0,
      },
    ];

    const formData = new FormData();
    newSelectedFiles.forEach((file, index) => {
      formData.append(`Document`, file);
    });
    payload.forEach((entry: any) => {
      //@ts-ignore
      const key = Object.keys(entry)[0];
      const value = entry[key];
      formData.append(key, value);
    });

    if (userData?.role === "admin") {
      formData.append("adminId", userData?.id);
      if (getFarmer?.id) {
        formData.append("id", getFarmer?.id);
        dispatch(updateFarmer(formData)).then(() => {
          let payloadForDeleteImages = {
            ids: removeFiles,
          };
          console.log("removeFiles", removeFiles);
          if (removeFiles?.length > 0) {
            dispatch(deleteFarmerImages(payloadForDeleteImages)).then((res) => {
              setSelectedFiles([]);
              setNewSelectedFiles([]);
              setRemoveFiles([]);
            });
          }
          router.push("/farmers");
        });
      }
    } else {
      formData.append("referralId", userData?.id);
      formData.append("referralName", userData?.role);
      if (getFarmer?.id) {
        formData.append("id", getFarmer?.id);
        dispatch(updateFarmer(formData)).then((res) => {
          let payloadForDeleteImages = {
            ids: removeFiles,
          };
          if (removeFiles?.length > 0) {
            dispatch(deleteFarmerImages(payloadForDeleteImages)).then((res) => {
              setSelectedFiles([]);
              setNewSelectedFiles([]);
              setRemoveFiles([]);
            });
          }
          router.push("/farmers");
        });
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Only allow selecting one file at a time
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
    setNewSelectedFiles((prevNewSelectedFiles) => [
      ...prevNewSelectedFiles,
      file,
    ]);
  };
  function isPDForImage(url) {
    const fileExtension = url.split(".").pop().toLowerCase();

    if (fileExtension === "pdf") {
      return true;
    } else if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension)) {
      return false;
    } else {
      return "Unknown"; // Handle other file types
    }
  }
  const ImagePreviewer = ({ file, index }) => {
    console.log("Image Previewer", file?.file);
    if (isValidUrl(file?.file?.file)) {
      if (isPDForImage(file?.file?.file)) {
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
              file={file?.file?.file}
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
                handleRemoveFile(file?.index, file?.file?.id);
              }}
            >
              <GridDeleteIcon />
            </IconButton>
          </div>
        );
      } else {
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
            {/* <Typography>{file.name}</Typography> */}
          </div>
        );
      }
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
                  console.log("index", index);
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
  const handleRemoveFile = (indexToRemove: any, id: any) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setRemoveFiles([...removeFiles, id]);
  };
  const handleRadio = (e: any) => {
    setGender(e);
  };
  const handlePincode = (e) => {
    setPincode(e);
    let payload = {
      pincode: e,
    };
    dispatch(getAdressByPincode(payload));
  };
  useEffect(() => {
    if (getFarmer) {
      handlePincode(getFarmer?.[0]?.pinCode);
    }
  }, [getFarmer?.[0]?.pinCode]);
  useEffect(() => {
    let payload = {
      id: farmerData,
    };
    dispatch(getAllState());
    dispatch(getSingleFarmer(payload));
  }, []);

  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }));
  }, [STATE]);
  useEffect(() => {
    if (getFarmer?.file) {
      setFileForView(getFarmer?.file);
      const file = getFarmer?.file;
      if (file && file?.length !== undefined) {
        setSelectedFiles([...file]);
      }
    }
  }, [getFarmer?.file]);

  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPincode(getFarmer?.pinCode);
      setSTATE(getFarmer?.state);
      setDistrict(getFarmer?.district);
      setTaluka(getFarmer?.taluka);
      setVillageName(getFarmer?.villageName);
      setLandDistrict(getFarmer?.landDistrict);
    }, 1000);
    setGender(getFarmer?.gender);
    setMaritalStatus(getFarmer?.maritalStatus);
    return () => clearTimeout(timer);
  }, [
    getFarmer?.state,
    getFarmer?.taluka,
    getFarmer?.pinCode,
    getFarmer?.landDistrict,
  ]);
  return (
    <>
      <Card
        sx={{
          padding: 10,
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
                      label="First Name"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.lastName}
                      name="lastName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.lastName && touched.lastName)}
                      fullWidth
                      label="Last Name"
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {/* <TextField
                      value={values?.DOB}
                      name='DOB'
                      onChange={handleChange}
                      fullWidth
                      type='date'
                      label='Date of birth *'
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0] // Set max to today's date
                      }}
                      sx={{
                        '&.Mui-error fieldset': {
                          borderColor: 'red !important'
                        },
                        '& fieldset': {
                          borderWidth: '1px !important',
                          borderColor: '#8d8686 !important'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#7da370 !important',
                          borderWidth: '2px !important'
                        },
                        '& label.MuiInputLabel-root': {
                          color: 'black' // Set the label font color to blue
                        }
                      }}
                    /> */}
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
                        // Additional attributes to ensure UTC handling
                        step: "1", // Set the step to 1 day
                        "data-timezone": "UTC", // Indicate the timezone
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.aadharNumber}
                      name="aadharNumber"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.aadharNumber && touched.aadharNumber
                      )}
                      fullWidth
                      label="Aadhar Number"
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
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
                      label="Mobile Number"
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                        value={STATE}
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
                          disabled={STATE?.length <= 0}
                          value={district}
                          label="district"
                          // onChange={handleChange}
                          onChange={(e) => {
                            setFieldValue("district", e?.target?.value);
                            setDistrict(e?.target?.value);
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={pincode}
                      error={Boolean(errors.pinCode && touched.pinCode)}
                      name="pinCode"
                      type="number"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handlePincode(e.target.value);
                        setFieldValue("pinCode", e.target.value);
                      }}
                      fullWidth
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
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Tooltip
                      title="Please enter pincode first"
                      disableFocusListener={!(pincode?.length <= 0)}
                      disableHoverListener={!(pincode?.length <= 0)}
                      disableTouchListener={!(pincode?.length <= 0)}
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
                          taluka
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="taluka"
                          disabled={pincode?.length <= 0}
                          value={Taluka}
                          label="taluka"
                          onChange={(e) => {
                            setFieldValue("taluka", e?.target?.value);
                            setTaluka(e?.target?.value);
                          }}
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
                          {getAddressByPinCodeData?.taluka?.map((name) => (
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
                      disableFocusListener={!(pincode?.length <= 0)}
                      disableHoverListener={!(pincode?.length <= 0)}
                      disableTouchListener={!(pincode?.length <= 0)}
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
                          disabled={pincode?.length <= 0}
                          value={villageName}
                          label="villageName"
                          // onChange={handleChange}
                          onChange={(e) => {
                            setFieldValue("villageName", e?.target?.value);
                            setVillageName(e?.target?.value);
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={gender}
                      name="gender"
                      onChange={(e) => {
                        handleRadio(e.target?.value);
                      }}
                    >
                      <FormControlLabel
                        value="male"
                        name="gender"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        name="gender"
                        control={<Radio />}
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
                      value={maritalStatus}
                      name="maritalStatus"
                      onChange={(e) => setMaritalStatus(e.target?.value)}
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio value="single" />}
                        label="Single"
                      />
                      <FormControlLabel
                        value="married"
                        control={<Radio value="married" />}
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
                      error={Boolean(
                        errors.landDistrict && touched.landDistrict
                      )}
                      fullWidth
                      label="Land District"
                      placeholder="Land Distric"
                      InputLabelProps={{
                        shrink: true,
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
                    {" "}
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    {" "}
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    <TextField
                      value={values?.landVillage}
                      name="landVillage"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={values?.pattaType}
                      name="pattaType"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  {/* <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      value={values?.latNo}
                      name="latNo"
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  </Grid> */}
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                    {/* <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.landArea}
                      name='landArea'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Area'
                      placeholder='Land Area'
                    /> */}
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
                        // sx={{ mb: 4 }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values?.landType}
                      name="landType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Land Type"
                      placeholder="Land Type"
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values?.farmerLandOwnershipType}
                      name="farmerLandOwnershipType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label="Farmer LandOwner Ship Type"
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
                      placeholder="Farmer LandOwner Ship Type"
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
                              <Button component="span">Select File</Button>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Grid>
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
      </Card>
    </>
  );
};

export default FarmerDetails;
