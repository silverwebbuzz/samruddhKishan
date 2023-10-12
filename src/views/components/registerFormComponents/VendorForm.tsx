import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import DemoSelect from "src/views/demo/demoSelect";
import * as yup from "yup";
import { FilePreview } from "../filePreviewer/FilePreview";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUser1 } from "src/slice/farmers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";

const VendorForm = ({
  size,
  values,
  setSTATE,
  STATE,
  allState,
  setDistrict,
  district,
  taluka,
  setFieldValue,
  allDistrict,
  handlePincode,
  pincode,
  getAddressByPinCodeData,
  categories,
}: any) => {
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name Required"),
    lastName: yup.string().required("Last Name Required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Mobile Number is required")
      .max(10, "Mobile number must be 10 digits")
      .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid mobile number"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),
  });

  const handleSubmit = (values: any) => {
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
      { roleId: 17 || "" },
      { vendorImage: values?.vendorImage || "" },
      { categoryId: categoryIdPrefill || "" },
    ];
    let formData = new FormData();
    Vendorspayload.forEach((entry: any) => {
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
  };
  return (
    <>
      <Formik
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
          vendorImage: "",
          // Add more initial values as needed
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid container xs={12} md={12} spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size={size ? size : "medium"}
                    value={values?.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstName"
                    error={Boolean(errors.firstName && touched.firstName)}
                    fullWidth
                    label="First Name"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size={size ? size : "medium"}
                    value={values?.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="lastName"
                    error={Boolean(errors.lastName && touched.lastName)}
                    fullWidth
                    label="Last Name"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size={size ? size : "medium"}
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    error={Boolean(errors.email && touched.email)}
                    fullWidth
                    label="Email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size={size ? size : "medium"}
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    error={Boolean(errors.password && touched.password)}
                    fullWidth
                    label="Password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size={size ? size : "medium"}
                    value={values?.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phone"
                    error={Boolean(errors.phone && touched.phone)}
                    fullWidth
                    type="number"
                    label="Phone"
                    placeholder="Phone"
                  />
                  <ErrorMessage
                    name="phone"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth size={size ? size : "medium"}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
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
                    <FormControl fullWidth size={size ? size : "medium"}>
                      <InputLabel id="demo-simple-select-label">
                        District
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="district"
                        disabled={STATE.length <= 0}
                        value={district}
                        label="District"
                        onChange={(e: any) => {
                          setFieldValue("district", e?.targe?.value);
                          setDistrict(e?.target?.value);
                        }}
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
                    size={size ? size : "medium"}
                    value={pincode}
                    name="pinCode"
                    onChange={(e) => {
                      handlePincode(e.target.value);
                      setFieldValue("pinCode", e?.target?.value);
                    }}
                    onBlur={handleBlur}
                    type="number"
                    fullWidth
                    label="Pin Code"
                    placeholder="Pin Code"
                  />
                  <ErrorMessage
                    name="pinCode"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Tooltip
                    title="Please enter pincode first"
                    disableFocusListener={!(pincode?.length <= 0)}
                    disableHoverListener={!(pincode?.length <= 0)}
                    disableTouchListener={!(pincode?.length <= 0)}
                  >
                    <FormControl fullWidth size={size ? size : "medium"}>
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
                        {getAddressByPinCodeData?.taluka?.map((name: any) => (
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
                    <FormControl fullWidth size={size ? size : "medium"}>
                      <InputLabel id="demo-simple-select-label">
                        Village Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="villageName"
                        disabled={pincode.length <= 0}
                        value={values?.villageName && values?.villageName}
                        label="Village Name"
                        onChange={handleChange}
                      >
                        {getAddressByPinCodeData?.village?.map((name: any) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Tooltip>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <DemoSelect
                    data={categories?.data}
                    //@ts-ignore
                    size={"small"}
                    selectedCategory={categoryIdPrefill}
                    //@ts-ignore
                    setSelectedCategory={setCategoryIdPrefill}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <FilePreview
                      style={{
                        maxHeight: "200px",
                        maxWidth: "200px",
                        objectFit: "contained",
                      }}
                      file={values?.vendorImage}
                    />
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          mr: 1,
                          ml: 2,
                          "&:hover": {
                            backgroundColor: "#5E7954",
                          },
                        }}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={(e: any) => {
                            setFieldValue("vendorImage", e.target?.files[0]);
                          }}
                        />
                      </Button>
                    </Box>
                    <ErrorMessage
                      name="brandLogo"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </Box>
                </Grid>
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
    </>
  );
};

export default VendorForm;
