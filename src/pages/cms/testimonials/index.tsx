// import { Grid } from '@mui/material'

// const Testimonials = () => {
//   return (
//     <div>
//       <Grid container spacing={6}>
//         <h1>Testimonials</h1>
//       </Grid>
//     </div>
//   )
// }

// export default Testimonials
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllContent } from "src/slice/contentSectionSlice";
import { qaSectionUpdate } from "src/slice/faqSlice";
import { updateTestimonialsImages } from "src/slice/testimonialsSlice";
import { AppDispatch } from "src/store/store";
import FaqDialog from "src/views/components/dialogBox/FaqDialog";
import TestimonialsDialog from "src/views/components/dialogBox/TestimonialsDialog";
import { FilePreview } from "src/views/components/filePreviewer/FilePreview";
import DeleteDialog from "src/views/deleteDialogBox/deleteDialogBox";

const index = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [show, setShow] = useState<boolean>(false);
  const [dialogName, setDialogName] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [editField, setEditField] = useState<string | number>("");
  const [DeleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [delelteField, setDelelteField] = useState<string>("");
  const [TestimonialImages, setTestimonialImages] = useState({
    testimonialImg1: "",
    testimonialImg2: "",
    testimonialImg3: "",
    testimonialImg4: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { allContentData } = useSelector(
    (state: any) => state?.rootReducer?.contentSectionReducer
  );
  const { updatedFaq } = useSelector(
    (state: any) => state?.rootReducer?.faqReducer
  );
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleShow = (dialogName: string) => {
    setShow(true);
    setDialogName(dialogName);
  };
  const handleCancel = () => {
    setShow(false);
    setDialogName("");
  };

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return [];
    }
    return JSON.parse(data);
  };
  let props = {
    editField: editField,
    show: show,
    edit: edit,
    setEdit: setEdit,
    handleCancel: handleCancel,
  };
  const handleImageChange = (filename: string, file: File) => {
    setTestimonialImages({ ...TestimonialImages, [filename]: file });
    const ID = localStorage.getItem("AllContentDataId");
    const formData = new FormData();
    formData.append("id", ID);
    formData.append(`${filename}`, file);

    dispatch(updateTestimonialsImages(formData));
  };
  useEffect(() => {
    dispatch(getAllContent());
  }, [updatedFaq]);
  useEffect(() => {
    if (allContentData) {
      setTestimonialImages({
        testimonialImg1: allContentData?.testimonialImg1,
        testimonialImg2: allContentData?.testimonialImg2,
        testimonialImg3: allContentData?.testimonialImg3,
        testimonialImg4: allContentData?.testimonialImg4,
      });
    }
  }, [allContentData]);
  return (
    <>
      <Card>
        <Grid>
          <CardHeader>Testimonials</CardHeader>
          <CardContent>
            <Box mt={8}>
              {/* <Typography fontWeight={500} fontSize={20} mb={2}>
                Questions & Feedbacks
              </Typography> */}

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography fontWeight={500} fontSize={25} mb={2}>
                  Upload Testimonials Images
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  m={5}
                >
                  <Box m={2} ml={3} alignItems="center">
                    <Box
                      sx={{
                        border: "1px solid",
                        borderRadius: "5px",
                        width: 150,
                        height: 150,
                        // mr: 3
                      }}
                    >
                      <FilePreview
                        file={TestimonialImages?.testimonialImg1}
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                    <Button size="large" color="primary" component="label">
                      Upload
                      <input
                        hidden
                        type="file"
                        onChange={(e: any) => {
                          handleImageChange(
                            "testimonialImg1",
                            e.target?.files[0]
                          );
                        }}
                      />
                    </Button>
                  </Box>
                  <Box m={2} ml={3} alignItems="center">
                    <Box
                      sx={{
                        border: "1px solid",
                        width: 150,
                        height: 150,
                        // mr: 3
                      }}
                    >
                      <FilePreview file={TestimonialImages?.testimonialImg2} />
                    </Box>
                    <Button size="large" color="primary" component="label">
                      Upload
                      <input
                        hidden
                        type="file"
                        onChange={(e: any) => {
                          handleImageChange(
                            "testimonialImg2",
                            e.target?.files[0]
                          );
                        }}
                      />
                    </Button>
                  </Box>
                  <Box m={2} ml={3} alignItems="center">
                    <Box
                      sx={{
                        border: "1px solid",
                        width: 150,
                        height: 150,
                        // mr: 3
                      }}
                    >
                      <FilePreview file={TestimonialImages?.testimonialImg3} />
                    </Box>
                    <Button size="large" color="primary" component="label">
                      Upload
                      <input
                        hidden
                        type="file"
                        onChange={(e: any) => {
                          handleImageChange(
                            "testimonialImg3",
                            e.target?.files[0]
                          );
                        }}
                      />
                    </Button>
                  </Box>
                  <Box m={2} ml={3} alignItems="center">
                    <Box
                      sx={{
                        border: "1px solid",
                        width: 150,
                        height: 150,
                        // mr: 3
                      }}
                    >
                      <FilePreview file={TestimonialImages?.testimonialImg4} />
                    </Box>
                    <Button size="large" color="primary" component="label">
                      Upload
                      <input
                        hidden
                        type="file"
                        onChange={(e: any) => {
                          handleImageChange(
                            "testimonialImg4",
                            e.target?.files[0]
                          );
                        }}
                      />
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item>
                <Box
                  sx={{
                    border: "1px solid #b5b4b9",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Typography fontWeight={500} fontSize={25} mb={2}>
                    Testimonials
                  </Typography>

                  {JSONHandler(allContentData?.testimonialCard)?.map(
                    (value: any, index: number) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          border: "1px solid #b5b4b9",
                          borderRadius: "10px",
                          alignItems: "center",
                          padding: 7,
                          margin: 5,
                        }}
                      >
                        <Box
                          sx={{
                            // marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "row",
                            }}
                          >
                            <TextField
                              disabled
                              fullWidth
                              size="small"
                              label="Person Name"
                              placeholder="Person Name"
                              value={value?.testimonialPersonName}
                              name="testimonialPersonName"
                              sx={{
                                margin: "0px 10px 0px 10px",
                              }}
                            />
                            <TextField
                              disabled
                              fullWidth
                              size="small"
                              label="Person Role"
                              placeholder="Person Role"
                              value={value?.testimonialPersonRole}
                              name="testimonialPersonRole"
                              sx={{
                                margin: "0px 10px 0px 10px",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              marginTop: 5,
                            }}
                          >
                            <TextField
                              disabled
                              fullWidth
                              multiline
                              minRows={2}
                              maxRows={4}
                              size="small"
                              label="Description"
                              placeholder="Description"
                              value={value?.testimonialDescription}
                              sx={{
                                margin: "0px 10px 0px 10px",
                              }}
                              name="testimonialDescription"
                            />
                          </Box>
                        </Box>

                        <Box>
                          <Tooltip title="Edit">
                            <IconButton
                              size="medium"
                              sx={{ color: "text.secondary", fontSize: "30px" }}
                              onClick={() => {
                                handleShow("Testimonials");
                                setEdit(true);
                                setEditField(value);
                              }}
                            >
                              <Icon icon="tabler:edit" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              sx={{ color: "text.secondary", fontSize: "30px" }}
                              onClick={() => {
                                handleClickOpenDelete();
                                setDeleteID(value?.positionId);
                              }}
                            >
                              <Icon icon="tabler:trash" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    )
                  )}
                  <Button
                    sx={{ my: 5 }}
                    color="inherit"
                    variant="contained"
                    type="button"
                    onClick={() => handleShow("Testimonials")}
                  >
                    Add Testimonial
                  </Button>
                </Box>
              </Grid>
            </Box>
          </CardContent>
        </Grid>
        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          handleClickOpen={handleClickOpenDelete}
          handleClose={handleDeleteClose}
          type="testimonials"
          delelteField={delelteField}
          id={DeleteID}
        />
      </Card>

      {dialogName === "Testimonials" && <TestimonialsDialog {...props} />}
    </>
  );
};

export default index;
