// ** MUI Imports
//@ts-nocheck
import { SyntheticEvent, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Autoplay, Pagination, Navigation, EffectFade, FreeMode } from 'swiper/modules'
import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import ContactSection from 'src/views/components/landdingPage/contactSection'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
import GetToKnow from 'src/views/components/landdingPage/getKnow/GetKnown'
import TestimonialSection from 'src/views/components/landdingPage/testimonialSection/TestimonialSection'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import { getLogoAPI } from 'src/slice/settingSlice'
import { useSelector } from 'react-redux'
import Topbar from 'src/views/components/topbar'
import { getAllContent, getAllSliderImages, getFooter } from 'src/slice/landingPageSlice'
import { getAllProducts } from 'src/slice/productSlice'

const HomePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [viewPortEntered, setViewPortEntered] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const { allProductsData } = useSelector((state: any) => state?.rootReducer?.productReducer)
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { getSliderData, getContentData, getFooterData } = useSelector(
    (state: any) => state?.rootReducer?.landingPageReducer
  )

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllSliderImages())
    dispatch(getAllProducts())
    dispatch(getAllContent())
    dispatch(getFooter())
  }, [])

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }

  function TruncateText({ text, maxLength = 60 }) {
    const [isTruncated, setIsTruncated] = useState(true)

    const toggleTruncate = () => {
      setIsTruncated(!isTruncated)
    }
    return (
      <div>
        {isTruncated ? (
          <div>
            <p>
              {text?.slice(0, maxLength)}{' '}
              {text?.length > 60 ? (
                <span style={{ color: '#1f4e3d', fontWeight: 'bold' }} onClick={toggleTruncate}>
                  Show More
                </span>
              ) : (
                ''
              )}
            </p>
            {/* {text?.length > 50 ? <p onClick={toggleTruncate}>Show More</p> : ''} */}
          </div>
        ) : (
          <div>
            <p>
              {text}{' '}
              <span style={{ color: '#1f4e3d', fontWeight: 'bold' }} onClick={toggleTruncate}>
                {' '}
                Show Less
              </span>
            </p>
            {/* <p onClick={toggleTruncate}>Show Less</p> */}
          </div>
        )}
      </div>
    )
  }
  const filterProductGalleryImage = DATA => {
    let ProductData = DATA ? DATA : []
    const uniq = ProductData.filter(Item => Item.addToHome === 1)
    return uniq
  }
  return (
    <>
      <Topbar />
      <Navbar LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      <div className='hero'>
        <section className='hero banner-area navigation-circle text-light banner-style-one zoom-effect overflow-hidden'>
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            effect={'fade'}
            navigation={true}
            modules={[Autoplay, Navigation, EffectFade]}
            className='mySwiper banner-fade swiper-container-fade '
          >
            {getSliderData?.data?.map(Item => {
              return (
                <SwiperSlide className='banner-style-one'>
                  <div
                    className='banner-thumb bg-cover shadow dark'
                    style={{
                      'background-image': `url(${Item?.sliderImages})`
                    }}
                  ></div>
                  <div className='container'>
                    <div className='row align-center'>
                      <div className='col-xl-7'>
                        <div className='content'>
                          <h4 className='slider_top_desc'>{Item?.sliderSubHeader}</h4>
                          <h2 className='slider_top_heading'>
                            <strong>{Item?.sliderMainHeaderWithColor}</strong> <span>{Item?.sliderSubHeader2}</span>
                          </h2>
                          <p className='slider_content_para'>{Item?.sliderDescription}</p>
                          <div className='button slider_content_btn'>
                            <a className='btn btn-theme secondary btn-md radius animation' href='#'>
                              Discover More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </section>
        {/* About section start */}
        <AboutSection DATA={getContentData} JSONHandler={JSONHandler} />
        {/* About section end */}
        <section className='what-we-do sec_padding'>
          <div className='section-bg-img'>
            <img src='/images/logo/18.png' alt='banner image' />
          </div>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className='what-do-left'>
                <p className='what-do-heading'>{getContentData?.productContentMainHeading}</p>
                <h1 className='what-do-content'>{getContentData?.productContentSubHeading}</h1>
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='what-do-right'>
                <p className='what-right-text'>{getContentData?.productContentText}</p>
                <Button className='about-btn'>More about</Button>
              </Box>
            </Grid>
          </Grid>
          <div className='card-section'>
            <Swiper
              slidesPerView={
                JSONHandler(getContentData?.bigProductContentCard).length === 4
                  ? 4
                  : JSONHandler(getContentData?.bigProductContentCard).length === 3
                  ? 3
                  : JSONHandler(getContentData?.bigProductContentCard).length === 2
                  ? 2
                  : JSONHandler(getContentData?.bigProductContentCard).length === 1
                  ? 1
                  : 4
              }
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30
                }
              }}
              className='mySwiper slider-main-card'
            >
              {JSONHandler(getContentData?.bigProductContentCard)?.map((Item, index) => {
                return (
                  <SwiperSlide className='main-card-banner' key={index}>
                    <div className='main-card'>
                      <div className='card-img'>
                        <img
                          className='card-image'
                          src={Item?.productContentMainCardImage}
                          alt='card'
                          width={'140px'}
                        />
                      </div>
                      <div className='card-content'>
                        <h5 className='card-heading'>{Item?.bigProductContentSubHeading}</h5>
                        <p className='card-text'>
                          <TruncateText text={Item?.bigProductContentText} maxLength={60} />
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </section>
        <section className='fresh_product_sec sec_padding'>
          <h2>{getContentData?.smallProductContentMainHeading}</h2>
          <div className='fresh_product_cards'>
            <img className='freshproductman_img' src='/images/logo/freshproductman.png' alt='freshproductman' />
            {JSONHandler(getContentData?.smallProductContentCard)?.map(Item => {
              return (
                <div className='single_item'>
                  <img src={Item?.smallProductContentCardImage} alt='image' width={'90px'} />
                  <p>{Item?.productContentName}</p>
                </div>
              )
            })}
          </div>
        </section>
        {/* Get to know section start */}
        <GetToKnow DATA={getContentData} JSONHandler={JSONHandler} />
        {/* Get to know section end */}

        {/* Testimonial section start */}
        {/* <TestimonialSection DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* Testimonial section end */}

        <section className='product_gallery_section'>
          <div className='product_gallery_heading sec_padding'>
            <h5 className='sec_sub_title'>AWESOME GALLERY</h5>
            <h2 className='sec_title'>Gallery Of Our Products</h2>
            <div className='sec_heading_devider'></div>
          </div>
          <Grid container className='product_gallery_slider_main'>
            <Grid sm={12} md={12} className='product_gallery_slider_col'>
              <Box>
                <Swiper
                  slidesPerView={2.5}
                  spaceBetween={30}
                  loop={true}
                  freeMode={true}
                  pagination={{ clickable: true }}
                  modules={[FreeMode, Pagination]}
                  className='product_gallery_slider'
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0
                    },
                    576: {
                      slidesPerView: 1.5,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2.5
                    }
                  }}
                >
                  {filterProductGalleryImage(allProductsData?.data)?.map(Item => {
                    return (
                      <SwiperSlide className='slider_item'>
                        <img src={Item?.productImage} alt='slider6' />
                        <div class='overlay'>
                          <span>{Item?.categoryName}</span>
                          <h4>
                            <a href='#'>{Item?.productName}</a>
                          </h4>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box>
            </Grid>
          </Grid>
          <div className='product_gallery_btm_counter sec_padding'>
            <div className='product_gallery_btm_counter_left'>
              <h5 className='sec_sub_title'>ACHIVEMENTS</h5>
              <h2 className='sec_title'>Delivering value since 1956</h2>
            </div>
            <div className='product_gallery_btm_counter_right'>
              <div className='harvest_counter counter'>
                <div className='timer'>
                  <CountUp end={250} duration={2} suffix='M'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Growth Tons of Harvest</p>
              </div>
              <div className='clients_counter counter'>
                <div className='timer'>
                  <CountUp end={98} duration={2} suffix='%'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Happy clients</p>
              </div>
              <div className='products_counter counter'>
                <div className='timer'>
                  <CountUp end={688} duration={2} suffix='K'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
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
        <section className='home_latest_blogs sec_padding'>
          <div className='latest_blog_lg'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
          <div className='latest_blog_sm'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
          <div className='latest_blog_sm'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
        </section>
      </div>
      {/* Main footer start */}
      <FooterSection LOGO={getLogo?.logo} DATA={getFooterData?.data} JSONHandler={JSONHandler} />
      {/* Main footer end */}
    </>
  )
}
// Home.guestGuard = true
HomePage.authGuard = false
HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default HomePage
