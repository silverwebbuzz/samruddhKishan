import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createAboutusDesc, getAboutUs } from "src/slice/pagesSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const QuillField = ({ field, setFieldValue }) => (
  <ReactQuill
    style={{
      height: "auto",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
    }}
    modules={{
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }}
    value={field.value}
    onChange={(value) => setFieldValue(field.name, value)}
    placeholder="Enter your description here..."
  />
);

const index = () => {
  const dispatch = useDispatch();
  const { getAllAboutUSData } = useSelector(
    (state) => state.rootReducer.pagesReducer
  );
  useEffect(() => {
    dispatch(getAboutUs());
  }, []);

  return (
    <>
      <Card
        sx={{
          padding: 10,
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            description: getAllAboutUSData?.data?.[0]?.description,
          }}
          onSubmit={(values) => {
            const payload = {
              description: values?.description,
            };
            if (getAllAboutUSData?.data?.[0]?.id) {
              payload.id = getAllAboutUSData?.data?.[0]?.id;
            }
            dispatch(createAboutusDesc(payload)).then((res) => {
              if (res?.payload?.status) {
                toast.success("Content updated successfully");
              }
            });
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Box sx={{ mb: 8, textAlign: "center" }}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Divider>
                    <Chip
                      sx={{
                        fontSize: "22px",
                        padding: "15px",
                        fontWeight: "bold",
                        textAlign: "left",
                        backgroundColor: "#f6f5f8",
                      }}
                      label="About us"
                    />
                  </Divider>
                </Grid>
              </Box>

              <Grid xs={12} sm={12} md={12} lg={12} mt={2}>
                <Typography marginLeft={2}> Description :</Typography>
                <Field name="description">
                  {({ field }: any) => (
                    <div style={{ marginBottom: "20px" }}>
                      <QuillField setFieldValue={setFieldValue} field={field} />
                    </div>
                  )}
                </Field>
              </Grid>
              <Grid mt={5}>
                <Button type="submit" variant="contained">
                  {" "}
                  Save
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default index;
