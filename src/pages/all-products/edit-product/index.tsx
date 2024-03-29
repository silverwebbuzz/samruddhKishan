// @ts-nocheck
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Formik,
  Form,
  FormikProps,
  ErrorMessage,
  Field,
  FieldArray,
} from "formik";
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AppDispatch, RootState } from "src/store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { getAllCategories } from "src/slice/categoriesSlice";
import { createService } from "src/slice/servicesSlice";
import { useRouter } from "next/router";
import { getAllBrands } from "src/slice/brandsSlice";
import { toast } from "react-hot-toast";
import { border, borderRadius, display, padding } from "@mui/system";
import { GridDeleteIcon } from "@mui/x-data-grid";
import {
  createProduct,
  deleteProductGallaryImage,
  getAllCountry,
  getAllUnits,
  getProductById,
  updateProduct,
} from "src/slice/productSlice";
import { getAllUsers } from "src/slice/farmers";
import DemoSelect from "src/views/demo/demoSelect";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const editProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { categories } = useSelector(
    (state: any) => state?.rootReducer?.categoriesReducer
  );
  const { getUsers } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  );
  const { brandsData } = useSelector(
    (state: any) => state?.rootReducer?.brandsReducer
  );
  const { allUnitsData, contries, singleProductsData } = useSelector(
    (state: any) => state?.rootReducer?.productReducer
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newSelectedFiles, setNewSelectedFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0);
  const [brandPrefill, setBrandPrefill] = useState("");
  const [contryPrefill, setContryPrefill] = useState("");
  const [productUnits, setProductUnits] = useState("");
  const productID = localStorage.getItem("editProductID");
  const [vendorId, setVendorId] = useState("");
  const [serviceStatusPrefill, setServiceStatusPrefill] = useState(0);
  const ProfilePicture = styled("img")(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));

  // ** State
  const handleProduct = (values: any, { resetForm }: any) => {
    let formdata = new FormData();
    formdata.append("id", productID);
    formdata.append("vendorId", vendorId ? vendorId : 0);
    formdata.append("categoryId", categoryIdPrefill ? categoryIdPrefill : 0);
    formdata.append("productName", values?.productName);
    formdata.append("brandId", brandPrefill ? brandPrefill : 0);
    formdata.append("productShort", values?.productShort);
    formdata.append("specification", JSON.stringify(values?.specifications));
    formdata.append("producctVideoUrl", values?.producctVideoUrl);
    formdata.append("productDescription", values?.productDescription);
    formdata.append("productCode", values?.productCode);
    formdata.append("productImage", values?.productImage);
    formdata.append("availbilityStock", values?.availbilityStock);
    formdata.append("minPrice", values?.minPrice);
    formdata.append("maxPrice", values?.maxPrice);
    formdata.append("productUnits", productUnits);
    formdata.append("country", values?.country);
    // formdata.append("status", values?.status);
    formdata.append("status", serviceStatusPrefill);
    formdata.append("addToHome", values?.addToHome ? 1 : 0);
    newSelectedFiles.forEach((file, index) => {
      formdata.append(`productGallaryImage`, file);
    });
    let payload = formdata;
    let payloadForDeleteImages = {
      ids: removeFiles,
    };
    dispatch(updateProduct(payload)).then((res) => {
      if (removeFiles?.length > 0) {
        dispatch(deleteProductGallaryImage(payloadForDeleteImages)).then(
          (res) => {
            setSelectedFiles([]);
            setNewSelectedFiles([]);
            setRemoveFiles([]);
          }
        );
      }
      if (res?.payload?.status === "success") {
        setSelectedFiles([]);
        router.push("/all-products");
      }
    });
  };

  const modules = {
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
  };
  // Validations
  const validationSchema = yup.object({
    productName: yup.string().required("Product name is required"),
  });
  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };
  const FilePreview = ({ file, onRemove }: any) => {
    if (isValidUrl(file)) {
      return (
        <Box>
          <ProfilePicture src={file} alt="profile-picture" />
        </Box>
      );
    } else {
      if (file?.type?.startsWith("image")) {
        return (
          <Box>
            <ProfilePicture
              src={URL.createObjectURL(file)}
              alt="profile-picture"
            />
          </Box>
        );
      } else {
        return (
          <Box>
            <ProfilePicture
              src={
                "/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg"
              }
              alt="profile-picture"
            />
          </Box>
        );
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Only allow selecting one file at a time
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
    setNewSelectedFiles((prevNewSelectedFiles) => [
      ...prevNewSelectedFiles,
      file,
    ]);
  };
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(getAllUsers());
    dispatch(getAllCountry());
    dispatch(getAllUnits());
    dispatch(getProductById({ id: productID }));
  }, []);

  useEffect(() => {
    console.log(
      "bapuuuuu",
      singleProductsData?.status || "",
      singleProductsData?.status
    );
    setTimeout(() => {
      setCategoryIdPrefill(singleProductsData?.categoryId || 0);
      setBrandPrefill(singleProductsData?.brandId || "");
      setVendorId(singleProductsData?.vendorId || "");
      setContryPrefill(singleProductsData?.country || "");
      setProductUnits(singleProductsData?.productUnits || "");
      setServiceStatusPrefill(singleProductsData?.status);
      const productGallaryImage = singleProductsData?.productGallaryImage;
      if (productGallaryImage && productGallaryImage.length !== undefined) {
        setSelectedFiles([...productGallaryImage]);
      }
    }, 1000);
  }, [
    singleProductsData?.categoryId,
    singleProductsData?.vendorId,
    singleProductsData?.brandId,
    singleProductsData?.productName,
    singleProductsData?.country,
    singleProductsData?.productUnits,
    singleProductsData?.productGallaryImage,
    singleProductsData?.status, // Include this dependency
  ]);

  const handleRemoveFile = (indexToRemove: any, id: any) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setRemoveFiles([...removeFiles, id]);
  };
  const ImagePreviewer = ({ file, index }) => {
    if (isValidUrl(file?.file?.file)) {
      return (
        <div key={index} style={{ padding: 15 }}>
          <img
            src={file?.file?.file}
            style={{
              objectFit: "contained",
              width: "100px",
              height: "100px",
              aspectRatio: "1",
            }}
            alt={`File ${file?.index}`}
            width="150px"
            height="auto"
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              handleRemoveFile(file?.index, file?.file?.id);
            }}
          >
            <GridDeleteIcon />
          </IconButton>
        </div>
      );
    } else {
      if (file?.file?.type?.startsWith("image")) {
        return (
          <div key={index} style={{ padding: 15 }}>
            <img
              src={URL.createObjectURL(file?.file)}
              style={{
                objectFit: "contained",
                width: "100px",
                height: "100px",
                aspectRatio: "1",
              }}
              alt={`File ${index}`}
              width="150px"
              height="auto"
            />
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                handleRemoveFile(index);
              }}
            >
              <GridDeleteIcon />
            </IconButton>
          </div>
        );
      }
    }
  };
  const checkValidJson = (val: any) => {
    try {
      return JSON.parse(val);
    } catch (e) {
      return [];
    }
  };
  const userFilter = (users: any) => {
    return users?.filter((user: any) => user.role === "VENDORS");
  };
  return (
    <Card
      sx={{
        padding: 5,
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          vendorName: singleProductsData?.vendorName,
          productName: singleProductsData?.productName,
          categoryId: singleProductsData?.categoryId,
          brandId: singleProductsData?.brandId,
          productShort: singleProductsData?.productShort,
          specifications: checkValidJson(singleProductsData?.specification),
          producctVideoUrl: singleProductsData?.producctVideoUrl,
          productCode: singleProductsData?.productCode,
          productDescription: singleProductsData?.productDescription,
          productImage: singleProductsData?.productImage,
          availbilityStock: singleProductsData?.availbilityStock,
          minPrice: singleProductsData?.minPrice,
          maxPrice: singleProductsData?.maxPrice,
          productUnits: singleProductsData?.productUnits,
          country: singleProductsData?.country,
          // serviceStatus: singleProductsData?.status,
          serviceStatus: singleProductsData?.status === 1 ? true : false,
          addToHome: singleProductsData?.addToHome === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          handleProduct(values, { resetForm });
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
                    label="Product Details"
                  />
                </Divider>
              </Box>
              <Grid container spacing={5}>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <DemoSelect
                      data={categories?.data}
                      size={"medium"}
                      //@ts-ignore
                      selectedCategory={categoryIdPrefill}
                      //@ts-ignore
                      setSelectedCategory={setCategoryIdPrefill}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Vendor Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="vendorId"
                      value={vendorId}
                      label="Vendor Name"
                      onChange={(e: any) => {
                        setVendorId(e?.target?.value);
                      }}
                    >
                      {userFilter(getUsers?.data)?.map((Item: any) => (
                        <MenuItem key={Item?.id} value={Item?.id}>
                          {Item?.firstName} {Item?.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Brand
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="brandId"
                      value={brandPrefill}
                      label="Select Brand"
                      onChange={(e: any) => {
                        setFieldValue("brandId", e?.target?.value);
                        setBrandPrefill(e?.target?.value);
                      }}
                    >
                      {brandsData?.data?.map((Item: any) => (
                        <MenuItem key={Item?.brandName} value={Item?.id}>
                          {Item?.brandName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Product Name"
                    autoComplete="off"
                    value={values?.productName}
                    type="text"
                    helperText={
                      errors?.productName && touched?.productName
                        ? errors?.productName
                        : ""
                    }
                    error={
                      errors?.productName && touched?.productName ? true : false
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="productName"
                    placeholder={"Add Product Name"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Product Code(SKU)"
                    autoComplete="off"
                    value={values?.productCode}
                    type="text"
                    helperText={
                      errors?.productCode && touched?.productCode
                        ? errors?.productCode
                        : ""
                    }
                    error={
                      errors?.productCode && touched?.productCode ? true : false
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="productCode"
                    placeholder={"Product Code(SKU)"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Product Video URL"
                    autoComplete="off"
                    value={values?.producctVideoUrl}
                    type="text"
                    helperText={
                      errors?.producctVideoUrl && touched?.producctVideoUrl
                        ? errors?.producctVideoUrl
                        : ""
                    }
                    error={
                      errors?.producctVideoUrl && touched?.producctVideoUrl
                        ? true
                        : false
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="producctVideoUrl"
                    placeholder={"Product Video URL"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Availability(Stock)"
                    autoComplete="off"
                    value={values?.availbilityStock}
                    type="number"
                    helperText={
                      errors?.availbilityStock && touched?.availbilityStock
                        ? errors?.availbilityStock
                        : ""
                    }
                    error={
                      errors?.availbilityStock && touched?.availbilityStock
                        ? true
                        : false
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="availbilityStock"
                    placeholder={"Availability(Stock)"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Products Unit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="brandId"
                      value={productUnits}
                      label="Products Unit"
                      onChange={(e: any) => {
                        setFieldValue("brandId", e?.target?.value);
                        setProductUnits(e?.target?.value);
                      }}
                    >
                      {allUnitsData?.units?.map((Item: any) => (
                        <MenuItem key={Item} value={Item}>
                          {Item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Minimum Price"
                    autoComplete="off"
                    value={values?.minPrice}
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="minPrice"
                    placeholder={"Minimum Price"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label="Maximum Price"
                    autoComplete="off"
                    value={values?.maxPrice}
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="maxPrice"
                    placeholder={"Maximum Price"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country of origin
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="country"
                      value={contryPrefill}
                      label="Country of origin"
                      onChange={(e: any) => {
                        setFieldValue("country", e?.target?.value);
                        setContryPrefill(e?.target?.value);
                      }}
                    >
                      {contries?.data?.map((Item: any) => (
                        <MenuItem key={Item?.name} value={Item?.name}>
                          {Item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Product Short Description"
                    autoComplete="off"
                    rows={4}
                    multiline
                    value={values?.productShort}
                    type="text"
                    helperText={
                      errors?.productShort && touched?.productShort
                        ? errors?.productShort
                        : ""
                    }
                    error={
                      errors?.productShort && touched?.productShort
                        ? true
                        : false
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name="productShort"
                    placeholder={"Product Short Description"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Box
                    sx={{
                      border: "1px solid #e9e9ea",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography variant="h6" align="center">
                      Upload Product Image
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <FilePreview file={values.productImage} />
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Button
                          variant="contained"
                          component="label"
                          sx={{
                            mr: 1,
                            "&:hover": {
                              backgroundColor: "#5E7954",
                            },
                          }}
                        >
                          Upload
                          <input
                            type="file"
                            hidden
                            onChange={(e) => {
                              setFieldValue("productImage", e.target?.files[0]);
                            }}
                          />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Box
                    sx={{
                      border: "1px solid #e9e9ea",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography variant="h6" align="center">
                      Specifications
                    </Typography>
                    <FieldArray
                      name="specifications"
                      render={(arrayHelpers) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          {values &&
                            values?.specifications?.map(
                              (specification, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Field
                                    as={TextField}
                                    label="Title"
                                    variant="outlined"
                                    sx={{
                                      margin: 3,
                                    }}
                                    name={`specifications[${index}].title`}
                                  />
                                  <Field
                                    as={TextField}
                                    label="Value"
                                    variant="outlined"
                                    sx={{
                                      margin: 3,
                                    }}
                                    name={`specifications.${index}.value`}
                                  />
                                  <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )
                            )}
                          <Button
                            type="button"
                            variant="contained"
                            onClick={() =>
                              arrayHelpers.push({ title: "", value: "" })
                            }
                          >
                            Add Specification
                          </Button>
                        </div>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <Grid item sm={12} xs={12}>
                    <Typography variant="h6">
                      Product Full Description :
                    </Typography>
                    <Field
                      sx={{ marginTop: "10px", marginBottom: "20px" }}
                      name="productDescription"
                    >
                      {({ field }: any) => (
                        <div
                          style={{
                            marginBottom: "20px",
                          }}
                        >
                          <ReactQuill
                            style={{
                              height: "200px",
                              margin: "20px",
                            }}
                            modules={modules}
                            value={field.value}
                            onChange={field.onChange(field.name)}
                          />
                        </div>
                      )}
                    </Field>
                  </Grid>
                </Grid>

                <Grid xs={12}>
                  <div
                    styele={{
                      border: "1px solid #e9e9ea",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: " 60px 22px 0px 43px",
                        border: "1px solid #e9e9ea",
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {selectedFiles.length > 0 ? (
                          selectedFiles?.map((file, index) => {
                            return (
                              <ImagePreviewer
                                key={index}
                                file={{ file: file, index: index }}
                              />
                            );
                          })
                        ) : (
                          <ProfilePicture
                            src={
                              "/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg"
                            }
                            alt="profile-picture"
                          />
                        )}
                      </div>
                      <div>
                        <input
                          id="file-input"
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file-input">
                          <Button component="span">Select File</Button>
                        </label>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.addToHome}
                        onChange={(e) =>
                          setFieldValue("addToHome", e.target?.checked)
                        }
                      />
                    }
                    name="addToHome"
                    label="Add To Home Page"
                    sx={{
                      marginLeft: 4,
                    }}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Select Status</InputLabel>
                    <Select
                      // size='small'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="serviceStatus"
                      label="Select Status"
                      value={serviceStatusPrefill}
                      onChange={(e) => {
                        setFieldValue("serviceStatus", e?.target?.value);
                        setServiceStatusPrefill(e?.target?.value);
                      }}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ marginTop: "25px" }}>
                    <Button type="submit" variant="contained" size="medium">
                      Save
                    </Button>
                    <Button
                      color="error"
                      sx={{ marginLeft: "10px" }}
                      size="medium"
                      variant="contained"
                      onClick={() => {
                        router.push("/all-products");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default editProduct;
