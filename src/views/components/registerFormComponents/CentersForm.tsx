import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createUser1 } from "src/slice/farmers";
import { AppDispatch } from "src/store/store";
import * as yup from "yup";

const CentersForm = ({
  setSTATE,
  STATE,
  allState,
  setDistrict,
  district,
  allDistrict,
  handlePincode,
  pincode,
  getAddressByPinCodeData,
  setTaluka,
  rolePrefill,
  taluka,
  size,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name Required"),
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
    let centersPayload = [
      { roleId: 13 || "" },
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
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: "",
        centerName: "",
        phone: "",
        email: "",
        password: "",
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
      }}
      validationSchema={validationSchema}
      onSubmit={(values: any) => {
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
      }: any) => (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form>
            <Grid container xs={12} md={12} spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="centerName"
                  error={Boolean(errors.centerName && touched.centerName)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Name of the center "
                  placeholder="Center Name"
                />
                <ErrorMessage
                  name="centerName"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth size={size ? size : "medium"}>
                  <InputLabel id="demo-simple-select-label">
                    Center registration under company registration date
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="centerRegisterUnderCompanyDate"
                    value={values?.centerRegisterUnderCompanyDate}
                    label="Center registration under company registration date"
                    onChange={handleChange}
                  >
                    <MenuItem value={"PVT LTD"}>PVT LTD </MenuItem>
                    <MenuItem value={"CO-OP"}>CO-OP</MenuItem>
                    <MenuItem value={"PROP"}>PROP</MenuItem>
                    <MenuItem value={"PARTNERSHIP"}>PARTNERSHIP</MenuItem>
                    <MenuItem value={"FPO"}>FPO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.firstName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="firstName"
                  error={Boolean(errors.firstName && touched.firstName)}
                  fullWidth
                  label="Name of key person"
                  placeholder="Name of key person"
                />
                <ErrorMessage
                  name="firstName"
                  render={(msg) => (
                    <div style={{ color: "red" }}>
                      {" "}
                      Name of the key person is required
                    </div>
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.phone}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="phone"
                  type="number"
                  error={Boolean(errors.phone && touched.phone)}
                  fullWidth
                  label="Center phone no"
                  placeholder="Center phone no"
                />
                <ErrorMessage
                  name="phone"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.email}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  error={Boolean(errors.email && touched.email)}
                  fullWidth
                  label="Center email"
                  placeholder="Center email"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="password"
                  error={Boolean(errors.password && touched.password)}
                  fullWidth
                  label="Password "
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
                  value={values?.centerHandlingPersonName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerHandlingPersonName"
                  error={Boolean(
                    errors.centerHandlingPersonName &&
                      touched.centerHandlingPersonName
                  )}
                  fullWidth
                  label="Name of handling person"
                  placeholder="Name of handling person"
                />
                <ErrorMessage
                  name="centerHandlingPersonName"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl size={size ? size : "medium"} fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
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
                      name="centerDistrict"
                      disabled={STATE?.length <= 0}
                      value={district && district}
                      label="district"
                      onChange={(e) => {
                        setFieldValue("centerDistrict", e?.target?.value);
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
                  type="number"
                  onBlur={handleBlur}
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
                      name="centerTaluka"
                      disabled={pincode?.length <= 0}
                      value={taluka}
                      label="Taluka"
                      onChange={(e) => {
                        setFieldValue("centerTaluka", e?.target?.value);
                        setTaluka(e?.target?.value);
                      }}
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
                <FormControl fullWidth size={size ? size : "medium"}>
                  <InputLabel shrink htmlFor="auth-login-v2-password">
                    Turnover of center
                  </InputLabel>
                  <OutlinedInput
                    label="Turnover of center"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    notched
                    value={values?.centerTurnover}
                    name="centerTurnover"
                    type={"number"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Box>Rs.</Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerMemberFarmer}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  type="number"
                  name="centerMemberFarmer"
                  error={Boolean(
                    errors.centerMemberFarmer && touched.centerMemberFarmer
                  )}
                  fullWidth
                  label="How many farmers are members"
                  placeholder="How many farmers are members"
                />
                <ErrorMessage
                  name="centerMemberFarmer"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth size={size ? size : "medium"}>
                  <InputLabel shrink htmlFor="auth-login-v2-password">
                    Total milk collection per day{" "}
                  </InputLabel>
                  <OutlinedInput
                    label="Total  milk collection per day"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    notched
                    value={values?.centerPerDayMilkCollection}
                    name="centerPerDayMilkCollection"
                    type={"number"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Box>Ltr.</Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth size={size ? size : "medium"}>
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
                    Milk collection storage capacity
                  </InputLabel>
                  <OutlinedInput
                    label="Milk collection storage capacity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    notched
                    value={values?.centerMilkStorageCapacity}
                    name="centerMilkStorageCapacity"
                    type={"number"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Box>Ltr.</Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerSellingMilkFor}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerSellingMilkFor"
                  error={Boolean(
                    errors.centerSellingMilkFor && touched.centerSellingMilkFor
                  )}
                  fullWidth
                  label="To whom they are selling the milk"
                  placeholder="To whom they are selling the milk"
                />
                <ErrorMessage
                  name="centerSellingMilkFor"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerOtherCompetitors}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerOtherCompetitors"
                  error={Boolean(
                    errors.centerOtherCompetitors &&
                      touched.centerOtherCompetitors
                  )}
                  fullWidth
                  label="Who are other competitors"
                  placeholder="Who are other competitors"
                />
                <ErrorMessage
                  name="centerOtherCompetitors"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerPaymentCycle}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerPaymentCycle"
                  error={Boolean(
                    errors.centerPaymentCycle && touched.centerPaymentCycle
                  )}
                  fullWidth
                  label="What is the payment cycle"
                  placeholder="What is payment cycle"
                />
                <ErrorMessage
                  name="centerPaymentCycle"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerOtherFacltyByMilkAgency}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerOtherFacltyByMilkAgency"
                  error={Boolean(
                    errors.centerOtherFacltyByMilkAgency &&
                      touched.centerOtherFacltyByMilkAgency
                  )}
                  fullWidth
                  label="Other faclity provided by milk collection agency"
                  placeholder="Other faclity provided by milk collection agency"
                />
                <ErrorMessage
                  name="centerPaymentCycle"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerFarmarPaymentProcess}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerFarmarPaymentProcess"
                  error={Boolean(
                    errors.centerFarmarPaymentProcess &&
                      touched.centerOtherFacltyByMilkAgency
                  )}
                  fullWidth
                  label="How you make payment to farmers"
                  placeholder="How you make payment to farmers"
                />
                <ErrorMessage
                  name="centerFarmarPaymentProcess"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerMembersOnBoard}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerMembersOnBoard"
                  error={Boolean(
                    errors.centerMembersOnBoard && touched.centerMembersOnBoard
                  )}
                  fullWidth
                  label="If CO-OP how many members on board"
                  placeholder="If CO-OP how many members on board"
                />
                <ErrorMessage
                  name="centerMembersOnBoard"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerCurrentHurdeles}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerCurrentHurdeles"
                  error={Boolean(
                    errors.centerCurrentHurdeles &&
                      touched.centerCurrentHurdeles
                  )}
                  fullWidth
                  label="What are the hurdeles you are facing now"
                  placeholder="What are the hurdeles you are facing now"
                />
                <ErrorMessage
                  name="centerCurrentHurdeles"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerNeededFacultys}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerNeededFacultys"
                  error={Boolean(
                    errors.centerNeededFacultys && touched.centerNeededFacultys
                  )}
                  fullWidth
                  label="What are the faclity you require to grow"
                  placeholder="What are the faclity you require to grow"
                />
                <ErrorMessage
                  name="centerNeededFacultys"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  size={size ? size : "medium"}
                  value={values?.centerAllFinancialAudits}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  name="centerAllFinancialAudits"
                  error={Boolean(
                    errors.centerAllFinancialAudits &&
                      touched.centerAllFinancialAudits
                  )}
                  fullWidth
                  label="Have all financial audits filed regularly"
                  placeholder="Have all financial audits filed regularly"
                />
                <ErrorMessage
                  name="centerAllFinancialAudits"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
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
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CentersForm;
