import React, { useEffect, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import pdf from "../../../assets/pdf.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import school from "../../../assets/pdf.png";
import { useSelector } from "react-redux";
import axios from "axios";

const NotesContent = () => {
  const student = useSelector((state) => state.student);
  
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const note = notes.filter(note => note.branch._id === student.branch._id);
  const filteredData = searchQuery.trim() !== '' || selectedSubject !== '' ? note.filter((item) => {
    return(
      
      (searchQuery.trim() === '' ||
      item.note_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
      )&& 
      (selectedSubject === '' || selectedSubject.toLowerCase() === item.subject.name.toLowerCase())
    ) 
  }) : note;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_PATH}get-notes`,
      {
        headers: {
           authorization: `Bearer ${localStorage.getItem('Stoken')}`
               }
      }).then((response) => {
      console.log("afasdfsdds");
      console.log(response.data,"sfasdfsdf");
      setNotes(response.data);
    });
  }, []);

  useEffect(() => {
    
      axios.get(`${import.meta.env.VITE_BASE_PATH}subjects?branch=${student.branch._id}`,
      {
        headers: {
           authorization: `Bearer ${localStorage.getItem('Stoken')}`
               }
      }).then(res=>{
        setSubjects(res.data.subjects)
      }).catch(error =>{
        console.log(error);
      })
    
  }, [])

  return (
    <div>
      <div className="m-4 md:m-8 flex md:justify-evenly md:flex-row flex-col items-center ">
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search notes"
            className="bg-transparent placeholder-white font-semibold focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Button
            variant="contained"
            size="small"
            className="bg-green-400 font-semibold rounded-full"
          >
            Search
          </Button>
        </div>
        <div>
          {/* filter */}
          <FormControl className="w-56">
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSubject}
              label="subject"
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <MenuItem value={''}>All Subjects</MenuItem>
              {subjects.map(subject=>(
                 <MenuItem key={subject._id} value={subject.name} className="uppercase">{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid md:grid-cols-4">

        {filteredData.length > 0 ? 
        (filteredData.map((note,index) => (
          <Card key={index}
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-100"
          >
             <CardMedia sx={{ height: 240 }} className="m-3 rounded-2xl border">
        <iframe
          title="PDF Viewer"
          src={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
          height='240'
          scrolling="no"
        />
      </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {note.note_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class : {note.branch.name} <br />
                Subject : {note.subject.name}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="medium" className="bg-red-100 rounded-lg">
              <a href={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`} target='_blank'>
                DOWNLOAD</a>
              </Button>
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
          </Card>
           )))    : (
            <p>No results found for "{searchQuery}" and "{selectedSubject}"</p>
          )}
          {/* <Card
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-100"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science Unit 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class : 10 <br />
                Subject : Social Science
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="medium" className="bg-red-100 rounded-lg">
                DOWNLOAD
              </Button>
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-100"
          >
            <CardMedia
              sx={{ height: 240 }}
              className="m-3 rounded-2xl border"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              title="Your PDF file"
              href="https://drive.google.com/file/d/1Z57xhXuBUjuxZBo8deyq6q9759k51hpZ/view?usp=share_link"
              image={school}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science Unit 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class : 10 <br />
                Subject : Social Science
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="medium" className="bg-red-100 rounded-lg">
                DOWNLOAD
              </Button>
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-100"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science Unit 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class : 10 <br />
                Subject : Social Science
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="medium" className="bg-red-100 rounded-lg">
                DOWNLOAD
              </Button>
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-100"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science Unit 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class : 10 <br />
                Subject : Social Science
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="medium" className="bg-red-100 rounded-lg">
                DOWNLOAD
              </Button>
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default NotesContent;
