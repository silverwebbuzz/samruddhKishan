import { ReactNode, useEffect, useState } from "react";

import { Box, BoxProps, styled } from "@mui/system";

// ** Icon Imports

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import { Link, Typography } from "@mui/material";

import { useRouter } from "next/router";
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
import { getAllContent } from "src/slice/landingPageSlice";
import Topbar from "src/views/components/topbar";

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

const Register = () => {
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );

  const { getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );

  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");

  const dispatch = useDispatch<AppDispatch>();

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
        bannerName="User Registration"
        bannerContent="Join us on this journey of growth and innovation as we work together to cultivate prosperity for farmers worldwide. Explore our extensive range of products and discover how our platform can revolutionize your farming experience. Welcome to a brighter, more efficient future for farming with Samruddh Kisaan."
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
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "2px solid",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
                width: "300px",
                height: "300px",
              }}
              className="HoverOnUser"
              onClick={() => {
                router.push("register/farmer");
              }}
            >
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                src="/images/logo/farmer_10613.png"
              />
              <Typography fontWeight={600} textAlign={"center"} mt={4}>
                Register As Farmers
              </Typography>
            </div>{" "}
            <div
              className="HoverOnUser"
              style={{
                border: "2px solid",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
                width: "300px",
                height: "300px",
              }}
              onClick={() => {
                router.push("/register/center");
              }}
            >
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                src="/images/logo/mall_7650057.png"
              />
              <Typography fontWeight={600} textAlign={"center"} mt={4}>
                Register As Centers
              </Typography>
            </div>{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="HoverOnUser"
              style={{
                border: "2px solid",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
                width: "300px",
                height: "300px",
              }}
              onClick={() => {
                router.push("/register/apmc-traders");
              }}
            >
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                src="/images/logo/businessman-with-suitcase-going-work-city_31198.png"
              />
              <Typography fontWeight={600} textAlign={"center"} mt={4}>
                Register As Apmc Traders
              </Typography>
            </div>{" "}
            <div
              className="HoverOnUser"
              style={{
                border: "2px solid",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
                width: "300px",
                height: "300px",
              }}
              onClick={() => {
                router.push("/register/vendor");
              }}
            >
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "contain",
                }}
                src="/images/logo/clipboard_1440288.png"
              />
              <Typography fontWeight={600} textAlign={"center"} mt={4}>
                Register As Vendors
              </Typography>
            </div>
          </div>
        </Box>
      </section>
      <FooterSection
        DATA={getContentData}
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
      />
    </>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
