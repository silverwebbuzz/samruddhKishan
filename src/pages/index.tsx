// ** MUI Imports
//@ts-nocheck
import { SyntheticEvent, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  FreeMode,
} from "swiper/modules";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Icon from "src/@core/components/icon";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Navbar from "src/views/components/landdingPage/navBar/Navbar";
import ContactSection from "src/views/components/landdingPage/contactSection";
import FooterSection from "src/views/components/landdingPage/footerSection";
import AboutSection from "src/views/components/landdingPage/aboutSection/AboutSection";
import GetToKnow from "src/views/components/landdingPage/getKnow/GetKnown";
import TestimonialSection from "src/views/components/landdingPage/testimonialSection/TestimonialSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { getLogoAPI } from "src/slice/settingSlice";
import { useSelector } from "react-redux";
import Topbar from "src/views/components/topbar";
import {
  getAllContent,
  getAllSliderImages,
  getFooter,
} from "src/slice/landingPageSlice";
import { getAllProducts } from "src/slice/productSlice";
import { getAllBrands } from "src/slice/brandsSlice";

const HomePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [viewPortEntered, setViewPortEntered] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [chatUrl, setChatUrl] = useState("#");
  const { allProductsData } = useSelector(
    (state: any) => state?.rootReducer?.productReducer
  );
  const { brandsData } = useSelector(
    (state: any) => state?.rootReducer?.brandsReducer
  );

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const { getLogo } = useSelector(
    (state: any) => state?.rootReducer?.settingsReducer
  );
  const { getSliderData, getContentData, getFooterData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    document.body.classList.add("landingPage");
    return () => {
      document.body.classList.remove("landingPage");
    };
  }, []);
  useEffect(() => {
    dispatch(getLogoAPI());
    dispatch(getAllSliderImages());
    dispatch(getAllProducts());
    dispatch(getAllContent());
    dispatch(getFooter());
    let payload = {
      page: 1,
      pageSize: 10,
    };
    dispatch(getAllBrands(payload));
  }, []);

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };

  function TruncateText({ text, maxLength = 60 }) {
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
              {text?.length > 60 ? (
                <span
                  style={{ color: "#1f4e3d", fontWeight: "bold" }}
                  onClick={toggleTruncate}
                >
                  Show More
                </span>
              ) : (
                ""
              )}
            </p>
            {/* {text?.length > 50 ? <p onClick={toggleTruncate}>Show More</p> : ''} */}
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
            {/* <p onClick={toggleTruncate}>Show Less</p> */}
          </div>
        )}
      </div>
    );
  }
  const filterProductGalleryImage = (DATA) => {
    let ProductData = DATA ? DATA : [];
    const uniq = ProductData.filter((Item) => Item.addToHome === 1);
    return uniq;
  };

  // Check for mobile devices
  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("Mobile") !== -1
    );
  }

  useEffect(() => {
    if (isMobileDevice()) {
      setChatUrl(`https://wa.me/${9327152685}/?text=${"hello"}`);
    } else {
      setChatUrl(`https://web.whatsapp.com/send?phone=${9327152685}`);
    }
  }, []);

  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      <div className="hero">
        <section className="hero banner-area navigation-circle text-light banner-style-one zoom-effect overflow-hidden">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={"fade"}
            navigation={true}
            modules={[Autoplay, Navigation, EffectFade]}
            className="mySwiper banner-fade swiper-container-fade"
          >
            {getSliderData?.data?.map((Item) => {
              return (
                <SwiperSlide className="banner-style-one">
                  <div
                    className="banner-thumb bg-cover shadow dark"
                    style={{
                      "background-image": `url(${Item?.sliderImages})`,
                    }}
                  ></div>
                  <div className="container">
                    <div className="row align-center">
                      <div className="col-xl-7">
                        <div className="content">
                          <h4 className="slider_top_desc">
                            {Item?.sliderSubHeader}
                          </h4>
                          <h2 className="slider_top_heading">
                            <strong>{Item?.sliderMainHeaderWithColor}</strong>{" "}
                            <span>{Item?.sliderSubHeader2}</span>
                          </h2>
                          <p className="slider_content_para">
                            {Item?.sliderDescription}
                          </p>
                          <div className="button slider_content_btn">
                            <a
                              className="btn btn-theme secondary btn-md radius animation"
                              href="#"
                            >
                              Discover More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        {/* About section start */}
        <AboutSection DATA={getContentData} JSONHandler={JSONHandler} />
        {/* About section end */}

        <section className="what-we-do sec_padding">
          <div className="section-bg-img">
            <img src="/images/logo/18.png" alt="banner image" />
          </div>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className="what-do-left">
                <p className="what-do-heading">
                  {getContentData?.serviceContentMainHeading}
                </p>
                <h1 className="what-do-content">
                  {getContentData?.serviceContentSubHeading}
                </h1>
              </Box>
            </Grid>
          </Grid>
          <div className="card-section">
            <Swiper
              slidesPerView={
                JSONHandler(getContentData?.bigServiceContentCard).length === 4
                  ? 4
                  : JSONHandler(getContentData?.bigServiceContentCard)
                      .length === 3
                  ? 3
                  : JSONHandler(getContentData?.bigServiceContentCard)
                      .length === 2
                  ? 2
                  : JSONHandler(getContentData?.bigServiceContentCard)
                      .length === 1
                  ? 1
                  : 4
              }
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper slider-main-card"
            >
              {JSONHandler(getContentData?.bigServiceContentCard)?.map(
                (Item, index) => {
                  return (
                    <SwiperSlide className="main-card-banner" key={index}>
                      <div
                        className="main-card what_we_offer_card_main"
                        style={{
                          // width: "200px",
                          display: "flex",
                          // justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          paddingTop: "0px",
                        }}
                      >
                        <div className="card-img what_we_offer_card_img">
                          <img
                            className="card-image"
                            src={Item?.ServiceContentMainCardImage}
                            alt="card"
                            width={"140px"}
                          />
                        </div>
                        <div className="card-content what_we_offer_card_text">
                          <h5 className="card-heading">
                            {Item?.bigServiceContentSubHeading}
                          </h5>
                          <p className="card-text">
                            {Item?.bigServiceContentText}
                            {/* <TruncateText
                              text={Item?.bigServiceContentText}
                              maxLength={60}
                            /> */}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>
        </section>
        <section className="fresh_product_sec sec_padding">
          <div className="fresh_product_cards">
            <img
              className="freshproductman_img"
              src="/images/logo/freshproductman.png"
              alt="freshproductman"
            />
          </div>
        </section>

        <section className="what-we-do sec_padding">
          <div className="section-bg-img">
            <img src="/images/logo/18.png" alt="banner image" />
          </div>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className="what-do-left">
                <p className="what-do-heading">
                  {getContentData?.productContentMainHeading}
                </p>
                <h1 className="what-do-content">
                  {getContentData?.productContentSubHeading}
                </h1>
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className="what-do-right">
                <p className="what-right-text">
                  {getContentData?.productContentText}
                </p>
                <Button className="login-btn">More about</Button>
              </Box>
            </Grid>
          </Grid>
          <div className="card-section">
            <Swiper
              slidesPerView={
                JSONHandler(getContentData?.bigProductContentCard).length === 4
                  ? 4
                  : JSONHandler(getContentData?.bigProductContentCard)
                      .length === 3
                  ? 3
                  : JSONHandler(getContentData?.bigProductContentCard)
                      .length === 2
                  ? 2
                  : JSONHandler(getContentData?.bigProductContentCard)
                      .length === 1
                  ? 1
                  : 4
              }
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper slider-main-card"
            >
              {JSONHandler(getContentData?.bigProductContentCard)?.map(
                (Item, index) => {
                  return (
                    <SwiperSlide className="main-card-banner" key={index}>
                      <div className="main-card">
                        <div className="card-img">
                          <img
                            className="card-image"
                            src={Item?.productContentMainCardImage}
                            alt="card"
                            width={"140px"}
                          />
                        </div>
                        <div className="card-content">
                          <h5 className="card-heading">
                            {Item?.bigProductContentSubHeading}
                          </h5>
                          <p className="card-text">
                            {Item?.bigProductContentText}
                            {/* <TruncateText
                              text={Item?.bigProductContentText}
                              maxLength={60}
                            /> */}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>
        </section>
        <section className="fresh_product_sec sec_padding">
          <h2>{"Our Brands"}</h2>

          <div className="fresh_product_cards">
            <img
              className="freshproductman_img"
              src="/images/logo/freshproductman.png"
              alt="freshproductman"
            />
            <Swiper
              slidesPerView={
                brandsData?.data?.length === 4
                  ? 4
                  : brandsData?.data?.length === 3
                  ? 3
                  : brandsData?.data?.length === 2
                  ? 2
                  : brandsData?.data?.length === 1
                  ? 1
                  : 4
              }
              spaceBetween={40}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1193: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1182: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1384: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper slider-main-card"
            >
              {brandsData?.data?.map((Item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="single_item">
                      <img src={Item?.brandLogo} alt="image" width={"90px"} />
                      <p>{Item?.brandName}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        {/* Get to know section start */}
        <GetToKnow DATA={getContentData} JSONHandler={JSONHandler} />
        {/* Get to know section end */}

        {/* Testimonial section start */}
        {/* <TestimonialSection DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* Testimonial section end */}

        <section className="product_gallery_section">
          <div className="product_gallery_heading sec_padding">
            <h5 className="sec_sub_title">AWESOME GALLERY</h5>
            <h2 className="sec_title">Gallery Of Our Products</h2>
            <div className="sec_heading_devider"></div>
          </div>
          <Grid container className="product_gallery_slider_main">
            <Grid sm={12} md={12} className="product_gallery_slider_col">
              <Box>
                <Swiper
                  slidesPerView={2.5}
                  spaceBetween={30}
                  loop={true}
                  freeMode={true}
                  pagination={{ clickable: true }}
                  modules={[FreeMode, Pagination]}
                  className="product_gallery_slider"
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    576: {
                      slidesPerView: 1.5,
                      spaceBetween: 15,
                    },
                    768: {
                      slidesPerView: 2.5,
                    },
                  }}
                >
                  {filterProductGalleryImage(allProductsData?.data)?.map(
                    (Item) => {
                      return (
                        <SwiperSlide className="slider_item">
                          <img src={Item?.productImage} alt="slider6" />
                          <div class="overlay">
                            <span>{Item?.categoryName}</span>
                            <h4>
                              <a href="#">{Item?.productName}</a>
                            </h4>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>
              </Box>
            </Grid>
          </Grid>
          <div className="product_gallery_btm_counter sec_padding">
            <div className="product_gallery_btm_counter_left">
              <h5 className="sec_sub_title">ACHIVEMENTS</h5>
              <h2 className="sec_title">{getContentData?.achivementHeading}</h2>
            </div>
            <div className="product_gallery_btm_counter_right">
              <div className="harvest_counter counter">
                <div className="timer">
                  <CountUp
                    end={getContentData?.totalGrowth}
                    duration={2}
                    suffix="M"
                  >
                    {({ countUpRef, start }) => (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={start}
                        delayedCall
                      >
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Growth Tons of Harvest</p>
              </div>
              <div className="clients_counter counter">
                <div className="timer">
                  <CountUp
                    end={getContentData?.totalHappyClients}
                    duration={2}
                    suffix="%"
                  >
                    {({ countUpRef, start }) => (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={start}
                        delayedCall
                      >
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Happy clients</p>
              </div>
              <div className="products_counter counter">
                <div className="timer">
                  <CountUp
                    end={getContentData?.totalSales}
                    duration={2}
                    suffix="K"
                  >
                    {({ countUpRef, start }) => (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={start}
                        delayedCall
                      >
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Sales of our Products</p>
              </div>
            </div>
          </div>
        </section>
        {/* Contact form start */}
        <ContactSection JSONHandler={JSONHandler} />
        {/* Contact form end */}

        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 256 258"
          >
            <defs>
              <linearGradient
                id="logosWhatsappIcon0"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#1FAF38" />
                <stop offset="100%" stop-color="#60D669" />
              </linearGradient>
              <linearGradient
                id="logosWhatsappIcon1"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#F9F9F9" />
                <stop offset="100%" stop-color="#FFF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#logosWhatsappIcon0)"
              d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
            />
            <path
              fill="url(#logosWhatsappIcon1)"
              d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"
            />
            <path
              fill="#FFF"
              d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
            />
          </svg>
        </a>
      </div>
      {/* Main footer start */}
      <FooterSection
        LOGO={getLogo?.logo}
        DATA={getContentData}
        JSONHandler={JSONHandler}
      />
      {/* Main footer end */}
    </>
  );
};
HomePage.authGuard = false;
HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
export default HomePage;
