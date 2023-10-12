import Icon from "src/@core/components/icon";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FilePreview } from "src/views/components/filePreviewer/FilePreview";
import {
  updateProductCardSection,
  updateServiceCardSection,
} from "src/slice/productSectionSlice";
import { getAllContent } from "src/slice/contentSectionSlice";

const ServiceContentCardDialog = ({
  show,
  handleCancel,
  edit,
  setEdit,
  editField,
}: any) => {
  const [cardImage, setCardImage] = useState(false);
  const dispatch = useDispatch();

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={show}
      onClose={() => {
        handleCancel();
        setEdit(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>
        {edit ? "Update Service Card" : "Add Service Card"}
      </DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  ServiceContentMainCardImage:
                    editField?.ServiceContentMainCardImage,
                  bigServiceContentSubHeading:
                    editField?.bigServiceContentSubHeading,
                  bigServiceContentText: editField?.bigServiceContentText,
                }
              : {
                  ServiceContentMainCardImage: null,
                  bigServiceContentSubHeading: "",
                  bigServiceContentText: "",
                }
          }
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let cardFormData = new FormData();
            let ID = localStorage.getItem("AllContentDataId");
            cardFormData.append("id", ID);
            if (cardImage) {
              cardFormData.append(
                "serviceContentMainCardImage",
                values?.ServiceContentMainCardImage
              );
            }
            cardFormData.append(
              "bigServiceContentSubHeading",
              values?.bigServiceContentSubHeading
            );
            cardFormData.append(
              "bigServiceContentText",
              values?.bigServiceContentText
            );
            if (edit) {
              cardFormData.append("positionId", editField?.positionId);
            }
            let cardPayload = cardFormData;
            // @ts-ignore
            dispatch(updateServiceCardSection(cardPayload)).then(() => {
              dispatch(getAllContent());
            });
            setEdit(false);
            handleCancel();
            resetForm();
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box>
                      <FilePreview
                        style={{
                          height: "100px",
                        }}
                        file={values.ServiceContentMainCardImage}
                      />
                    </Box>
                    <IconButton color="primary" component="label">
                      <Icon icon="material-symbols:upload" />
                      <input
                        hidden
                        type="file"
                        name={values.ServiceContentMainCardImage}
                        onChange={(e: any) => {
                          setFieldValue(
                            "ServiceContentMainCardImage",
                            e.target?.files[0]
                          );
                          setCardImage(true);
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Service Card Heading"
                    name="bigServiceContentSubHeading"
                    onChange={handleChange}
                    value={values.bigServiceContentSubHeading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Service Card Text"
                    name="bigServiceContentText"
                    onChange={handleChange}
                    value={values.bigServiceContentText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{ mr: 2 }} type="submit" variant="contained">
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setEdit(false);
                      handleCancel();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceContentCardDialog;
