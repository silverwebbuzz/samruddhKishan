import { ReactNode, useEffect, useState } from "react";

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

// ** Styled Components
const RegisterIllustration = styled("img")(({ theme }) => ({
  zIndex: 2,

  height: "100%",
  width: "100%",
  opacity: 0.8,
  objectFit: "cover",
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));
const LoginIllustration = styled("img")(({ theme }) => ({
  zIndex: 2,
  height: "100%",
  width: "100%",

  opacity: 0.8,
  objectFit: "cover",
}));

const Register = () => {
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
  const { getFooterData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");
  const [district, setDistrict] = useState("");
  const [rolePrefill, setRolePrefill] = useState("f1");
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0);
  const [taluka, setTaluka] = useState("");
  const [fileForView, setFileForView] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const handlePincode = (e: any) => {
    setPincode(e);
    let payload = {
      pincode: e ? e : "",
    };
    dispatch(getAdressByPincode(payload));
  };

  const handleFile = (e: any) => {
    const file = e;
    setFileForView(e);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        const base64 = reader.result.split(",")[1];
        setFile(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    // Properties from initialValues (Normal User)
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
    roleId: "",
    centerName: "",
    centerRegisterUnderCompanyDate: "",
    centerKeyPerson: "",
    centerHandlingPersonName: "",
    centerTaluka: "",
    centerDistrict: "",
    centerTurnover: 0,
    centerMemberFarmer: 0,
    centerPerDayMilkCollection: 0,
    centerMilkStorageCapacity: 0,
    centerSellingMilkFor: "",
    centerOtherCompetitors: "",
    centerPaymentCycle: "",
    centerOtherFacltyByMilkAgency: "",
    centerFarmarPaymentProcess: "",
    centerMembersOnBoard: "",
    centerCurrentHurdeles: "",
    centerNeededFacultys: "",
    centerAllFinancialAudits: "",
    //
    apmcFirmName: "",
    apmcAddress: "",
    apmcName: "",
    apmcTaluka: "",
    apmcDistrict: "",
    apmcPersonName: "",
    apmcConnectedFarmers: 0,
    apmcMajorCropsSelling: "",
    districtFarmerComingSellProduct: "",
    vendorImage: "",
    // Properties from FarmerInitialValues (Farmer)
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
    dispatch(getRoleAndPermissions());
  }, []);
  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }));
  }, [STATE]);
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
  const handleSubmit = (values: any) => {
    if (rolePrefill !== "f1") {
      let Vendorspayload = [
        { firstName: values?.firstName || "" },
        { lastName: values?.lastName || "" },
        { email: values?.email || "" },
        { password: values?.password || "" },
        { phone: values?.phone || "" },
        { state: values?.state || "" },
        { city: district || "" },
        { taluka: taluka || "" },
        { pinCode: pincode || "" },
        { village: values?.villageName || "" },
        { roleId: rolePrefill || "" },
        { vendorImage: values?.vendorImage || "" },
        { categoryId: categoryIdPrefill || "" },
      ];
      let centersPayload = [
        { roleId: rolePrefill || "" },
        { state: values?.state || "" },
        { city: district || "" },
        { taluka: taluka || "" },
        { pinCode: pincode || "" },
        { email: values?.email || "" },
        { password: values?.password || "" },
        { phone: values?.phone || "" },
        { firstName: values?.firstName || "" },
        { lastName: values?.lastName || "" },
        { centerName: values?.centerName || "" },
        {
          centerRegisterUnderCompanyDate:
            values?.centerRegisterUnderCompanyDate || "",
        },
        { centerKeyPerson: values?.centerKeyPerson || "" },
        { centerHandlingPersonName: values?.centerHandlingPersonName || "" },
        { centerTaluka: values?.centerTaluka || "" },
        { centerDistrict: values?.centerDistrict || "" },
        { centerTurnover: values?.centerTurnover || 0 },
        { centerMemberFarmer: values?.centerMemberFarmer || 0 },
        { centerPerDayMilkCollection: values?.centerPerDayMilkCollection || 0 },
        { centerMilkStorageCapacity: values?.centerMilkStorageCapacity || 0 },
        { centerSellingMilkFor: values?.centerSellingMilkFor || "" },
        { centerOtherCompetitors: values?.centerOtherCompetitors || "" },
        { centerPaymentCycle: values?.centerPaymentCycle || "" },
        {
          centerOtherFacltyByMilkAgency:
            values?.centerOtherFacltyByMilkAgency || "",
        },
        {
          centerFarmarPaymentProcess: values?.centerFarmarPaymentProcess || "",
        },
        { centerMembersOnBoard: values?.centerMembersOnBoard || "" },
        { centerCurrentHurdeles: values?.centerCurrentHurdeles || "" },
        { centerNeededFacultys: values?.centerNeededFacultys || "" },
        { centerAllFinancialAudits: values?.centerAllFinancialAudits || "" },
      ];
      let apmcpayload = [
        { roleId: rolePrefill || "" },
        { state: values?.state || "" },
        { city: district || "" },
        { taluka: taluka || "" },
        { pinCode: pincode || "" },
        { email: values?.email || "" },
        { password: values?.password || "" },
        { phone: values?.phone || "" },
        { apmcFirmName: values?.apmcFirmName || "" },
        { apmcAddress: values?.apmcAddress || "" },
        { apmcName: values?.apmcName || "" },
        { apmcTaluka: values?.apmcTaluka || "" },
        { apmcDistrict: values?.apmcDistrict || "" },
        { apmcPersonName: values?.apmcPersonName || "" },
        { apmcConnectedFarmers: values?.apmcConnectedFarmers || 0 },
        { firstName: values?.firstName || "" },
        { lastName: values?.lastName || "" },
        { apmcMajorCropsSelling: values?.apmcMajorCropsSelling || "" },
        {
          districtFarmerComingSellProduct:
            values?.districtFarmerComingSellProduct || "",
        },
      ];
      if (rolePrefill == "17") {
        let payload = Vendorspayload;

        let formData = new FormData();
        payload.forEach((entry: any) => {
          //@ts-ignore
          const key = Object.keys(entry)[0]; // Extracting the key from the object
          const value = entry[key]; // Extracting the value from the object
          formData.append(key, value); // Appending the key-value pair to the formData
        });

        dispatch(createUser1(formData)).then((res: any) => {
          if (res?.payload?.status === 200) {
            router.push("/users");
          }
        });
      } else if (rolePrefill == "13") {
        let payload = centersPayload;

        let formData = new FormData();
        payload.forEach((entry: any) => {
          //@ts-ignore
          const key = Object.keys(entry)[0]; // Extracting the key from the object
          const value = entry[key]; // Extracting the value from the object
          formData.append(key, value); // Appending the key-value pair to the formData
        });

        dispatch(createUser1(formData)).then((res: any) => {
          if (res?.payload?.status === 200) {
            router.push("/users");
          }
        });
      } else if (rolePrefill == "10") {
        let payload = apmcpayload;

        let formData = new FormData();
        payload.forEach((entry: any) => {
          //@ts-ignore
          const key = Object.keys(entry)[0]; // Extracting the key from the object
          const value = entry[key]; // Extracting the value from the object
          formData.append(key, value); // Appending the key-value pair to the formData
        });

        dispatch(createUser1(formData)).then((res: any) => {
          if (res?.payload?.status === 200) {
            router.push("/users");
          }
        });
      }
    } else {
      if (values?.appliedForSoilTesting === "yes" && file?.length > 0) {
        handleFarmerSubmit(values);
      } else if (values?.appliedForSoilTesting === "no") {
        handleFarmerSubmit(values);
      }
    }
  };

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
  const filterRoles = (roles: any) => {
    let uniq = roles.filter(
      (ITM: any) => ITM.id == 10 || ITM.id == 13 || ITM.id == 17
    );
    return uniq;
  };

  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);

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

  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        height={200}
        BGImg={"/images/logo/slider6.jpg"}
        bannerName="User Registration"
        bannerContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
      />
      <section
        className="home-contact"
        style={{
          padding: "0",
        }}
      >
        <Box
          style={{
            padding: "5%",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          <Card>
            <>
              <Box
                sx={{
                  margin: 10,
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
                      label="User Registration"
                    />
                  </Divider>
                </Box>
                <Grid
                  container
                  // spacing={6}
                  sx={{
                    padding: "10px",
                  }}
                >
                  <Grid item sm={12} xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        User type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={rolePrefill}
                        // error={Boolean(errors.role && touched.role)}
                        label="User type"
                        onChange={(e) => {
                          setRolePrefill(e.target?.value);
                        }}
                      >
                        <MenuItem key={"farmer"} value={"f1"}>
                          {"FARMER"}
                        </MenuItem>
                        {filterRoles(getRoles)?.map((Item: any) => (
                          <MenuItem key={Item?.roleType} value={Item?.id}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <ErrorMessage
                        name="role"
                        render={(msg) => (
                          <div style={{ color: "red" }}>{msg}</div>
                        )}
                      /> */}
                    </FormControl>
                  </Grid>
                  {rolePrefill == 13 ? (
                    <CentersForm
                      size="small"
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      allDistrict={allDistrict}
                      rolePrefill={rolePrefill}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                    />
                  ) : rolePrefill == 10 ? (
                    <ApmcForm
                      size="small"
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      allDistrict={allDistrict}
                      rolePrefill={rolePrefill}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                    />
                  ) : rolePrefill == 17 ? (
                    <VendorForm
                      size="small"
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      allDistrict={allDistrict}
                      rolePrefill={rolePrefill}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                      categories={categories}
                    />
                  ) : (
                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        if (
                          values?.appliedForSoilTesting === "yes" &&
                          file?.length > 0
                        ) {
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
                                  error={Boolean(
                                    errors.firstName && touched.firstName
                                  )}
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
                                  error={Boolean(
                                    errors.middleName && touched.middleName
                                  )}
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
                                  error={Boolean(
                                    errors.lastName && touched.lastName
                                  )}
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
                                  error={Boolean(
                                    errors.wpNumber && touched.wpNumber
                                  )}
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
                                      <MenuItem
                                        key={name?.name}
                                        value={name?.name}
                                      >
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
                                        <MenuItem
                                          key={name?.name}
                                          value={name?.name}
                                        >
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
                                  error={Boolean(
                                    errors.pinCode && touched.pinCode
                                  )}
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
                                      value={
                                        values?.villageName &&
                                        values?.villageName
                                      }
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
                                  value={
                                    values?.maritalStatus &&
                                    values?.maritalStatus
                                  }
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
                                  <InputLabel
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
                  )}
                </Grid>
              </Box>
            </>
          </Card>
        </Box>
      </section>
      <FooterSection
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
        DATA={getFooterData?.data}
      />
    </>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
