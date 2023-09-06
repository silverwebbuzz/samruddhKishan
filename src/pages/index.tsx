// // ** MUI Imports
// //@ts-nocheck
// import { SyntheticEvent, useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/navigation'
// import 'swiper/css/free-mode'
// import { Autoplay, Pagination, Navigation, EffectFade, FreeMode } from 'swiper/modules'
// import { Button, Grid } from '@mui/material'
// import { Box } from '@mui/system'
// import Icon from 'src/@core/components/icon'
// import Link from 'next/link'
// import CountUp from 'react-countup'
// import VisibilitySensor from 'react-visibility-sensor'
// import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
// import ContactSection from 'src/views/components/landdingPage/contactSection'
// import FooterSection from 'src/views/components/landdingPage/footerSection'
// import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
// import GetToKnow from 'src/views/components/landdingPage/getKnow/GetKnown'
// import TestimonialSection from 'src/views/components/landdingPage/testimonialSection/TestimonialSection'

// const HomePage = () => {
//   const [expanded, setExpanded] = useState<string | false>(false)
//   const [viewPortEntered, setViewPortEntered] = useState(false)
//   const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false)
//   }
//   useEffect(() => {
//     document.body.classList.add('landingPage')
//     return () => {
//       document.body.classList.remove('landingPage')
//     }
//   }, [])
//   return (
//     <>
//       <Navbar />
//       <div className='hero'>
//         <section className='hero banner-area navigation-circle text-light banner-style-one zoom-effect overflow-hidden'>
//           <Swiper
//             fadeEffect={true}
//             slidesPerView={1}
//             loop={true}
//             autoplay={{
//               delay: 5000,
//               disableOnInteraction: false
//             }}
//             effect={'fade'}
//             navigation={true}
//             onSlideChange={() => console.log('Slide change')}
//             modules={[Autoplay, Navigation, EffectFade]}
//             className='mySwiper banner-fade swiper-container-fade '
//           >
//             <SwiperSlide className='banner-style-one'>
//               <div
//                 className='banner-thumb bg-cover shadow dark'
//                 style={{
//                   'background-image': 'url(/images/logo/slider1.jpg)'
//                 }}
//               ></div>
//               <div className='container'>
//                 <div className='row align-center'>
//                   <div className='col-xl-7'>
//                     <div className='content'>
//                       <h4 className='slider_top_desc'>Original &amp; Natural</h4>
//                       <h2 className='slider_top_heading'>
//                         <strong>Organic Agriculture</strong> <span>Farming Products</span>
//                       </h2>
//                       <p className='slider_content_para'>
//                         Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
//                         horrible margaret suitable he followed.
//                       </p>
//                       <div className='button slider_content_btn'>
//                         <a className='btn btn-theme secondary btn-md radius animation' href='#'>
//                           Discover More
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//             <SwiperSlide className='banner-style-one'>
//               <div
//                 className='banner-thumb bg-cover shadow dark'
//                 style={{
//                   'background-image': 'url(/images/logo/slider2.jpg)'
//                 }}
//               ></div>
//               <div className='container'>
//                 <div className='row align-center'>
//                   <div className='col-xl-7'>
//                     <div className='content'>
//                       <h4 className='slider_top_desc'>Original &amp; Natural</h4>
//                       <h2 className='slider_top_heading'>
//                         <strong>Agriculture Mature</strong> Farming Products
//                       </h2>
//                       <p className='slider_content_para'>
//                         Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
//                         horrible margaret suitable he followed.
//                       </p>
//                       <div className='button slider_content_btn'>
//                         <a className='btn btn-theme secondary btn-md radius animation' href='#'>
//                           Discover More
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//             <SwiperSlide className='banner-style-one'>
//               <div
//                 className='banner-thumb bg-cover shadow dark'
//                 style={{
//                   'background-image': 'url(/images/logo/slider1.jpg)'
//                 }}
//               ></div>
//               <div className='container'>
//                 <div className='row align-center'>
//                   <div className='col-xl-7'>
//                     <div className='content'>
//                       <h4 className='slider_top_desc'>Original &amp; Natural</h4>
//                       <h2 className='slider_top_heading'>
//                         <strong>Organic Agriculture</strong> <span>Farming Products</span>
//                       </h2>
//                       <p className='slider_content_para'>
//                         Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
//                         horrible margaret suitable he followed.
//                       </p>
//                       <div className='button slider_content_btn'>
//                         <a className='btn btn-theme secondary btn-md radius animation' href='#'>
//                           Discover More
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//             <SwiperSlide className='banner-style-one'>
//               <div
//                 className='banner-thumb bg-cover shadow dark'
//                 style={{
//                   'background-image': 'url(/images/logo/slider2.jpg)'
//                 }}
//               ></div>
//               <div className='container'>
//                 <div className='row align-center'>
//                   <div className='col-xl-7'>
//                     <div className='content'>
//                       <h4 className='slider_top_desc'>Original &amp; Natural</h4>
//                       <h2 className='slider_top_heading'>
//                         <strong>Agriculture Mature</strong> Farming Products
//                       </h2>
//                       <p className='slider_content_para'>
//                         Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
//                         horrible margaret suitable he followed.
//                       </p>
//                       <div className='button slider_content_btn'>
//                         <a className='btn btn-theme secondary btn-md radius animation' href='#'>
//                           Discover More
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           </Swiper>
//         </section>
//         {/* About section start */}
//         <AboutSection />
//         {/* About section end */}
//         <section className='what-we-do sec_padding'>
//           <div className='section-bg-img'>
//             <img src='/images/logo/18.png' alt='banner image' />
//           </div>
//           <Grid container>
//             <Grid sm={12} md={6}>
//               <Box className='what-do-left'>
//                 <p className='what-do-heading'>WHAT WE DO</p>
//                 <h1 className='what-do-content'>
//                   Currently we are <br />
//                   selling organic food
//                 </h1>
//               </Box>
//             </Grid>
//             <Grid sm={12} md={6}>
//               <Box className='what-do-right'>
//                 <p className='what-right-text'>
//                   Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated
//                   estimating excellence an to impression. ladies she basket season age her uneasy saw. Discourse
//                   unwilling am no described.
//                 </p>
//                 <p className='what-right-text'>
//                   Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated
//                   estimating excellence an to impression. ladies she basket season age her uneasy saw. Discourse
//                   unwilling am no described.
//                 </p>
//                 <Button className='about-btn'>More about</Button>
//               </Box>
//             </Grid>
//           </Grid>
//           <div className='card-section'>
//             <Swiper
//               slidesPerView={4}
//               spaceBetween={30}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false
//               }}
//               modules={[Autoplay]}
//               breakpoints={{
//                 320: {
//                   slidesPerView: 1,
//                   spaceBetween: 0
//                 },
//                 576: {
//                   slidesPerView: 2,
//                   spaceBetween: 15
//                 },
//                 768: {
//                   slidesPerView: 3,
//                   spaceBetween: 20
//                 },
//                 1024: {
//                   slidesPerView: 4,
//                   spaceBetween: 30
//                 }
//               }}
//               className='mySwiper slider-main-card'
//             >
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/1-1.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/27.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/27.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/27.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/1-1.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide className='main-card-banner'>
//                 <div className='main-card'>
//                   <div className='card-img'>
//                     <img className='card-image' src='/images/logo/1-1.png' alt='card' />
//                   </div>
//                   <div className='card-content'>
//                     <h5 className='card-heading'>Fresh Vegetables</h5>
//                     <p className='card-text'>
//                       Continue indulged speaking technical out horrible domestic position. Seeing rather you.
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             </Swiper>
//           </div>
//         </section>
//         <section className='fresh_product_sec sec_padding'>
//           <h2>
//             Healthy Life With
//             <br /> Fresh Products
//           </h2>
//           <div className='fresh_product_cards'>
//             <img className='freshproductman_img' src='/images/logo/freshproductman.png' alt='freshproductman' />
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//             <div className='single_item'>
//               <img src='/images/logo/1-2.png' alt='slider1.jpg' />
//               <p>BlueBerry</p>
//             </div>
//           </div>
//         </section>
//         {/* Get to know section start */}
//         <GetToKnow />
//         {/* Get to know section end */}

