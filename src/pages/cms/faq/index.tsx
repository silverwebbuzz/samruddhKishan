import { Icon } from '@iconify/react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { Form, Formik } from 'formik'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllContent } from 'src/slice/contentSectionSlice'
import { qaSectionUpdate } from 'src/slice/faqSlice'
import { AppDispatch } from 'src/store/store'
import FaqDialog from 'src/views/components/dialogBox/FaqDialog'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'

const index = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [show, setShow] = useState<boolean>(false)
  const [dialogName, setDialogName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [editField, setEditField] = useState<string | number>('')

  const dispatch = useDispatch<AppDispatch>()
  const { allContentData } = useSelector((state: any) => state?.rootReducer?.contentSectionReducer)
  const { updatedFaq } = useSelector((state: any) => state?.rootReducer?.faqReducer)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleShow = (dialogName: string) => {
    setShow(true)
    setDialogName(dialogName)
  }
  const handleCancel = () => {
    setShow(false)
    setDialogName('')
  }

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  let props = {
    editField: editField,
    show: show,
    edit: edit,
    setEdit: setEdit,
    handleCancel: handleCancel
  }
  useEffect(() => {
    dispatch(getAllContent())
  }, [updatedFaq])
  return (
    <>
      {/* SECTION  =   5 */}
      <Accordion expanded={expanded === 'section1'} onChange={handleChange('section1')}>
        <AccordionSummary
          id='controlled-panel-header-1'
          aria-controls='controlled-panel-content-1'
          expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
        >
          <h2>Section 1</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12}>
            <Card
              sx={{
                padding: 10
              }}
            >
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
                onSubmit={(values: any) => {
                  const formdata = new FormData()
                  formdata.append('qaContentMainImg', values?.qaContentMainImg)
                  formdata.append('qaContentlogo', values?.qaContentlogo)
                  formdata.append('qaContentCounter', values?.qaContentCounter)
                  formdata.append('qaContentCounterText', values?.qaContentCounterText)
                  formdata.append('qaContentMainHeader', values?.qaContentMainHeader)
                  formdata.append('qaContentSubHeader', values?.qaContentSubHeader)
                  formdata.append('id', allContentData?.id)
                  const payload = formdata
                  dispatch(qaSectionUpdate(payload)).then(res => {
                    if (res?.payload?.status === 'success') toast.success('Faq Content updated successfully')
                  })
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
                              border: '2px solid #dededf',
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
                              border: '2px solid #dededf',
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
                                setFieldValue('qaContentlogo', e?.target?.files[0])
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
            </Card>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'section2'} onChange={handleChange('section2')}>
        <AccordionSummary
          id='controlled-panel-header-1'
          aria-controls='controlled-panel-content-1'
          expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
        >
          <h2> Questions & Feedbacks</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12}>
            <Card
              sx={{
                padding: 10
              }}
            >
              <Box mt={8}>
                {/* <Typography fontWeight={500} fontSize={20} mb={2}>
                Questions & Feedbacks
              </Typography> */}

                <Grid container rowSpacing={3}>
                  {JSONHandler(allContentData?.userQA)?.map((value: any, index: number) => (
                    <Grid item container key={index} spacing={3} alignItems={'center'}>
                      <Grid item sm={3} xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          size='small'
                          label='Question'
                          placeholder='Question'
                          value={value?.userQuestion}
                          name='userQuestion'
                        />
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={4}
                          label='Answer'
                          placeholder='Answer'
                          size='small'
                          value={value?.userAnswer}
                          name='userAnswer'
                        />
                      </Grid>

                      <Grid item sm={3} xs={12}>
                        <Tooltip title='Edit'>
                          <IconButton
                            size='small'
                            sx={{ color: 'text.secondary' }}
                            onClick={() => {
                              handleShow('faq')
                              setEdit(true)
                              setEditField(value)
                            }}
                          >
                            <Icon icon='tabler:edit' />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  sx={{ my: 5 }}
                  color='inherit'
                  variant='contained'
                  type='button'
                  onClick={() => handleShow('faq')}
                >
                  ADD CARD
                </Button>
              </Box>
            </Card>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {dialogName === 'faq' && <FaqDialog {...props} />}
    </>
  )
}

export default index
