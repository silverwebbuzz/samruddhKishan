import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { flexbox } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { getAllCategoriesForSelect } from "src/slice/categoriesSlice";
import { getAllServices } from "src/slice/servicesSlice";
import { getLogoAPI } from "src/slice/settingSlice";
import { AppDispatch } from "src/store/store";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import PageBanner from "src/views/components/landdingPage/pageBanner/PageBanner";
import Sidebar from "src/views/components/sidebar";
import Icon from "src/@core/components/icon";
import { useRouter } from "next/router";
import FooterSection from "src/views/components/landdingPage/footerSection";
import { Form, Formik, FormikProps } from "formik";
import toast from "react-hot-toast";
import { createInquiry } from "src/slice/inquirySlice";
import { getAllContent, getFooter } from "src/slice/landingPageSlice";
import Topbar from "src/views/components/topbar";
const ServicesPage = () => {
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const { getFooterData, getContentData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );

  const { getCategoriesForSelect } = useSelector(
    (state: any) => state?.rootReducer?.categoriesReducer
  );
  const { servicesData } = useSelector(
    (state: any) => state?.rootReducer?.servicesReducer
  );
  const [open, setOpen] = useState<boolean>(false);
  const [singleProduct, setProduct] = useState(null);
  const [orderBy, setOrderBy] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => setOpen(false);
  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  function TruncateText({ text, maxLength = 25 }: any) {
    const [isTruncated, setIsTruncated] = useState(true);
    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };
    return (
      <div>
        {isTruncated ? (
          <div>
            <p>
              {text?.slice(0, maxLength)}{" "}
              {text?.length > 25 ? (
                <span
                  style={{
                    color: "#1f4e3d",
                    fontWeight: "bold",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={toggleTruncate}
                >
                  ...
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        ) : (
          <div>
            <p>
              {text}{" "}
              <span
                style={{ color: "#1f4e3d", fontWeight: "bold" }}
                onClick={toggleTruncate}
              >
                {" "}
                Show Less
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  const router = useRouter();
  useEffect(() => {
    dispatch(getLogoAPI());
    dispatch(getAllCategoriesForSelect());
    dispatch(getFooter());
    dispatch(getAllContent());
    localStorage.removeItem("inquryName");
  }, []);
  const handleSubmit = (values: any) => {
    console.log("values", values);
    localStorage.getItem("inquryName");
    let payload = {
      ...values,
    };
    payload.IId = singleProduct.id;
    payload.flag = singleProduct?.productName
      ? "product"
      : singleProduct?.serviceName
      ? "service"
      : "";
    dispatch(createInquiry(payload)).then((res) => {
      if (res?.payload?.status == 200) {
        toast.success("Inquiry created successfully");
      }
      localStorage.removeItem("inquiryName");
      router.push("/");
    });
  };
  useEffect(() => {
    const payload = {
      categoryId: selectedCategory,
      order: sortBy,
      sortBy: orderBy,
    };
    dispatch(getAllServices(payload));
  }, [selectedCategory, sortBy, orderBy]);
  useEffect(() => {
    dispatch(getLogoAPI());
  }, []);
  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };
  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      <div className="services-page">
        <PageBanner
          height={200}
          BGImg={"/images/logo/slider3.jpg"}
          bannerName="Services"
          bannerContent="Farming services encompass a range of expert solutions designed to support farmers and agricultural operations. These services include soil testing, crop consulting, pest management, irrigation, and more. They aim to enhance farm productivity, sustainability, and profitability by providing farmers with tailored guidance, resources, and tools."
        />
      </div>
      <section
        className="all_produc_section"
        style={{
          display: "flex",
          backgroundColor: "#ffffff",
          padding: "2% 5%",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Sidebar
          DATA={getCategoriesForSelect?.data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div
          style={{
            overflowY: "auto",
            height: "100vh",
            flexWrap: "wrap",
            marginLeft: "20px",
            width: "calc(100% - 350px)",
          }}
          className="custom-scroll-container"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="orderBy">Order By:</label>
              <select
                id="orderBy"
                className="custom-hover-for-select"
                value={orderBy}
                onChange={handleOrderByChange}
                style={{ marginLeft: "10px", border: "none", outline: "none" }}
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
            {/* Sort By Dropdown */}
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="sortBy">Sort By:</label>
              <select
                id="sortBy"
                className="custom-hover-for-select"
                value={sortBy}
                onChange={handleSortByChange}
                style={{ marginLeft: "10px", border: "none", outline: "none" }}
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>

          <div
            className="main_card_product"
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {servicesData?.data?.map((item, index) => (
              <Card
                className="product_card"
                sx={{
                  border: "1px solid",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                  marginBottom: "20px",
                }}
              >
                <CardContent
                  style={{
                    // flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: 'space-beteen',
                    alignItems: "center",
                    // padding: '40px'
                    paddingBottom: "0px",
                    // paddingTop: '0px'
                  }}
                >
                  <img
                    className="product_image"
                    src={item?.serviceBannerImage}
                    style={{
                      objectFit: "cover",
                      borderRadius: " 10px 10px 10px 10px",
                      height: "170px",
                      width: "187px",
                    }}
                    height={150}
                    width={150}
                    alt={item?.productName}
                  />
                  <Typography
                    className="product_title"
                    marginTop={2}
                    variant="h6"
                    fontWeight={600}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {item?.serviceName}
                  </Typography>
                  <TruncateText text={removeTags(item?.serviceDetails)} />
                </CardContent>
                <Box
                  sx={{
                    backgroundColor: "#1f4e3d",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "60px",
                  }}
                >
                  <Box
                    className="single_product_btm"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <Tooltip title="View">
                      <Button
                        size="small"
                        sx={{ color: "#fff", textTransform: "capitalize" }}
                        onClick={() => {
                          localStorage.setItem(
                            "inquryName",
                            JSON.stringify(item)
                          );
                          router.push("/services/details");
                        }}
                      >
                        view
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title="Inqury"
                      onClick={() => {
                        setProduct(item), setOpen(true);
                      }}
                    >
                      <Button
                        size="small"
                        sx={{ color: "#fff", textTransform: "capitalize" }}
                      >
                        inqury now
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FooterSection
        DATA={getContentData}
        LOGO={getLogo?.logo}
        JSONHandler={JSONHandler}
      />
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="full-screen-dialog-title"
        open={open}
      >
        <DialogTitle id="full-screen-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ top: 8, right: 10, position: "absolute", color: "grey.500" }}
          >
            <Icon icon="tabler:x" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              IName: singleProduct?.productName
                ? singleProduct?.productName
                : singleProduct?.serviceName
                ? singleProduct?.serviceName
                : "",
              status: "pending",
              fullName: "",
              mobileNumber: "",
              email: "",
              quantity: 0,
              description: "",
            }}
            onSubmit={(values: any, { resetForm }) => {
              handleSubmit(values, { resetForm });
            }}
          >
            {(props: FormikProps<any>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              } = props;
              return (
                <Form onSubmit={handleSubmit}>
                  <Grid container gap={3}>
                    <Grid xs={12}>
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
                            label="Inqury Details"
                          />
                        </Divider>
                      </Box>
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        label="Inqury about"
                        autoComplete="off"
                        value={values?.IName}
                        disabled
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="IName"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid xs={12}>
                      <TextField
                        label="Full Name"
                        autoComplete="off"
                        value={values?.fullName}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="fullName"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        label="Mobile Number"
                        autoComplete="off"
                        value={values?.mobileNumber}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="mobileNumber"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        label="Email"
                        autoComplete="off"
                        value={values?.email}
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    {!singleProduct?.serviceName ? (
                      <Grid xs={12}>
                        <TextField
                          label="Quantity"
                          autoComplete="off"
                          value={values?.quantity}
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name="quantity"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    ) : null}
                    <Grid xs={12}>
                      <TextField
                        label="Description"
                        autoComplete="off"
                        value={values?.description}
                        multiline
                        rows={4}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="description"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Box sx={{ marginTop: "25px" }}>
                        <Button type="submit" variant="contained" size="medium">
                          Submit
                        </Button>
                        <Button
                          color="error"
                          sx={{ marginLeft: "10px" }}
                          size="medium"
                          variant="contained"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

ServicesPage.authGuard = false;
ServicesPage.getLayout = (page: React.ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

export default ServicesPage;
