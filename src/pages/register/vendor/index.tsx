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
    dispatch(getAllContent());
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
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        height={200}
        BGImg={"/images/logo/slider6.jpg"}
        bannerName="Vendor Registration"
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
                label="Vendors Registration"
              />
            </Divider>
          </Box>
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