//         {/* Testimonial section start */}
//         <TestimonialSection />
//         {/* Testimonial section end */}

//         <section className='product_gallery_section'>
//           <div className='product_gallery_heading sec_padding'>
//             <h5 className='sec_sub_title'>AWESOME GALLERY</h5>
//             <h2 className='sec_title'>Gallery Of Our Products</h2>
//             <div className='sec_heading_devider'></div>
//           </div>
//           <Grid container className='product_gallery_slider_main'>
//             <Grid sm={12} md={12} className='product_gallery_slider_col'>
//               <Box>
//                 <Swiper
//                   slidesPerView={2.5}
//                   spaceBetween={30}
//                   loop={true}
//                   freeMode={true}
//                   pagination={{ clickable: true }}
//                   modules={[FreeMode, Pagination]}
//                   className='product_gallery_slider'
//                   breakpoints={{
//                     320: {
//                       slidesPerView: 1,
//                       spaceBetween: 0
//                     },
//                     576: {
//                       slidesPerView: 1.5,
//                       spaceBetween: 15
//                     },
//                     768: {
//                       slidesPerView: 2.5
//                     }
//                   }}
//                 >
//                   <SwiperSlide className='slider_item'>
//                     <img src='./images/logo/2-2.jpg' alt='slider6' />
//                     <div class='overlay'>
//                       <span>Cereals</span>
//                       <h4>
//                         <a href='#'>Fresh Mandrains</a>
//                       </h4>
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide className='slider_item'>
//                     <img src='./images/logo/10.jpg' alt='slider6' />
//                     <div class='overlay'>
//                       <span>Cereals</span>
//                       <h4>
//                         <a href='#'>Fresh Mandrains</a>
//                       </h4>
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide className='slider_item'>
//                     <img src='./images/logo/5-1.jpg' alt='slider6' />
//                     <div class='overlay'>
//                       <span>Cereals</span>
//                       <h4>
//                         <a href='#'>Fresh Mandrains</a>
//                       </h4>
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide className='slider_item'>
//                     <img src='./images/logo/2-2.jpg' alt='slider6' />
//                     <div class='overlay'>
//                       <span>Cereals</span>
//                       <h4>
//                         <a href='#'>Fresh Mandrains</a>
//                       </h4>
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide className='slider_item'>
//                     <img src='./images/logo/10.jpg' alt='slider6' />
//                     <div class='overlay'>
//                       <span>Cereals</span>
//                       <h4>
//                         <a href='#'>Fresh Mandrains</a>
//                       </h4>
//                     </div>
//                   </SwiperSlide>
//                 </Swiper>
//               </Box>
//             </Grid>
//           </Grid>
//           <div className='product_gallery_btm_counter sec_padding'>
//             <div className='product_gallery_btm_counter_left'>
//               <h5 className='sec_sub_title'>ACHIVEMENTS</h5>
//               <h2 className='sec_title'>Delivering value since 1956</h2>
//             </div>
//             <div className='product_gallery_btm_counter_right'>
//               <div className='harvest_counter counter'>
//                 <div className='timer'>
//                   <CountUp end={250} duration={2} suffix='M'>
//                     {({ countUpRef, start }) => (
//                       <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
//                         <span ref={countUpRef} />
//                       </VisibilitySensor>
//                     )}
//                   </CountUp>
//                 </div>
//                 <p>Growth Tons of Harvest</p>
//               </div>
//               <div className='clients_counter counter'>
//                 <div className='timer'>
//                   <CountUp end={98} duration={2} suffix='%'>
//                     {({ countUpRef, start }) => (
//                       <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
//                         <span ref={countUpRef} />
//                       </VisibilitySensor>
//                     )}
//                   </CountUp>
//                 </div>
//                 <p>Happy clients</p>
//               </div>
//               <div className='products_counter counter'>
//                 <div className='timer'>
//                   <CountUp end={688} duration={2} suffix='K'>
//                     {({ countUpRef, start }) => (
//                       <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
//                         <span ref={countUpRef} />
//                       </VisibilitySensor>
//                     )}
//                   </CountUp>
//                 </div>
//                 <p>Sales of our Products</p>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Contact form start */}
//         <ContactSection />
//         {/* Contact form end */}
//         <section className='home_latest_blogs sec_padding'>
//           <div className='latest_blog_lg'>
//             <div className='card_img'>
//               <Link href='#' passHref>
//                 <img src='/images/logo/blog-2.jpg' alt='' />
//                 <div className='btm_publish_date'>
//                   <h4>14</h4>
//                   <p>Apr,23</p>
//                 </div>
//               </Link>
//             </div>
//             <div className='card_content'>
//               <div className='auther_details'>
//                 <Link href='#' passHref>
//                   <Icon icon='gg:profile' />
//                   Agrul
//                 </Link>
//                 <Link href='#' passHref>
//                   <Icon icon='ant-design:comment-outlined' />2 Comments
//                 </Link>
//               </div>
//               <h3>
//                 <Link href='#' passHref>
//                   Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
//                 </Link>
//               </h3>
//             </div>
//           </div>
//           <div className='latest_blog_sm'>
//             <div className='card_img'>
//               <Link href='#' passHref>
//                 <img src='/images/logo/blog-2.jpg' alt='' />
//                 <div className='btm_publish_date'>
//                   <h4>14</h4>
//                   <p>Apr,23</p>
//                 </div>
//               </Link>
//             </div>
//             <div className='card_content'>
//               <div className='auther_details'>
//                 <Link href='#' passHref>
//                   <Icon icon='gg:profile' />
//                   Agrul
//                 </Link>
//                 <Link href='#' passHref>
//                   <Icon icon='ant-design:comment-outlined' />2 Comments
//                 </Link>
//               </div>
//               <h3>
//                 <Link href='#' passHref>
//                   Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
//                 </Link>
//               </h3>
//             </div>
//           </div>
//           <div className='latest_blog_sm'>
//             <div className='card_img'>
//               <Link href='#' passHref>
//                 <img src='/images/logo/blog-2.jpg' alt='' />
//                 <div className='btm_publish_date'>
//                   <h4>14</h4>
//                   <p>Apr,23</p>
//                 </div>
//               </Link>
//             </div>
//             <div className='card_content'>
//               <div className='auther_details'>
//                 <Link href='#' passHref>
//                   <Icon icon='gg:profile' />
//                   Agrul
//                 </Link>
//                 <Link href='#' passHref>
//                   <Icon icon='ant-design:comment-outlined' />2 Comments
//                 </Link>
//               </div>
//               <h3>
//                 <Link href='#' passHref>
//                   Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
//                 </Link>
//               </h3>
//             </div>
//           </div>
//         </section>
//       </div>
//       {/* Main footer start */}
//       <FooterSection />
//       {/* Main footer end */}
//     </>
//   )
// }
// // Home.guestGuard = true
// HomePage.authGuard = false
// HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
// export default HomePage

const Home = () => {
  return <>Home Page</>
}

export default Home
