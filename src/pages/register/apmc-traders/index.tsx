import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/system";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { Card, Chip, Divider } from "@mui/material";
import PageBanner from "src/views/components/landdingPage/pageBanner/PageBanner";
import {
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
import ApmcForm from "src/views/components/registerFormComponents/ApmcForm";
import { getAllContent } from "src/slice/landingPageSlice";
import Topbar from "src/views/components/topbar";
const index = () => {
  const { getAddressByPinCodeData, allDistrict, allState } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  );
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );
  const { getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handlePincode = (e: any) => {
    setPincode(e);
    let payload = {
      pincode: e ? e : "",
    };
    dispatch(getAdressByPincode(payload));
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

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };

  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);

  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        height={200}
        BGImg={"/images/logo/slider6.jpg"}
        bannerName="Apmc Traders Registration"
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
          {" "}
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
                label="Apmc Traders Registration"
              />
            </Divider>
          </Box>
          <ApmcForm
            size="small"
            allState={allState}
            STATE={STATE}
            setSTATE={setSTATE}
            setDistrict={setDistrict}
            district={district}
            allDistrict={allDistrict}
            handlePincode={handlePincode}
            pincode={pincode}
            setTaluka={setTaluka}
            taluka={taluka}
            getAddressByPinCodeData={getAddressByPinCodeData}
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
