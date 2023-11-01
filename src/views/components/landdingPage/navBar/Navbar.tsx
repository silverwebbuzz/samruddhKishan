//@ts-nocheck
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from "src/@core/components/icon";
import { useTheme } from "@mui/material/styles";

import { Button } from "@mui/material";
import Link from "next/link";
import { Router, useRouter } from "next/router";

export default function Navbar({ LOGO }) {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const router = useRouter();
  const { breakpoints } = useTheme();
  const md = 1024; // Define md variable with value 1024
  const matchMobileView = useMediaQuery(`(max-width: ${md}px)`);

  useEffect(() => {
    // This function will be called when the component unmounts
    return () => {
      if (document.body.classList.contains("nav_open")) {
        document.body.classList.remove("nav_open");
      }
    };
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "background.paper" }}
      className="landing_home_page_header"
    >
      <Container
        sx={{ py: { xs: 2, mx: 1 }, px: { xs: "50px" } }}
        style={{
          maxWidth: "100%",
          padding: "0.5rem 10% 0.5rem 10%",
          minHeight: "102px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            className="mobile_navbar"
            sx={{
              ml: "auto",
              width: "100%",
              display: { xs: "flex", [md]: "none" },
              justifyContent: { xs: "space-between", [md]: "none" },
            }}
          >
            <IconButton
              onClick={() => {
                setVisibleMenu(!visibleMenu);
                document.body.classList.toggle("nav_open");
              }}
            >
              <Icon fontSize={35} icon="material-symbols:menu" />
            </IconButton>
            <img className="logo-img" src={LOGO} alt="logo" />
            <Box
              className="menu_right_btn"
              sx={{ display: "flex", marginLeft: "30px" }}
            >
              <Button className="login-btn">Register</Button>
            </Box>
          </Box>

          <Box
            className="desk_navbar"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column" },
              transition: (theme) => theme.transitions.create(["left"]),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: "background.paper",
                zIndex: "appBar",
                justifyContent: "flex-start",
                position: "fixed",
                top: 0,
                left: visibleMenu ? 0 : "-120vh",
                // width: "60% !important",
                height: "100%",
              }),
            }}
          >
            <img className="logo-img" src={LOGO} alt="logo" />
            <div className="main-menu" style={{ marginLeft: "auto" }}>
              <ul className="sub-menu">
                <Link className="menu-link" href="/" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/" ? "menue-Active" : ""
                    }`}
                  >
                    Home
                  </li>
                </Link>

                <Link className="menu-link" href="/about-us" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/about-us/" ? "menue-Active" : ""
                    }`}
                  >
                    About Us
                  </li>
                </Link>
                <Link className="menu-link" href="/our-centers" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/our-centers/" ? "menue-Active" : ""
                    }`}
                  >
                    Our Centers
                  </li>
                </Link>
                <Link className="menu-link" href="/products" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/products/" ? "menue-Active" : ""
                    }`}
                  >
                    Products
                  </li>
                </Link>
                <Link className="menu-link" href="/services" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/services/" ? "menue-Active" : ""
                    }`}
                  >
                    Services
                  </li>
                </Link>
                <Link className="menu-link" href="/contact-us" passHref>
                  <li
                    className={`menu-item ${
                      router.asPath === "/contact-us/" ? "menue-Active" : ""
                    }`}
                  >
                    Contact Us
                  </li>
                </Link>
              </ul>
            </div>
            <Box
              className="menu_right_btn"
              sx={{ display: "flex", marginLeft: "30px" }}
            >
              <Button
                className="login-btn"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Register
              </Button>
              <Button
                className="login-btn"
                sx={{
                  margin: "0px 12px",
                }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>
            </Box>
            {visibleMenu && matchMobileView && (
              <IconButton
                className="nav_close_btn"
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                }}
                onClick={() => {
                  setVisibleMenu(!visibleMenu);
                  document.body.classList.remove("nav_open");
                }}
              >
                <Icon fontSize="35px" icon="iconoir:cancel" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
