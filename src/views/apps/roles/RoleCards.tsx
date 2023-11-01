// ** React Imports
import { useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import {
  createRoleAndPermission,
  getAllPermission,
  getAllUsers,
  getRoleAndPermissions,
  updateRoles,
} from "src/slice/farmers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { useSelector } from "react-redux";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import RoleDeleteDialog from "src/views/deleteDialogBox/roleDeleteDialogBox";

interface CardDataType {
  title: string;
  avatars: string[];
  totalUsers: number;
}

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<"Add" | "Edit">("Add");
  const [selectedCheckbox, setSelectedCheckbox] = useState<any[]>([]);
  const [DeleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [delelteField, setDelelteField] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { getRoles, createURole, getPermission, isLoading } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  );
  const [roleEditValue, setRoleEditValue] = useState<any>();
  const handleClickOpen = () => {
    setOpen(true);
    setIsDialogOpen(true);
  };
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = yup.object().shape({
    roleName: yup.string().required("Role Name is required"),
  });
  const handleClose = () => {
    setSelectedCheckbox([]);
    setOpen(false);
    setIsDialogOpen(false);
  };
  const togglePermission = (id: string) => {
    const arr = removeDuplicates(selectedCheckbox);
    if (arr.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      setSelectedCheckbox((prev) => [...prev, id]);
    }
  };
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  useEffect(() => {
    dispatch(getRoleAndPermissions());
    //@ts-ignore
    dispatch(getAllPermission());
  }, [createURole]);

  const removeDuplicates = (arr: any) => {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  };

  const onSubmitClick = (values: any) => {
    if (dialogTitle === "Edit") {
      let payload = {
        id: roleEditValue?.id,
        roleType: values.roleName?.toUpperCase(),
        rolePermission: selectedCheckbox,
      };
      dispatch(updateRoles(payload)).then((res: any) => {
        setSelectedCheckbox([]);
        handleClose();
        if (res) {
          dispatch(getRoleAndPermissions());
          setSelectedCheckbox([]);
        }
      });
    } else {
      if (getPermission?.length > 0) {
        const FilterdArray = () => {
          let Fi: Array<any>[];
          getPermission?.map((Item: any) => {
            removeDuplicates(selectedCheckbox)?.some((ID: any) => {
              if (Item?.id == ID) {
                let finalItem = { ...Item, action: 1 };
                return finalItem;
              }
            });
            Fi = removeDuplicates(selectedCheckbox);
          });
          //@ts-ignore
          return Fi;
        };
        let payload = {
          roleType: values.roleName?.toUpperCase(),
          //@ts-ignore
          rolePermission: removeDuplicates(FilterdArray()),
        };
        dispatch(createRoleAndPermission(payload)).then((res) => {
          setSelectedCheckbox([]);
          handleClose();
          if (res) {
            dispatch(getRoleAndPermissions());
            setSelectedCheckbox([]);
          }
        });
      }
    }
  };
  const checkedCheckbox = () => {
    roleEditValue?.rolePermission &&
      JSON.parse(roleEditValue?.rolePermission)?.map((Item: any) => {
        // setSelectedCheckbox(prev => [...prev, Item])
        selectedCheckbox.push(Item);
      });
  };
  useEffect(() => {
    if (dialogTitle === "Edit") {
      checkedCheckbox();
    } else {
      setSelectedCheckbox([]);
    }
  }, [open, dialogTitle]);

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedCheckbox([]);
    }
  }, [isDialogOpen]);
  console.log("selectedCheckbox", selectedCheckbox);
  //@ts-ignore
  const renderCards = () =>
    getRoles.map((item: any, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {item?.roleType?.toUpperCase()}
                </Typography>
                <Typography
                  href="/"
                  component={Link}
                  sx={{ color: "primary.main", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setRoleEditValue(item);
                    setDialogTitle("Edit");
                    handleClickOpen();
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton
                size="small"
                sx={{ color: "text.disabled" }}
                onClick={() => {
                  handleClickOpenDelete();
                  setDeleteID(item?.id);
                  setDelelteField(item?.roleType);
                }}
              >
                <Icon icon="tabler:trash" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));

  const routesArray = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "fluent-mdl2:b-i-dashboard",
    },
    {
      title: "Farmers",
      path: "/farmers",
      action: "read",
      subject: "farmers",
      icon: "game-icons:farmer",
    },
    {
      title: "Users",
      path: "/users",
      action: "read",
      subject: "users",
      icon: "ci:users",
    },
    {
      title: "Brands",
      path: "/brands",
      action: "read",
      subject: "brands",
      icon: "fluent:production-checkmark-24-regular",
    },
    {
      title: "Categories",
      path: "/categories",
      icon: "tabler:category",
    },
    {
      title: "Products",
      path: "/all-products",
      action: "read",
      subject: "all-products",
      icon: "fluent-mdl2:b-i-dashboard",
    },
    {
      title: "Services",
      path: "/all-services",
      action: "read",
      subject: "all-services",
      icon: "carbon:ibm-cloud-hyper-protect-crypto-services",
    },
    {
      title: "Inquiry",
      path: "/all-inquiry",
      action: "read",
      subject: "inquiry",
      icon: "wpf:ask-question",
    },

    {
      title: "Settings",
      path: "/settings",
      action: "read",
      subject: "settings",
      icon: "uil:setting",
    },
    {
      title: "CMS",
      icon: "fluent:content-view-32-regular",
      children: [
        {
          title: "Home Page",
          path: "/cms/home",
        },
        {
          title: "FAQ",
          path: "/cms/faq",
        },
        {
          title: "Testimonials",
          path: "/cms/testimonials",
        },
        {
          title: "Footer",
          path: "/cms/footer",
        },
      ],
    },

    {
      title: "Roles & Permissions",
      icon: "grommet-icons:user-admin",

      children: [
        {
          title: "Permissions",
          path: "/permissions",
        },
        { title: "role", path: "/roles" },
      ],
    },
  ];
  return (
    <Grid container spacing={6} className="match-height">
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleClickOpen();
            setDialogTitle("Add");
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: 140,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  height={122}
                  alt="add-role"
                  src="/images/pages/add-new-role-illustration.png"
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent sx={{ pl: 0, height: "100%" }}>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 3,
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#5E7954",
                      },
                    }}
                    onClick={() => {
                      handleClickOpen();
                      setDialogTitle("Add");
                    }}
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: "text.secondary" }}>
                    Add role, if it doesn't exist.
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        onClose={handleClose}
        open={open}
      >
        <Formik
          initialValues={
            dialogTitle === "Edit"
              ? {
                  roleName: roleEditValue?.roleType,
                }
              : {
                  roleName: "",
                }
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmitClick(values);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form>
              <DialogTitle
                sx={{
                  textAlign: "center",
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                  pt: (theme) => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`,
                  ],
                }}
              >
                <Typography variant="h5" component="span">
                  {`${dialogTitle} Role`}
                </Typography>
                <Typography variant="body2">Set Role Permissions</Typography>
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: (theme) => `${theme.spacing(5)} !important`,
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                }}
              >
                <Box sx={{ my: 4 }}>
                  <FormControl fullWidth>
                    <TextField
                      label="Role Name"
                      name="roleName"
                      value={values?.roleName}
                      error={Boolean(errors.roleName && touched.roleName)}
                      placeholder="Enter Role Name"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="roleName"
                      render={(msg) => (
                        <div style={{ color: "red" }}>{msg}</div>
                      )}
                    />
                  </FormControl>
                </Box>
                <Typography variant="h6">Role Permissions</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: "0 !important" }}>
                          <Box
                            sx={{
                              display: "flex",
                              fontSize: "0.875rem",
                              whiteSpace: "nowrap",
                              alignItems: "center",
                              textTransform: "capitalize",
                              "& svg": { ml: 1, cursor: "pointer" },
                            }}
                          >
                            Administrator Access
                            <Tooltip
                              placement="top"
                              title="Allows a full access to the system"
                            >
                              <Box sx={{ display: "flex" }}>
                                <Icon
                                  icon="tabler:info-circle"
                                  fontSize="1.25rem"
                                />
                              </Box>
                            </Tooltip>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ pl: "0 !important" }}>
                          <Box
                            sx={{
                              display: "flex",
                              fontSize: "0.875rem",
                              whiteSpace: "nowrap",
                              alignItems: "center",
                              textTransform: "capitalize",
                              "& svg": { ml: 1, cursor: "pointer" },
                            }}
                          >
                            Access
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {dialogTitle === "Add" ? (
                      <TableBody>
                        {getPermission?.map((i: any, index: number) => {
                          const id = i?.id;
                          console.log("--->", i);
                          return (
                            <TableRow
                              key={index}
                              sx={{
                                "& .MuiTableCell-root:first-of-type": {
                                  pl: "0 !important",
                                },
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  color: (theme) =>
                                    `${theme.palette.text.primary} !important`,
                                }}
                              >
                                {i?.moduleName}
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  // label='Access'
                                  control={
                                    <Checkbox
                                      size="small"
                                      id={`${id}`}
                                      onChange={() => togglePermission(`${id}`)}
                                      checked={removeDuplicates(
                                        selectedCheckbox
                                      ).includes(`${id}`)}
                                    />
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : (
                      <TableBody>
                        {getPermission?.map((I: any, Index: number) => {
                          const ID = I?.id;
                          console.log("--->I", I);
                          return (
                            <TableRow
                              key={Index}
                              sx={{
                                "& .MuiTableCell-root:first-of-type": {
                                  pl: "0 !important",
                                },
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  color: (theme) =>
                                    `${theme.palette.text.primary} !important`,
                                }}
                              >
                                {I?.moduleName}
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  // label='Access'
                                  control={
                                    <Checkbox
                                      size="small"
                                      id={`${ID}`}
                                      onChange={() => togglePermission(`${ID}`)}
                                      //@ts-ignore
                                      // checked={checkedCheckbox(ID)}
                                      checked={removeDuplicates(
                                        selectedCheckbox
                                      ).includes(`${ID}`)}
                                    />
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </DialogContent>

              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                  pb: (theme) => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`,
                  ],
                }}
              >
                <Box className="demo-space-x">
                  <Button
                    variant="contained"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#5E7954",
                      },
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <RoleDeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type="role"
        delelteField={delelteField}
        id={DeleteID}
      />
    </Grid>
  );
};

export default RolesCards;
