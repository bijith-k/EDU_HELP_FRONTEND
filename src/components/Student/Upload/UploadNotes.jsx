import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  board: "",
  branch: "",
  subject: "",
  note: "",
  noteName: "",
  videoLink: "",
};

const UploadNotes = () => {
   
  
  const [isLoading, setIsLoading] = useState(null);

  const [notesData, setNotesData] = useState({
    board: "",
    branch: "",
    subject: "",
    note: "",
    noteName: "",
    videoLink: "",
  });
  const notesSchema = Yup.object({
    branch: Yup.string().required("Please select class/branch"),
    board: Yup.string().required("Please select board/university"),
    subject: Yup.string().required("Please select subject"),
    note: Yup.mixed()
      .required("Please select file")
      .test(
        "fileSize",
        "File size too large",
        (value) => value && value.size <= 5000000
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) => value && ["application/pdf"].includes(value.type)
      ),
    noteName: Yup.string().required("Please enter subject and module name"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: notesSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        console.log(values);
        // axios.post('http://localhost:4000/auth/signup', {
        //   ...values
        // },
        // ).then(response => {
        //   setIsLoading(false)
        //   toast.success(response.data.message)
        //   navigate('/signin')
        // }).catch(error => {
        //   setIsLoading(false)
        //   toast.error(error.response.data.errors)
        // })
        // action.resetForm();
      },
    });

  return (
    <div className="bg-gray-300 h-full w-full">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          upload notes
        </h1>
      </div>
      <form
        action=""
        noValidate
        autoComplete="off"
        className="md:mx-20 mt-5"
        onSubmit={handleSubmit}
        encType="multipart/formdata"
      >
        <FormControl variant="filled" className="w-3/4 m-2">
          <InputLabel id="demo-simple-select-filled-label" required>
            SELECT BOARD/UNIVERSITY
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="board"
            value={values.board}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <br />
        {errors.board && touched.board ? (
          <p className="form-error text-red-600 ml-2">{errors.board}</p>
        ) : null}
        <FormControl variant="filled" className="w-3/4 m-2">
          <InputLabel id="demo-simple-select-filled-label" required>
            SELECT CLASS/BRANCH
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="branch"
            value={values.branch}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <br />
        {errors.branch && touched.branch ? (
          <p className="form-error text-red-600 ml-2">{errors.branch}</p>
        ) : null}

        <FormControl variant="filled" className="w-3/4 m-2">
          <InputLabel id="demo-simple-select-filled-label" required>
            SELECT SUBJECT
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <br />
        {errors.subject && touched.subject ? (
          <p className="form-error text-red-600 ml-2">{errors.subject}</p>
        ) : null}

        <InputLabel className="mx-2" required>
          SELECT FILE
        </InputLabel>

        <TextField
          id="filled-basic"
          type="file"
          label=""
          variant="filled"
          name="note"
          value={values.note}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-3/4 mx-2 mb-2"
        />
        <br />
        {errors.note && touched.note ? (
          <p className="form-error text-red-600 ml-2">{errors.note}</p>
        ) : null}

        <TextField
          id="filled-basic"
          label="Enter subject and module name"
          variant="filled"
          className="w-3/4 mx-2 mb-2"
          name="noteName"
          value={values.noteName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.noteName && touched.noteName ? (
          <p className="form-error text-red-600 ml-2">{errors.noteName}</p>
        ) : null}

        <TextField
          id="filled-basic"
          label="Video link"
          variant="filled"
          className="w-3/4 mx-2 mb-2"
          name="videoLink"
          value={values.videoLink}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputLabel className="mx-2">
          *These notes will be published only <br /> after admin verification
        </InputLabel>
        <Button
          type="submit"
          className="bg-green-600 font-semibold text-white m-2"
        >
          UPLOAD
        </Button>
      </form>
    </div>
  );
};

export default UploadNotes;
