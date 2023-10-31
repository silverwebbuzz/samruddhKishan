// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Toolbar,
} from "@mui/material";
import {
  createUser1,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getAllUsers,
  getRoleAndPermissions,
  updateUser1,
} from "src/slice/farmers";
import { AppDispatch } from "src/store/store";
import { Ref, forwardRef, ReactElement } from "react";
import Fade, { FadeProps } from "@mui/material/Fade";
import { useRouter } from "next/router";
import { ErrorMessage, Form, Formik } from "formik";
import DeleteDialog from "src/views/deleteDialogBox/deleteDialogBox";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import DeleteMultiFieldsDialog from "src/views/deleteDialogBox/deleteMultiFieldsDialog";
import { alpha } from "@mui/system";
import { userVerifier } from "src/slice/users";
import axios from "axios";

export type Payload = {
  id?: number;
  search?: string;
  page?: number;
  limit?: number;
};
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});
const allUsers = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { getUsers, getRoles, deleteUser, updateUsers12, createUser12 } =
    useSelector((state: any) => state?.rootReducer?.farmerReducer);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [STATE, setSTATE] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [rolePrefill, setRolePrefill] = useState("");

  // const [taluka, setTaluka] = useState('')

  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number | any>(1);
  const [pageLimit, setPageLimit] = useState<number | any>(10);
  const [editPrefillData, setEditPrefillData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [DeleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [delelteField, setDelelteField] = useState<string>("");
  const handleClickOpen = () => {
    setEditPrefillData("");
    setPincode("");
    setOpen(true);
  };
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [ROLEID, setROLEID] = useState(0);
  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true);
  const handleMultiDeleteClickClose = () => setMultiFieldDeleteOpen(false);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name  is required"),
    lastName: yup.string().required("Last name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character"
      ),
  });
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };
  const CustomPagination = () => {
    return userSearch?.length <= 0 ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <label>Row per page</label>
        <FormControl sx={{ m: 1, width: "60px" }}>
          <Select
            size="small"
            defaultValue="10"
            value={pageLimit}
            onChange={(e: any) => {
              setPageLimit(e?.target?.value);
              setPage(1);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>

        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Box>
    ) : (
      <></>
    );
  };

  const handleUserSearch = (e: any) => {
    setUserSearch(e);
    let payload = {
      fullName: e,
    };
    //@ts-ignore
    dispatch(getAllUsers(payload));
  };

  useEffect(() => {
    if (userSearch?.length <= 0) {
      //@ts-ignore
      const userData: any = JSON.parse(localStorage.getItem("userData"));

      let payload = {
        page: page,
        pageSize: pageLimit,
        fullName: userSearch ? userSearch : "",
        roleId: ROLEID,
      };
      //@ts-ignore
      dispatch(getAllUsers(payload)).then((response) => {
        setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit));
      });
    }
  }, [
    page,
    pageCount,
    pageLimit,
    deleteUser,
    updateUsers12,
    userSearch,
    createUser12,
    ROLEID,
  ]);
  useEffect(() => {
    dispatch(getRoleAndPermissions());
  }, []);
  const handleSearch = () => {};
  useEffect(() => {
    dispatch(getAllState());
    localStorage.removeItem("editUserId");
  }, []);
  useEffect(() => {
    dispatch(getAllState());
    dispatch(getRoleAndPermissions());
  }, []);
  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }));
  }, [STATE]);
  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection);
  };
  const handleEdit = (row: any) => {
    localStorage.setItem("editUserId", row?.id);
    router.push("/users/edit-user");
  };

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: "id",
      minWidth: 100,
      sortable: false,
      headerName: "ID",
    },
    {
      flex: 0.25,
      field: "firstName",
      sortable: false,
      minWidth: 320,
      headerName: "Name",
      renderCell: ({ row }: any) => {
        const { firstName, lastName, apmcName, centerName } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(row)}
              >
                {firstName !== ""
                  ? firstName + " " + lastName
                  : centerName !== ""
                  ? centerName
                  : apmcName !== ""
                  ? apmcName
                  : ""}{" "}
              </p>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: "phone",
      sortable: false,
      headerName: "Phone",
    },
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: "city",
      headerName: "District",
      renderCell: ({ row }: any) => {
        const { city, apmcDistrict, centerDistrict } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {city !== ""
                  ? city
                  : centerDistrict !== ""
                  ? centerDistrict
                  : apmcDistrict !== ""
                  ? apmcDistrict
                  : ""}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: "flag",
      headerName: "status",
      renderCell: ({ row }: any) => {
        const { flag, id } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Chip
                label={
                  flag == 0 ? "Unverified" : flag == 2 ? "Pending" : "Verified"
                }
                color={flag == 0 ? "error" : flag == 2 ? "warning" : "primary"}
                onClick={() => {
                  flag !== 1
                    ? dispatch(userVerifier({ id: id, flag: 1 }))
                        .then((res) => {
                          axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/user/sentEmail`,
                            { id: id },
                            {
                              headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "application/json",
                              },
                            }
                          );
                        })
                        .then((res) => {
                          dispatch(getAllUsers({ page: 1, pageSize: 10 }));
                        })
                    : false;
                }}
              />
              <Badge />
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={() => {
                handleClickOpenDelete();
                setDeleteID(row?.id);
                setDelelteField(row?.firstName + " " + row?.lastName);
              }}
            >
              <Icon icon="tabler:trash" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={() => {
                handleEdit(row);
              }}
            >
              <Icon icon="tabler:edit" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="All Users" />

          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              p: (theme) => theme.spacing(2, 5, 4, 5),
            }}
          >
            <Grid item sm={2} xs={12}>
              <TextField
                size="small"
                value={userSearch}
                onChange={(e) => handleUserSearch(e?.target?.value)}
                placeholder="Search…"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 2, display: "flex" }}>
                      <Icon icon="tabler:search" fontSize={20} />
                    </Box>
                  ),
                  endAdornment: (
                    <IconButton
                      size="small"
                      title="Clear"
                      aria-label="Clear"
                      onClick={() => {
                        setUserSearch("");
                      }}
                    >
                      <Icon icon="tabler:x" fontSize={20} />
                    </IconButton>
                  ),
                }}
                sx={{
                  width: {
                    xs: 1,
                    sm: "auto",
                  },
                  "& .MuiInputBase-root > svg": {
                    mr: 2,
                  },
                }}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={ROLEID}
                  label="Role"
                  onChange={(e: any) => {
                    setROLEID(e?.target?.value);
                  }}
                >
                  {getRoles?.map((Item: any) => (
                    <MenuItem key={Item?.id} value={Item?.id}>
                      {Item?.roleType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Button
                onClick={() => {
                  setROLEID(0);
                  setUserSearch("");
                }}
              >
                {" "}
                Clear
              </Button>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#5E7954",
                  },
                  marginLeft: "40px",
                }}
                onClick={() => {
                  router.push("/users/add-user");
                }}
              >
                Add User
              </Button>
            </Grid>
          </Box>
          {selectedRows?.length > 0 ? (
            <>
              <Grid xs={12} sm={12}>
                <Toolbar
                  sx={{
                    px: (theme) => `${theme.spacing(5)} !important`,
                    ...(selectedRows?.length > 0 && {
                      bgcolor: (theme) =>
                        alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                    }),
                  }}
                >
                  <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                  >
                    {selectedRows?.length} selected
                  </Typography>
                  {selectedRows?.length > 0 ? (
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ color: "error" }}
                        onClick={() => {
                          handleMultiDeleteClickOpen();
                          setDeleteID(selectedRows);
                        }}
                      >
                        <Icon icon="tabler:trash" />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </Toolbar>
              </Grid>
            </>
          ) : null}
          <DataGrid
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#a4be9b",
                // color: "red"
              },
            }}
            autoHeight
            pagination
            rows={getUsers?.data && getUsers?.data ? getUsers?.data : []}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            slots={{
              footer: CustomPagination,
            }}
            //@ts-ignore
            hideFooterRowCount
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            hideFooterPagination
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
          />
        </Card>
      </Grid>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type="users"
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type="users"
        id={selectedRows}
      />
    </Grid>
  );
};

export default allUsers;
