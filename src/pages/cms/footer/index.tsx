//@ts-nocheck
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllContent } from "src/slice/contentSectionSlice";
import { footerUpdate, getFooter } from "src/slice/footerSlice";
import CardContentDialog from "src/views/components/dialogBox/CardContentDialog";

const Footer = () => {
  const dispatch = useDispatch();
  const { getAllFooter } = useSelector(
    (state: any) => state?.rootReducer?.footerReducer
  );
  //   footerReducer

  const handleSubmit = (values: any) => {
    dispatch(footerUpdate(values)).then((res) => {
      if (res?.payload?.status === "success") {
        toast.success("Footer content updated successfully");
      }
    });
  };

  useEffect(() => {
    dispatch(getFooter());
  }, []);
  return (
    <div>
      <Card>
        <CardHeader title="Footer" />
        <CardContent>
          <Formik
            initialValues={{
              footerContent: getAllFooter?.footerContent,
              contactAddress: getAllFooter?.contactAddress,
              contactEmail: getAllFooter?.contactEmail,
              contactPhone: getAllFooter?.contactPhone,
              waterMark: getAllFooter?.waterMark,
              termsLink: getAllFooter?.termsLink,
              privacyLink: getAllFooter?.privacyLink,
              supportLink: getAllFooter?.supportLink,
            }}
            enableReinitialize
            onSubmit={(values) => {
              let ID = getAllFooter?.id;
              values.id = ID;
              handleSubmit(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <Grid container gap={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      maxRows={4}
                      label="Content"
                      name="footerContent"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      value={values?.footerContent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6"> Contact Details</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      maxRows={4}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="text"
                      label="Contact Address"
                      name="contactAddress"
                      onChange={handleChange}
                      value={values?.contactAddress}
                    />
                  </Grid>
                  <Grid container xs={12} spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        // multiline
                        // minRows={2}
                        // maxRows={4}
                        type="email"
                        label="Email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="contactEmail"
                        onChange={handleChange}
                        value={values?.contactEmail}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        // multiline
                        // minRows={2}
                        // maxRows={4}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        label="Phone Number"
                        name="contactPhone"
                        onChange={handleChange}
                        value={values?.contactPhone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={3} mb={3}>
                  <Typography variant="h6"> Other Details</Typography>
                </Grid>
                <Grid container xs={12} spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Water Mark"
                      name="waterMark"
                      onChange={handleChange}
                      value={values?.waterMark}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Terms Link"
                      name="termsLink"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      value={values?.termsLink}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Privacy Link"
                      name="privacyLink"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      value={values?.privacyLink}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Support Link"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="supportLink"
                      onChange={handleChange}
                      value={values?.supportLink}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={3} mb={3}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          {/* <Box mt={8}>
            <Typography fontWeight={500} fontSize={20} mb={2}>
              Add Card
            </Typography>
            <Grid container rowSpacing={3}>
              {cardContentData?.map((value: any, index: number) => (
                <Grid item container key={index} spacing={3} alignItems={'center'}>
                  <Grid item sm={2} xs={12}>
                    <Box width={100} height={60} display={'flex'} alignItems={'center'}>
                      <FilePreview file={value.contentCardImage} />
                    </Box>
                  </Grid>

                  <Grid item sm={3} xs={12}>
                    <TextField
                      disabled
                      fullWidth
                      size='small'
                      placeholder='Card Heading'
                      value={value?.contentCardHeading}
                      name='contentCardHeading'
                    />
                  </Grid>

                  <Grid item sm={3} xs={12}>
                    <TextField
                      disabled
                      fullWidth
                      placeholder='Card Text'
                      size='small'
                      value={value?.contentCardText}
                      name='contentCardText'
                    />
                  </Grid>
                  {value?.positionId ? (
                    <Grid item sm={3} xs={12}>
                      <Tooltip title='Edit'>
                        <IconButton
                          size='small'
                          sx={{ color: 'text.secondary' }}
                          onClick={() => {
                            handleShow('cardContents')
                            setEdit(true)
                            setEditField(value)
                          }}
                        >
                          <Icon icon='tabler:edit' />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  ) : null}
                </Grid>
              ))}
              {cardContentData?.length <= 1 ? (
                <Button
                  sx={{ my: 5 }}
                  variant='contained'
                  color='inherit'
                  type='button'
                  onClick={() => handleShow('cardContents')}
                >
                  Add Card
                </Button>
              ) : (
                ''
              )}
            </Grid>
          </Box> */}
        </CardContent>
        {/* {'dialogName' === 'cardContents' && <CardContentDialog {...props} />} */}
      </Card>
    </div>
  );
};

export default Footer;
