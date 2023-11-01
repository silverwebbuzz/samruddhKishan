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
  Theme,
  createStyles,
  makeStyles,
} from "@mui/material";

import { AppDispatch } from "src/store/store";
import { Ref, forwardRef, ReactElement } from "react";
import Fade, { FadeProps } from "@mui/material/Fade";
import DeleteDialog from "src/views/deleteDialogBox/deleteDialogBox";
import { getAllCategories, updateCategory } from "src/slice/categoriesSlice";
import CategoryDialog from "src/views/components/dialogBox/CategoryDialog";
import CollapsibleTable from "src/views/demo/demo";

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

const allCategories = () => {
  const { categories, deleteCat, createCat } = useSelector(
    (state: any) => state?.rootReducer?.categoriesReducer
  );
  const [page, setPage] = useState(1); // Current page number
  const [pageLimit, setPageLimit] = useState<number>(15); // Rows per page
  const [pageCount, setPageCount] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const [DeleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [delelteField, setDelelteField] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [dialogName, setDialogName] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [editID, setEditID] = useState<string | number>("");
  const [editField, setEditField] = useState<string | number>("");

  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  useEffect(() => {
    let payload: any = {
      page: page,
      pageSize: pageLimit,
    };
    dispatch(getAllCategories(payload)).then((response) => {
      setPageCount(Math.ceil(response?.payload?.totalCount / pageLimit));
    });
  }, [page, pageCount, pageLimit, deleteCat, createCat]);

  const handleShow = (dialogName: string) => {
    setShow(true);
    setDialogName(dialogName);
  };
  const handleCancel = () => {
    setShow(false);
    setDialogName("");
    setPage(1);
    setPageLimit(10);
  };
  let props = {
    editField: editField,
    show: show,
    edit: edit,
    editID: editID,
    setEdit: setEdit,
    handleCancel: handleCancel,
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="All Categories" />
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "end",
              p: (theme) => theme.spacing(2, 5, 4, 5),
            }}
          >
            <Button
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#5E7954",
                },
              }}
              onClick={() => {
                handleShow("category");
              }}
            >
              Add Category
            </Button>
          </Box>

          <CollapsibleTable
            data={categories?.data}
            pageLimit={pageLimit}
            setPageLimit={setPageLimit}
            page={page}
            setPage={setPage}
            setPageCount={setPageCount}
            pageCount={pageCount}
          />
        </Card>
      </Grid>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type="categories"
        delelteField={delelteField}
        id={DeleteID}
      />
      {dialogName === "category" && <CategoryDialog {...props} />}
    </Grid>
  );
};

export default allCategories;
