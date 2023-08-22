import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography
} from '@mui/material'
import { Field, FieldArray, Form, Formik, useFormikContext } from 'formik'
import React, { Fragment, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useDispatch } from 'react-redux'
import { createContentPage } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import Dropzone, { useDropzone } from 'react-dropzone'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'
import { useTheme } from '@emotion/react'
import { toast } from 'react-hot-toast'
import { GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid'
import { margin } from '@mui/system'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
interface FileProp {
  name: string
  type: string
  size: number
}
const ContentPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (values: any) => {
    let payload = {
      header: values?.header,
      content: values?.content
      // image1: file1
    }
    dispatch(createContentPage(payload))
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }
  const renderFilePreview = (file: FileProp) => {
    if (file?.type?.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }
  // const FileUploadField = ({ name, index }) => {
  //   const { setFieldValue } = useFormikContext()

  //   const handleFileDrop = (file: any) => {
  //     setFieldValue(`files.${index}`, file[0])
  //   }

  //   return (
  //     <Button variant='contained' component='label' startIcon={<Icon icon='icon-park-outline:upload-two' />}>
  //       Upload
  //       <input type='file' hidden onChange={e => handleFileDrop(e)} />
  //     </Button>
  //   )
  // }
  const FileUploadField = ({ name, index }: any) => {
    const { setFieldValue } = useFormikContext()

    const handleFileDrop = (acceptedFiles: any) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]

        // Check if the selected file is an image
        if (file.type && file.type.startsWith('image/')) {
          setFieldValue(`files.${index}`, file)
        } else {
          toast.error('Please select an image file')
        }
      }
    }

    return (
      <Button
        sx={{
          ml: 4
        }}
        variant='contained'
        component='label'
        startIcon={<Icon icon='icon-park-outline:upload-two' />}
      >
        Upload
        <input type='file' hidden onChange={e => handleFileDrop(e.target.files)} />
      </Button>
    )
  }

  // const FilePreview = ({ file, onRemove }: any) => {
  //   console.log('file?.name', file?.name)
  //   if (file?.type?.startsWith('image')) {
  //     return (
  //       <div>
  //         <img width={38} height={38} alt={file?.name} src={URL.createObjectURL(file as any)} />
  //         <Button variant='contained' color='secondary' startIcon={<Icon icon='tabler:trash' />}>
  //           Delete
  //         </Button>
  //       </div>
  //     )
  //   } else {
  //     return <Icon icon='tabler:file-description' />
  //   }
  // }
  const FilePreview = ({ file, onRemove }: any) => {
    if (file?.type.startsWith('image')) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <img
            style={{
              objectFit: 'cover'
            }}
            width={100}
            // height={100}
            alt={file.name}
            src={URL.createObjectURL(file)}
          />
          <Typography variant='body1'>{file.name}</Typography>

          <Box>
            {/* <IconButton color='error' onClick={onRemove}>
                <Icon icon='tabler:trash' />
              </IconButton> */}
            {/* <Fab  variant='outlined' aria-label='edit'>
                <Icon icon='tabler:trash' />
              </Fab> */}
            <Button
              variant='contained'
              color='error'
              component='label'
              startIcon={<Icon icon='tabler:trash' />}
              onClick={onRemove}
            >
              delete
            </Button>
          </Box>
        </div>
      )
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Landing Page Content' />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{
              header: '',
              content: '',
              sliderImages: [],
              files: []
            }}
            onSubmit={values => handleSubmit(values)}
          >
            {({ values, handleChange }) => (
              <>
                <Form>
                  <Grid container spacing={6}>
                    <Grid item sm={12} xs={12}>
                      <TextField label='Content Header' name='header' value={values?.header} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item sm={12} xs={12}>
                        <Typography variant='h6'>Content :</Typography>
                        <Field sx={{ marginTop: '10px' }} name='content'>
                          {({ field }: any) => (
                            <ReactQuill
                              style={{
                                height: '300px'
                              }}
                              modules={modules}
                              value={field.value}
                              onChange={field.onChange(field.name)}
                            />
                          )}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid mt={10} item xs={12}>
                      <Typography variant='h6'>Slider Images</Typography>
                      <FieldArray name='files'>
                        {arrayHelpers => (
                          <div>
                            <List>
                              {values?.files.map((file, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    margin: 5,
                                    padding: 10,
                                    border: '1px solid #d1cfd4',
                                    borderRadius: '5px'
                                  }}
                                >
                                  <FilePreview key={index} file={file} onRemove={() => arrayHelpers.remove(index)} />
                                  <FileUploadField name={`files.${index}`} index={index} />
                                </div>
                              ))}
                            </List>

                            <Button type='button' onClick={() => arrayHelpers.push(null)}>
                              Add File
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                    {/* <Grid mt={10} item>
                        {' '}
                        <Button type='submit' variant='contained' sx={{ mr: 1 }}>
                          Submit
                        </Button>
                      </Grid> */}
                  </Grid>
                </Form>
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContentPage
