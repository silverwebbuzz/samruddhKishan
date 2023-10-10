import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React from "react";

const ViewDialogBox = ({
  open,
  setOpen,
  handleClickOpen,
  handleClose,
  data,
}: any) => {
  console.log("data", data);
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={{
            IName: data?.IName,
            status: data?.status,
            fullName: data?.fullName,
            mobileNumber: data?.mobileNumber,
            email: data?.email,
            quantity: data?.quantity,
            description: data?.description,
          }}
          onSubmit={(values: any, { resetForm }) => {
            console.log(values, { resetForm });
          }}
        >
          {(props: FormikProps<any>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Grid container gap={3} paddingBottom={5}>
                  <Grid xs={12}>
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
                          label="Inqury Details"
                        />
                      </Divider>
                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Inqury about"
                      autoComplete="off"
                      value={values?.IName}
                      disabled
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="IName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Full Name"
                      autoComplete="off"
                      value={values?.fullName}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="fullName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Mobile Number"
                      autoComplete="off"
                      value={values?.mobileNumber}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="mobileNumber"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Email"
                      autoComplete="off"
                      value={values?.email}
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Quantity"
                      autoComplete="off"
                      value={values?.quantity}
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="quantity"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      disabled
                      label="Description"
                      autoComplete="off"
                      value={values?.description}
                      multiline
                      rows={4}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name="description"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialogBox;
