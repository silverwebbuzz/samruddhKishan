// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, CardContent, Stack } from '@mui/material'

import { AppDispatch } from 'src/store/store'
import { FieldArray, Form, Formik } from 'formik'
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import * as yup from 'yup'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'

import SliderContentDialog from 'src/views/components/dialogBox/SliderContentDialog'
import { getAllSlides } from 'src/slice/sliderSlice'
import { getAllContent, updateContent } from 'src/slice/contentSectionSlice'

import { FilePreview } from '../../views/components/filePreviewer/FilePreview'
import { getAllProductSection, updateProductContentSection } from 'src/slice/productSectionSlice'
import CardContentDialog from 'src/views/components/dialogBox/CardContentDialog'
import ProductContentCard from 'src/views/components/dialogBox/ProductContentCard'
import SmallProductCard from 'src/views/components/dialogBox/SmallProductCard'
import { getAllSmallProduct, updateSmallProductContent } from 'src/slice/smallProductSlice'

export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}

const ContentPage = () => {
  const { allSliderData, deleteSliderData, createSliderData, updateSliderData } = useSelector(
    (state: any) => state?.rootReducer?.sliderReducer
  )
  const { allContentData, updateContentData, updateCardContentData } = useSelector(
    (state: any) => state?.rootReducer?.contentSectionReducer
  )

  const { allProductSectionData, updateProductCardSectionData, updateProductContentSectionData } = useSelector(
    (state: any) => state?.rootReducer?.productSectionReducer
  )

  const { getAllSmallProductData, updateSmallProductCardData, updateSmallProductContentData } = useSelector(
    (state: any) => state?.rootReducer?.smallProductReducer
  )

  const dispatch = useDispatch<AppDispatch>()
  const [DeleteID, setDeleteID] = useState()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [delelteField, setDelelteField] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [dialogName, setDialogName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [editField, setEditField] = useState<string | number>('')
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  useEffect(() => {
    dispatch(getAllSlides())
  }, [deleteSliderData, createSliderData, updateSliderData])

  useEffect(() => {
    dispatch(getAllContent())
  }, [updateContentData, updateCardContentData])

  useEffect(() => {
    dispatch(getAllProductSection())
  }, [updateProductCardSectionData, updateProductContentSectionData])

  useEffect(() => {
    dispatch(getAllSmallProduct())
  }, [updateSmallProductContentData, updateSmallProductCardData])
  useEffect(() => {
    if (allContentData) {
      console.log(allContentData)
      localStorage.setItem('AllContentDataId', allContentData?.id)
    }
  }, [allContentData])

  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)

  const handleShow = (dialogName: string) => {
    setShow(true)
    setDialogName(dialogName)
  }
  const handleCancel = () => {
    setShow(false)
    setDialogName('')
  }

  let props = {
    editField: editField,
    show: show,
    edit: edit,
    setEdit: setEdit,
    handleCancel: handleCancel
  }

  const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row?.sliderImages?.length) {
      return <CustomAvatar src={`${row?.sliderImages}`} sx={{ mr: 3, width: '2.575rem', height: '2.575rem' }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={color as ThemeColor}
          sx={{ mr: 3, fontSize: '.8rem', width: '2.575rem', height: '2.575rem' }}
        >
          {/* {getInitials(row.full_name ? row.full_name : 'John Doe')} */}
        </CustomAvatar>
      )
    }
  }
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'sliderNumber',
      minWidth: 100,
      sortable: false,
      headerName: 'Position Id'
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'sliderImages',
      headerName: 'Slider Image',
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
      }
    },
    {
      flex: 0.25,
      field: 'sliderMainHeaderWithColor',
      sortable: false,
      minWidth: 320,
      headerName: 'Slider Main-Header',
      renderCell: ({ row }: any) => {
        const { sliderMainHeaderWithColor } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {sliderMainHeaderWithColor}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleClickOpenDelete()
                setDeleteID(row?.id)
                setDelelteField(row?.sliderMainHeaderWithColor)
              }}
            >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleShow('slider')
                setEdit(true)
                setEditField(row)
              }}
            >
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // SECTION 2
  const cardData = allContentData && allContentData ? allContentData?.contentCards : ''
  const cardContentData = cardData
    ? JSON.parse(cardData)
    : [{ contentCardImage: '', contentCardHeading: '', contentCardText: '' }]

  // SECTION 3
  const productCardData =
    allProductSectionData && allProductSectionData[0] ? allProductSectionData[0]?.bigProductContentCard : ''
  const productContentCardData = productCardData
    ? JSON.parse(productCardData)
    : [{ productContentMainCardImage: '', bigProductContentSubHeading: '', bigProductContentText: '' }]

  // SECTION 4
  const smallCardArray =
    getAllSmallProductData && getAllSmallProductData[0] ? getAllSmallProductData[0]?.smallProductContentCard : ''
  const smallCardData = smallCardArray
    ? JSON.parse(smallCardArray)
    : [{ smallProductContentCardImage: '', productContentName: '' }]

  return (
    <Grid container spacing={6}>
      {/* SECTION  =   1 */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Section 1' sx={{ pb: 2 }} />
          <Box textAlign='end' sx={{ p: theme => theme.spacing(0, 5, 4, 5) }}>
            <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => {
                handleShow('slider')
              }}
            >
              Add Slide
            </Button>
          </Box>

          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
                // color: "red"
              }
            }}
            autoHeight
            rows={allSliderData?.data && allSliderData?.data ? allSliderData?.data : []}
            columns={columns}
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

      <Grid item xs={12}>
        {/* SECTION  =   2 */}
        <Card>
          <CardHeader title='Section 2' />
          <CardContent>
            <Formik
              enableReinitialize
              initialValues={{
                contentHeader: allContentData?.contentHeader || '',
                contentText: allContentData?.contentText || '',
                contentMainImg: allContentData?.contentMainImg || '',
                contentSubImg: allContentData?.contentSubImg || ''
              }}
              onSubmit={values => {
                let contentFormData = new FormData()
                contentFormData.append('id', '156')
                contentFormData.append('contentHeader', values?.contentHeader)
                contentFormData.append('contentText', values?.contentText)
                contentFormData.append('contentMainImg', values?.contentMainImg)
                contentFormData.append('contentSubImg', values?.contentSubImg)
                let payload = contentFormData

                // @ts-ignore
                dispatch(updateContent(payload))
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <Grid container spacing={5}>
                    <Grid item container xs={12} spacing={5}>
                      <Grid item xs={6}>
                        <TextField
                          label='Content Header'
                          autoComplete='off'
                          value={values?.contentHeader}
                          type='text'
                          onChange={handleChange}
                          fullWidth
                          name='contentHeader'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label='Content Text'
                          autoComplete='off'
                          value={values?.contentText}
                          type='text'
                          onChange={handleChange}
                          fullWidth
                          name='contentText'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid item container xs={12} spacing={5}>
                      <Grid item xs={6}>
                        <Typography>Select Main Image</Typography>
                        <Box display='flex' alignItems='center'>
                          <Box
                            sx={{
                              border: '4px solid #d7cdcd',
                              width: 200,
                              height: 108,
                              borderRadius: 1,
                              mr: 3
                            }}
                          >
                            <FilePreview file={values.contentMainImg} />
                          </Box>
                          <IconButton size='large' color='primary' component='label'>
                            <Icon icon='material-symbols:upload' />
                            <input
                              hidden
                              type='file'
                              onChange={(e: any) => {
                                setFieldValue('contentMainImg', e.target?.files[0])
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Select Sub Image</Typography>
                        <Box display='flex' alignItems='center'>
                          <Box
                            sx={{
                              border: '4px solid #d7cdcd',
                              width: 200,
                              height: 108,
                              borderRadius: 1,
                              mr: 3
                            }}
                          >
                            <FilePreview file={values.contentSubImg} />
                          </Box>
                          <IconButton size='large' color='primary' component='label'>
                            <Icon icon='material-symbols:upload' />
                            <input
                              hidden
                              type='file'
                              onChange={(e: any) => setFieldValue('contentSubImg', e.target?.files[0])}
                            />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>

            <Box mt={8}>
              <Typography fontWeight={500} fontSize={20} mb={2}>
                Add Card
              </Typography>
              <Grid container rowSpacing={3}>
                {cardContentData &&
                  cardContentData.map((value: any, index: number) => (
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
                {cardContentData && cardContentData.length <= 1 ? (
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
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Section 3' />
          <CardContent>
            <Formik
              initialValues={{
                productContentMainHeading: allProductSectionData[0]?.productContentMainHeading || '',
                productContentSubHeading: allProductSectionData[0]?.productContentSubHeading || '',
                productContentText: allProductSectionData[0]?.productContentText || ''
              }}
              enableReinitialize
              onSubmit={values => {
                const formData = new FormData()
                formData.append('id', allContentData?.id)
                formData.append('productContentMainHeading', values?.productContentMainHeading)
                formData.append('productContentSubHeading', values?.productContentSubHeading)
                formData.append('productContentText', values?.productContentText)
                const payload = formData
                // @ts-ignore
                dispatch(updateProductContentSection(payload))
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label='Product Main Heading'
                        name='productContentMainHeading'
                        onChange={handleChange}
                        value={values.productContentMainHeading}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label='Product Sub Heading'
                        name='productContentSubHeading'
                        onChange={handleChange}
                        value={values.productContentSubHeading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        label='Product Text'
                        name='productContentText'
                        onChange={handleChange}
                        value={values.productContentText}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            <Box mt={8}>
              <Typography fontWeight={500} fontSize={20} mb={2}>
                Add Card
              </Typography>

              <Grid container rowSpacing={3}>
                {productContentCardData &&
                  productContentCardData.map((value: any, index: number) => (
                    <Grid item container key={index} spacing={3} alignItems={'center'}>
                      <Grid item sm={2} xs={12}>
                        <Box width={100} height={60}>
                          <FilePreview file={value.productContentMainCardImage} />
                        </Box>
                      </Grid>

                      <Grid item sm={3} xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          size='small'
                          label='Card Main Heading'
                          placeholder='Card Main Heading'
                          value={value?.bigProductContentSubHeading}
                          name='bigProductContentSubHeading'
                        />
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          label='Card Sub Heading'
                          placeholder='Card Sub Heading'
                          size='small'
                          value={value?.bigProductContentText}
                          name='bigProductContentText'
                        />
                      </Grid>

                      {value?.positionId && (
                        <Grid item sm={3} xs={12}>
                          <Tooltip title='Edit'>
                            <IconButton
                              size='small'
                              sx={{ color: 'text.secondary' }}
                              onClick={() => {
                                handleShow('productContentCard')
                                setEdit(true)
                                setEditField(value)
                              }}
                            >
                              <Icon icon='tabler:edit' />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  ))}
              </Grid>

              <Button
                sx={{ my: 5 }}
                color='inherit'
                variant='contained'
                type='button'
                onClick={() => handleShow('productContentCard')}
              >
                ADD CARD
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        {/* SECTION  =   4 */}
        <Card>
          <CardHeader title='Section 4' />
          <CardContent>
            <Formik
              initialValues={{
                smallProductContentMainHeading: getAllSmallProductData[0]?.smallProductContentMainHeading || ''
              }}
              enableReinitialize
              onSubmit={values => {
                let ID = localStorage.getItem('AllContentDataId')
                const payload = { id: ID, smallProductContentMainHeading: values?.smallProductContentMainHeading }
                // @ts-ignore
                dispatch(updateSmallProductContent(payload))
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label='Sub-Product Content Main Heading'
                      name='smallProductContentMainHeading'
                      onChange={handleChange}
                      value={values.smallProductContentMainHeading}
                    />

                    <Box>
                      <Button variant='contained' type='submit'>
                        Submit
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Box mt={8}>
              <Typography fontWeight={500} fontSize={20} mb={2}>
                Add Card
              </Typography>

              <Grid container spacing={5}>
                {smallCardData &&
                  smallCardData.map((value: any, index: number) => (
                    <Grid key={index} item container spacing={3} xs={12} alignItems={'center'}>
                      <Grid item sm={2} xs={12}>
                        <Box width={100} height={60}>
                          <FilePreview file={value?.smallProductContentCardImage} />
                        </Box>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size='small'
                          label='Product Content Name'
                          name='productContentName'
                          value={value?.productContentName}
                        />
                      </Grid>
                      {value?.positionId && (
                        <Grid item sm={2} xs={12}>
                          <Tooltip title='Edit'>
                            <IconButton
                              size='small'
                              sx={{ color: 'text.secondary' }}
                              onClick={() => {
                                handleShow('smallProductContentCard')
                                setEdit(true)
                                setEditField(value)
                              }}
                            >
                              <Icon icon='tabler:edit' />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  ))}
              </Grid>

              <Button
                sx={{ mt: 3, mb: 5 }}
                color='inherit'
                variant='contained'
                type='button'
                onClick={() => handleShow('smallProductContentCard')}
              >
                ADD CARD
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        {/* SECTION  =   5 */}
        <Card>
          <CardHeader title='Section 5' />
          <CardContent>
            <Formik
              initialValues={{
                qaContentMainImg: allContentData?.qaContentMainImg,
                qaContentlogo: allContentData?.qaContentlogo,
                qaContentCounter: allContentData?.qaContentCounter,
                qaContentCounterText: allContentData?.qaContentCounterText,
                qaContentMainHeader: allContentData?.qaContentMainHeader,
                qaContentSubHeader: allContentData?.qaContentSubHeader
              }}
              enableReinitialize
              onSubmit={values => {
                //API
                console.log('HERE')
                // https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/qaUpdateContent
              }}
            >
              {({ values, setFieldValue, handleChange }) => (
                <Form>
                  <Grid container spacing={5}>
                    <Grid item sm={6} xs={12}>
                      <Typography>Select QA Content Image</Typography>
                      <Box display='flex' alignItems='center'>
                        <Box
                          sx={{
                            border: '4px solid #d7cdcd',
                            width: 200,
                            height: 108,
                            borderRadius: 1,
                            mr: 3
                          }}
                        >
                          <FilePreview file={values?.qaContentMainImg} />
                        </Box>
                        <IconButton size='large' color='primary' component='label'>
                          <Icon icon='material-symbols:upload' />
                          <input
                            hidden
                            type='file'
                            onChange={(e: any) => {
                              setFieldValue('qaContentMainImg', e.target?.files[0])
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Typography>Select QA Content Logo</Typography>
                      <Box display='flex' alignItems='center'>
                        <Box
                          sx={{
                            border: '4px solid #d7cdcd',
                            width: 200,
                            height: 108,
                            borderRadius: 1,
                            mr: 3
                          }}
                        >
                          <FilePreview file={values.qaContentlogo} />
                        </Box>
                        <IconButton size='large' color='primary' component='label'>
                          <Icon icon='material-symbols:upload' />
                          <input
                            hidden
                            type='file'
                            onChange={(e: any) => {
                              setFieldValue('qaContentlogo', e.target?.files[0])
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='qaContentCounter'
                        label='QA Content Counter'
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={values.qaContentCounter}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='qaContentCounterText'
                        label='QA Content Counter Text'
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={values.qaContentCounterText}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='qaContentMainHeader'
                        label='QA Content Main Header'
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={values.qaContentMainHeader}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name='qaContentSubHeader'
                        label='QA Content Sub Header'
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={values.qaContentSubHeader}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant='contained' type='submit'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>

      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type='deleteSlide'
        delelteField={delelteField}
        id={DeleteID}
      />

      {dialogName === 'slider' && <SliderContentDialog {...props} />}
      {dialogName === 'cardContents' && <CardContentDialog {...props} />}
      {dialogName === 'productContentCard' && <ProductContentCard {...props} />}
      {dialogName === 'smallProductContentCard' && <SmallProductCard {...props} />}
    </Grid>
  )
}

export default ContentPage
