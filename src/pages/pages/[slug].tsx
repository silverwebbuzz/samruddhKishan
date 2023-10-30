import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { getAllContent } from "src/slice/contentSectionSlice";
import { getPages } from "src/slice/pagesSlice";
import { getLogoAPI } from "src/slice/settingSlice";
import FooterSection from "src/views/components/landdingPage/footerSection";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import Topbar from "src/views/components/topbar";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAllPages } = useSelector(
    (state) => state.rootReducer.pagesReducer
  );
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );
  const { getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );
  const { slug } = router.query;
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };
  useEffect(() => {
    dispatch(getLogoAPI());
    dispatch(getAllContent());
    dispatch(getPages());
  }, []);
  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);
  useEffect(() => {
    renderPage();
  }, []);
  const renderPage = () => {
    const foundObject = JSONHandler(getAllPages?.data?.[0]?.pages)?.find(
      (item: any) => item.slug === slug
    );

    if (foundObject) {
      return (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          m={5}
        >
          <Box>
            <Typography variant="h2">{foundObject?.title}</Typography>
          </Box>
          <Box>
            <div dangerouslySetInnerHTML={{ __html: foundObject?.value }} />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <div>
            <h2>Data not Found</h2>
          </div>
        </Box>
      );
    }
  };

  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      {renderPage()}
      <FooterSection
        DATA={getContentData}
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
      />
    </>
  );
};
index.authGuard = false;
index.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>;
export default index;
