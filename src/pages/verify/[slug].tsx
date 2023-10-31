import { Alert, AlertTitle, Box, Button, Card, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";

const slug = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#1f4e3d",
      }}
    >
      <img
        src="/images/logo1/Farmer_custom-selected 1.png"
        style={{
          marginTop: "0px",
        }}
      />
      <Card
        sx={{
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          padding: "30px",
        }}
      >
        <p
          style={{
            fontFamily: "Satisfy",
            alignSelf: "start",
            fontSize: "40px",
            fontWeight: "600",
            color: "#204E3D",
            padding: "0px",
            margin: 0,
          }}
        >
          Congratulation !
        </p>
        <div
          style={{
            margin: "10px 0px",
          }}
        >
          <img src="/images/pages/celebration 1.png" />
        </div>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginBottom: "16px",
            background: "#C3F6E4",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            // justifyContent: "center",
            borderRadius: "20px",
            padding: "0px 10px",
            // margin: "30px",
          }}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 0C7.875 0 0 7.875 0 17.5C0 27.125 7.875 35 17.5 35C27.125 35 35 27.125 35 17.5C35 7.875 27.125 0 17.5 0ZM24.85 14.525L16.45 22.925C15.75 23.625 14.7 23.625 14 22.925L10.15 19.075C9.45 18.375 9.45 17.325 10.15 16.625C10.85 15.925 11.9 15.925 12.6 16.625L15.225 19.25L22.4 12.075C23.1 11.375 24.15 11.375 24.85 12.075C25.55 12.775 25.55 13.825 24.85 14.525Z"
              fill="#204E3D"
            />
          </svg>

          <h3
            style={{
              marginLeft: "10px",
            }}
          >
            Success! ,Your email has been verified.
          </h3>
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#204E3D",
            borderRadius: "10px",
          }}
          onClick={() => {
            router.push("/login");
          }}
        >
          Continue to Login
        </Button>
      </Card>
    </div>
  );
};

slug.authGuard = false;
slug.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default slug;
