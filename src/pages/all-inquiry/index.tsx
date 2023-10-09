// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";

import { AppDispatch } from "src/store/store";
import { Ref, forwardRef, ReactElement } from "react";
import Fade, { FadeProps } from "@mui/material/Fade";
import DeleteDialog from "src/views/deleteDialogBox/deleteDialogBox";
import DeleteMultiFieldsDialog from "src/views/deleteDialogBox/deleteMultiFieldsDialog";
import { alpha } from "@mui/system";
import { getAllInquiry, updateInquiry } from "src/slice/inquirySlice";
import UpdateMultiFieldsDialog from "src/views/deleteDialogBox/updateMultipleDialogBox";

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
const allInquiry = () => {
  const { allInquiries, deleteInq, multiDelteInq, updateInq } = useSelector(
    (state: any) => state?.rootReducer?.inquiryReducer
  );
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number | any>(1);
  const [pageLimit, setPageLimit] = useState<number | any>(10);
  const dispatch = useDispatch<AppDispatch>();
  const [DeleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [delelteField, setDelelteField] = useState<string>("");
  const [inquiryStatus, setInquiryStatus] = useState("");
  const [multiFieldUpdateOpen, setMultiFieldUpdateOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false);
  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true);
  const handleMultiDeleteClickClose = () => setMultiFieldDeleteOpen(false);
  const handleMultiUpdateClickOpen = () => setMultiFieldUpdateOpen(true);
  const handleMultiUpdateClickClose = () => {
    setMultiFieldUpdateOpen(false);
  };
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState<any>(null);
  const [IStatus, setIstatus] = useState("");
  const [IServiceType, setIServiceType] = useState("");
  const [IName, setIName] = useState("");
  const handleChange = (event: any, value: number) => {
    setPage(value);
  };
  const CustomPagination = () => {
    return (
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
    );
  };

  useEffect(() => {
    //@ts-ignore
    const userData: any = JSON.parse(localStorage.getItem("userData"));
    let payload = {
      page: page,
      pageSize: pageLimit,
      IName: IName,
      status: IStatus,
      flag: IServiceType,
    };
    //@ts-ignore
    dispatch(getAllInquiry(payload)).then((response) => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit));
    });
  }, [
    page,
    pageCount,
    pageLimit,
    deleteInq,
    multiDelteInq,
    updateInq,
    IName,
    IStatus,
    IServiceType,
  ]);

  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection);
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
      field: "fullName",
      sortable: false,
      minWidth: 220,
      headerName: "Name",
      renderCell: ({ row }: any) => {
        const { fullName } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {fullName}
              </Typography>
            </Box>
          </Box>
        );
      },
    },

    {
      flex: 0.2,
      minWidth: 200,
      field: "flag",
      sortable: false,
      headerName: "Inquiry Type",
      renderCell: ({ row }: any) => {
        const { flag } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {flag == "product"
                  ? "Product"
                  : flag == "service"
                  ? "Service"
                  : "General"}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: "mobileNumber",
      sortable: false,
      headerName: "Mobile Number",
    },
    {
      flex: 0.25,
      minWidth: 100,
      sortable: false,
      field: "email",
      headerName: "Email",
      renderCell: ({ row }: any) => {
        const { email } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "status",
      sortable: false,
      minWidth: 100,
      headerName: "Status",
      renderCell: ({ row }: any) => {
        const { status } = row;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Chip
                label={
                  status === "pending"
                    ? "pending"
                    : status === "progress"
                    ? "progress"
                    : "completed"
                }
                color={
                  status === "pending"
                    ? "error"
                    : status === "progress"
                    ? "warning"
                    : "primary"
                }
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
              aria-controls={`menu-${row.id}`} // Unique ID for each row's menu
              aria-haspopup="true"
              sx={{ color: "text.secondary" }}
              onClick={(event) => {
                // @ts-ignore
                setAnchorEl(event.currentTarget);
                setMenuRow(row);
              }}
            >
              <Icon icon="tabler:menu" />
            </IconButton>
          </Tooltip>
          <Menu
            id={`menu-${row.id}`} // Unique ID for each row's menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && row.id === menuRow?.id}
            onClose={() => setAnchorEl(null)}
          >
            {/* <MenuItem
              onClick={() => {
                handleClickOpenDelete()
                setDeleteID(row?.id)
                setDelelteField(row?.fullName)
              }}
            >
              <Icon icon='tabler:trash' />
              Delete
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                let editPayload: any = {
                  id: row?.id,
                  status: "pending",
                };

                dispatch(updateInquiry(editPayload)).then((res) => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }));
                });
              }}
            >
              Set Pending
            </MenuItem>
            <MenuItem
              onClick={() => {
                let editPayload: any = {
                  id: row?.id,
                  status: "progress",
                };
                dispatch(updateInquiry(editPayload)).then((res) => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }));
                });
              }}
            >
              Set Progress
            </MenuItem>
            <MenuItem
              onClick={() => {
                let editPayload: any = {
                  id: row?.id,
                  status: "completed",
                };
                dispatch(updateInquiry(editPayload)).then((res) => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }));
                });
              }}
            >
              Set Completed
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="All Inquiry" />
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
                value={IName}
                onChange={(e) => {
                  setIName(e?.target?.value);
                }}
                label="Name"
                placeholder="Search by Name"
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="state"
                  value={IStatus}
                  label="Status"
                  onChange={(e: any) => {
                    setIstatus(e?.target?.value);
                  }}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"progress"}>Progress</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Service type</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="state"
                  value={IServiceType}
                  label="Status"
                  onChange={(e: any) => {
                    setIServiceType(e?.target?.value);
                  }}
                >
                  <MenuItem value={"product"}>Product</MenuItem>
                  <MenuItem value={"General"}>General</MenuItem>
                  <MenuItem value={"service"}>Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Button
                onClick={() => {
                  setIstatus("");
                  setIServiceType("");
                  setIName("");
                }}
              >
                {" "}
                Clear
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
                      <Button
                        onClick={() => {
                          handleMultiDeleteClickOpen();
                        }}
                        variant="outlined"
                        startIcon={<Icon icon="tabler:trash" />}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  ) : null}
                </Toolbar>
              </Grid>
            </>
          ) : null}
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: "126px",
                        }}
                      >
                        Select status :{" "}
                      </Typography>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="Status"
                        value={inquiryStatus}
                        sx={{
                          width: "10rem",
                        }}
                        onChange={(e) => {
                          setInquiryStatus(e?.target?.value);
                        }}
                      >
                        <MenuItem value={"pending"}>Set Pending</MenuItem>
                        <MenuItem value={"progress"}>Set Progress</MenuItem>
                        <MenuItem value={"completed"}>Set Completed</MenuItem>
                      </Select>
                    </Box>
                  ) : null}
                  <Button
                    variant="outlined"
                    sx={{
                      marginLeft: 4,
                    }}
                    onClick={() => {
                      handleMultiUpdateClickOpen();
                    }}
                  >
                    Update
                  </Button>
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
            rows={
              allInquiries?.data && allInquiries?.data ? allInquiries?.data : []
            }
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            slots={{
              footer: CustomPagination,
            }}
            disableRowSelectionOnClick
            //@ts-ignore
            hideFooterRowCount
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
        type="inquiry"
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type="inquiry"
        id={selectedRows}
      />
      <UpdateMultiFieldsDialog
        open={multiFieldUpdateOpen}
        setOpen={setMultiFieldUpdateOpen}
        handleClickOpen={handleMultiUpdateClickOpen}
        handleClose={handleMultiUpdateClickClose}
        status={inquiryStatus}
        type="inquiry"
        id={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </Grid>
  );
};

export default allInquiry;
