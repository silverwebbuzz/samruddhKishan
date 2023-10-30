import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup
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
import { createPages, getPages } from "src/slice/pagesSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Define QuillField component

const QuillField = ({ field, setFieldValue }) => (
  <ReactQuill
    style={{ height: "200px", padding: "10px" }}
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

function Index() {
  const dispatch = useDispatch();
  const { getAllPages } = useSelector(
    (state) => state.rootReducer.pagesReducer
  );
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    pages: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        slug: Yup.string().required("Slug is required"),
        value: Yup.string(),
      })
    ),
  });
  useEffect(() => {
    dispatch(getPages());
  }, []);

  return (
    <div>
      <Grid container>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Formik
            enableReinitialize
            initialValues={{
              pages: getAllPages?.data?.[0]?.pages
                ? JSON.parse(getAllPages?.data?.[0]?.pages)
                : [{ title: "", slug: "", value: "" }],
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              let payload = {
                pages: values?.pages,
              };
              if (getAllPages?.data?.[0]?.id) {
                payload.id = getAllPages?.data?.[0]?.id;
              }
              dispatch(createPages(payload)).then((res: any) => {
                if (res?.payload?.status === "success") {
                  toast.success("Page added successfully");
                }
              });
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Grid sm={12} xs={12}>
                  <Box>
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
                          label="Pages"
                        />
                      </Divider>
                    </Box>

                    <FieldArray
                      name="pages"
                      render={(arrayHelpers) => (
                        <div
                          style={{
                            border: "1px solid #CDCCCC",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          {values.pages.map((page, index) => (
                            <Box key={index}>
                              <Grid container sm={12} md={12} xs={12}>
                                <Box m={10}>
                                  <Grid item sm={12} md={12} xs={12} m={3}>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      label="Title"
                                      name={`pages[${index}].title`}
                                    />
                                    {errors.pages &&
                                      errors.pages[index] &&
                                      errors.pages[index].title && (
                                        <div style={{ color: "red" }}>
                                          {errors.pages[index].title}
                                        </div>
                                      )}
                                  </Grid>
                                  <Grid item sm={12} md={12} xs={12} m={3}>
                                    <Field
                                      as={TextField}
                                      fullWidth
                                      label="Slug"
                                      name={`pages[${index}].slug`}
                                    />
                                    {errors.pages &&
                                      errors.pages[index] &&
                                      errors.pages[index].slug && (
                                        <div style={{ color: "red" }}>
                                          {errors.pages[index].slug}
                                        </div>
                                      )}
                                  </Grid>
                                  <Grid item sm={12} md={12} xs={12}>
                                    <Typography marginLeft={2}>
                                      {" "}
                                      Description :
                                    </Typography>
                                    <Field name={`pages[${index}].value`}>
                                      {({ field }) => (
                                        <div style={{ marginBottom: "20px" }}>
                                          <QuillField
                                            setFieldValue={setFieldValue}
                                            field={field}
                                          />
                                        </div>
                                      )}
                                    </Field>
                                  </Grid>
                                  <Grid item sm={12} md={12} xs={12} mt={10}>
                                    <Button
                                      type="button"
                                      variant="contained"
                                      color="error"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      Delete
                                    </Button>
                                  </Grid>
                                </Box>
                              </Grid>
                            </Box>
                          ))}
                          <Grid
                            container
                            sm={12}
                            md={12}
                            xs={12}
                            justifyContent={"center"}
                            alignItems={"center"}
                            marginBottom={2}
                          >
                            <Button
                              type="button"
                              variant="contained"
                              onClick={() =>
                                arrayHelpers.push({ title: "", value: "" })
                              }
                            >
                              Add page
                            </Button>
                          </Grid>
                        </div>
                      )}
                    />
                  </Box>
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
      </Grid>
    </div>
  );
}

export default Index;
