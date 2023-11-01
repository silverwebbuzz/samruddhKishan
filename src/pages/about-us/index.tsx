// ** MUI Imports
//@ts-nocheck
import { Box, Grid, Icon } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { getAllContent } from "src/slice/contentSectionSlice";
import { getAboutUs } from "src/slice/pagesSlice";
import { getLogoAPI } from "src/slice/settingSlice";
import { AppDispatch } from "src/store/store";
import AboutSection from "src/views/components/landdingPage/aboutSection/AboutSection";
import FooterSection from "src/views/components/landdingPage/footerSection";
import GetToKnow from "src/views/components/landdingPage/getKnow/GetKnown";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import PageBanner from "src/views/components/landdingPage/pageBanner/PageBanner";
import TestimonialSection from "src/views/components/landdingPage/testimonialSection/TestimonialSection";
import Topbar from "src/views/components/topbar";

const AboutPage = () => {
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );
  const { getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );
  const { getAllAboutUSData } = useSelector(
    (state: any) => state?.rootReducer?.pagesReducer
  );
  const dispatch = useDispatch<AppDispatch>();
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
  useEffect(() => {
    dispatch(getLogoAPI());
    dispatch(getAllContent());
    dispatch(getAboutUs());
  }, []);

  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      <div className="about-page">
        <PageBanner
          height={200}
          BGImg={"/images/logo/slider1.jpg"}
          bannerName="About Us"
          bannerContent="We deeply respect farmers as Earth's caretakers, recognizing their significant role. They aren't just growers; they craft futures for their families, communities, and nations. This belief is embedded in our name – Kisaan Capability Richest and Owner Family."
        />
        {/* About section start */}
        {/* <AboutSection DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* About section end */}
        {/* Testimonial section start */}
        {/* <TestimonialSection DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* Testimonial section end */}
        {/* About section start */}
        {/* <GetToKnow DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* About section end */}
        <div
          className="aboutPage_sec_padding"
          // style={{
          //   padding: "120px 10%",
          // }}
        >
          <Grid container>
            <Box
              sx={{ display: { md: "flex" }, flexDirection: { sx: "column" } }}
              style={{ alignItems: "center" }}
            >
              <Grid container lg={12} md={12} sm={12} xs={12}>
                <div className="about-content">
                  <Grid item lg={8} md={8} sm={12} xs={12}>
                    <div
                      className="about-text"
                      style={{
                        paddingLeft: "0",
                      }}
                    >
                      <h2 className="about-heading">
                        {getAllAboutUSData?.data?.[0]?.title}
                      </h2>
                      {/* <p className="about-des">
                    </p> */}

                      <div
                        dangerouslySetInnerHTML={{
                          __html: getAllAboutUSData?.data?.[0]?.description,
                        }}
                      />
                    </div>
                    <div
                      className="about-text"
                      style={{
                        paddingLeft: "0",
                      }}
                    >
                      <h2 className="about-heading">
                        {" "}
                        {getAllAboutUSData?.data?.[0]?.title}
                      </h2>
                      {/* <p
                      className="about-des"
                      style={{
                        textAlign: "justify",
                      }}
                    >
                    </p> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getAllAboutUSData?.data?.[0]?.description2,
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <div
                      className="about-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      <div className="card1">
                        <img
                          className="top-card-img"
                          src={
                            JSONHandler(getContentData?.contentCards)?.[0]
                              ?.contentCardImage
                          }
                          alt="card1"
                          width={"50px"}
                        />
                        <h3 className="about-card-heading">
                          {
                            JSONHandler(getContentData?.contentCards)?.[0]
                              ?.contentCardHeading
                          }
                        </h3>
                        <p className="about-card-text">
                          {
                            JSONHandler(getContentData?.contentCards)?.[0]
                              ?.contentCardText
                          }
                        </p>
                      </div>
                      <div className="card2">
                        <img
                          className="top-card-img"
                          src={
                            JSONHandler(getContentData?.contentCards)?.[1]
                              ?.contentCardImage
                          }
                          alt="card1"
                          width={"50px"}
                        />
                        <h3 className="about-card-heading">
                          {
                            JSONHandler(getContentData?.contentCards)?.[1]
                              ?.contentCardHeading
                          }
                        </h3>
                        <p className="about-card-text">
                          {
                            JSONHandler(getContentData?.contentCards)?.[1]
                              ?.contentCardText
                          }
                        </p>
                      </div>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Box>
          </Grid>
        </div>
      </div>
      {/* Footer section start */}
      <FooterSection
        DATA={getContentData}
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
      />
      {/* Footer section end */}
    </>
  );
};
// AboutPage.guestGuard = true
AboutPage.authGuard = false;
AboutPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
export default AboutPage;
