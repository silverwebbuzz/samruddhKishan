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
import { updateCardContent } from "src/slice/contentSectionSlice";
import { FilePreview } from "src/views/components/filePreviewer/FilePreview";

const CardContentDialog = ({
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
      <DialogTitle>{edit ? "Update Card" : "Add Card"}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  contentCardImage: editField?.contentCardImage,
                  contentCardHeading: editField?.contentCardHeading,
                  contentCardText: editField?.contentCardText,
                }
              : {
                  contentCardImage: "",
                  contentCardHeading: "",
                  contentCardText: "",
                }
          }
          onSubmit={(values, { resetForm }) => {
            let cardFormData = new FormData();
            let ID = localStorage.getItem("AllContentDataId");
            cardFormData.append("id", ID);
            if (cardImage) {
              cardFormData.append("contentCardImage", values?.contentCardImage);
            }
            cardFormData.append(
              "contentCardHeading",
              values?.contentCardHeading
            );
            cardFormData.append("contentCardText", values?.contentCardText);
            if (edit) {
              cardFormData.append("positionId", editField?.positionId);
            }
            let cardPayload = cardFormData;
            // @ts-ignore
            dispatch(updateCardContent(cardPayload));
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
                    <Box width={100} height={80}>
                      <FilePreview file={values.contentCardImage} />
                    </Box>
                    <IconButton color="primary" component="label">
                      <Icon icon="material-symbols:upload" />
                      <input
                        hidden
                        type="file"
                        name={values.contentCardImage}
                        onChange={(e: any) => {
                          setFieldValue("contentCardImage", e.target?.files[0]);
                          setCardImage(true);
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content Card Heading"
                    name="contentCardHeading"
                    onChange={handleChange}
                    value={values.contentCardHeading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content Card Text"
                    name="contentCardText"
                    onChange={handleChange}
                    value={values.contentCardText}
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

export default CardContentDialog;
