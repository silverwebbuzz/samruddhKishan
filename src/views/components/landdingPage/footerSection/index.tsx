import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Icon from "src/@core/components/icon";
const FooterSection = ({ LOGO, DATA, JSONHandler }: any) => {
  const [subsribeValue, setSubsribeValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const router = useRouter();
  const handleSubscribe = () => {
    if (isValidEmail) {
      if (subsribeValue.length > 0) {
        const payload = {
          email: subsribeValue,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/subscribers/createSubscriber`,
            payload,
            {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
          )
          .then((res) => {
            if (res?.data?.status === 200) {
              toast.success("Thank you for subscribing!");
            }
          });
      }
    }
  };

  const validateEmail = (email: string) => {
    // Regular expression for a valid email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setSubsribeValue(email);
    setIsValidEmail(validateEmail(email));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu', // Comma-separated list of languages you want to display
          }, 'google_translate_element');
        }
      `;

    document.head.appendChild(script);

    const googleTranslateScript = document.createElement("script");
    googleTranslateScript.type = "text/javascript";
    googleTranslateScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    document.head.appendChild(googleTranslateScript);
  }, []);

  const handleLink = (slug) => {
    if (router.pathname.includes("pages")) {
      const basePath = router.pathname.includes("pages") ? "/pages" : "";
      router.push(`${basePath}/${slug}`);
    } else {
      router.push(`/pages/${slug}`);
    }
  };
  return (
    <>
      <footer className="sec_padding">
        <div className="footer_first_col logo_col">
          <a href="#">
            <img src={LOGO} alt="" />
          </a>
          <p>{DATA?.featuresProduct?.[2]?.footerContent}</p>
          <div className="footer_form">
            <input
              type="email"
              value={subsribeValue}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={isValidEmail ? "" : "invalid-email"}
            />
            <button
              type="submit"
              onClick={handleSubscribe}
              disabled={!isValidEmail}
            >
              Go
            </button>
          </div>
          <div
            style={{
              margin: "13px",
            }}
          >
            <div id="google_translate_element"></div>
          </div>
        </div>
        <div className="footer_sec_col explore_menu">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/our-centers">Our Centers</a>
            </li>
            <li>
              <a href="/products">Product</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer_third_col recent_post_menu">
          <h3>Features Product</h3>

          <div className="fotter_post_item">
            <div className="fotter_post_item_img">
              <img src={DATA?.featuresProduct?.[0]?.productImage} alt="" />
            </div>
            <div className="fotter_post_item_content">
              <p>
                {moment(DATA?.featuresProduct?.[0]?.createdAt).format(
                  "MMM D yyyy"
                )}
              </p>
              {/*April 14, 2023  */}
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: DATA?.featuresProduct?.[0]?.productDescription,
                }}
              />
              {/* <h4>{DATA?.featuresProduct?.[0]?.productDescription}</h4> */}
            </div>
          </div>
          <div className="fotter_post_item">
            <div className="fotter_post_item_img">
              <img src={DATA?.featuresProduct?.[1]?.productImage} alt="" />
            </div>
            <div className="fotter_post_item_content">
              <p>
                {moment(DATA?.featuresProduct?.[1]?.createdAt).format(
                  "MMM D yyyy"
                )}
              </p>
              {/*April 14, 2023  */}
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: DATA?.featuresProduct?.[1]?.productDescription,
                }}
              />
              {/* <h4>{DATA?.featuresProduct?.[1]?.productDescription}</h4> */}
            </div>
          </div>
        </div>
        <div className="footer_forth_col contact_details_menu">
          <h3>Contact Info</h3>
          <div className="contact-details contact_details_phone">
            <div className="contact-icon">
              <Icon icon="carbon:home" />
            </div>
            <div className="contact-name">
              <h3>ADDRESS:</h3>
              <p>{DATA?.featuresProduct?.[2]?.contactAddress}</p>
            </div>
          </div>
          <div className="contact-details contact_details_phone">
            <div className="contact-icon">
              <Icon icon="mdi-light:email-open" />
            </div>
            <div className="contact-name">
              <h3>EMAIL:</h3>
              <p>
                <a href={`mailto:${DATA?.featuresProduct?.[2]?.contactEmail}`}>
                  {DATA?.featuresProduct?.[2]?.contactEmail}
                </a>
              </p>
            </div>
          </div>
          <div className="contact-details contact_details_phone">
            <div className="contact-icon">
              <Icon icon="material-symbols:call-outline" />
            </div>
            <div className="contact-name">
              <h3>Phone Mo.</h3>
              <p>
                <a href={`tel:${DATA?.featuresProduct?.[2]?.contactPhone}`}>
                  {DATA?.featuresProduct?.[2]?.contactPhone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer_right_shape">
        <img src="./images/pages/footer_right.png" alt="footer leaf" />
      </div>
      <div className="copyright">
        <div className="footer_copyright_wrapper">
          <div className="copyright_left">
            © Copyright 2023. All Rights Reserved by Silverwebbuzz
          </div>
          <div className="copyright_right">
            {JSONHandler(DATA?.pages).map((page) => {
              return (
                // href="/pages/[slug]" as={`/pages/${page?.slug}`}
                <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleLink(page?.slug);
                  }}
                >
                  {page?.title}
                </p>
              );
            })}
            {/* <a href={DATA?.featuresProduct?.[2]?.termsLink}>Terms</a>
            <a href={DATA?.featuresProduct?.[2]?.privacyLink}>Privacy</a>
            <a href={DATA?.featuresProduct?.[2]?.supportLink}>Support</a> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterSection;
