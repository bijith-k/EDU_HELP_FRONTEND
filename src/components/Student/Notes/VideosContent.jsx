import React, { useEffect, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import school from "../../../assets/pdf.png";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useSelector } from "react-redux";

const VideosContent = () => {
  const student = useSelector((state) => state.student);

  
  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);
console.log(videos,"vid");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const video = videos.filter(video => video.branch._id === student.branch._id);
console.log(video,"vidooooo");
  const filteredData = searchQuery.trim() !== '' || selectedSubject !== '' ? video.filter((item) => {
    return(
      (searchQuery.trim() === '' ||
      item.video_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
      )&& 
      (selectedSubject === '' || selectedSubject.toLowerCase() === item.subject.name.toLowerCase())
    ) 
  }) : video;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_PATH}get-videos`,
    {
      headers: {
         authorization: `Bearer ${localStorage.getItem('Stoken')}`
             }
    }).then((response) => {
      console.log("afasdfsdds");
      console.log(response.data,"sfasdfsdf");
      setVideos(response.data);
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
            placeholder="Search Videos"
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
              label="subject"
              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
              className="uppercase"
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
        (filteredData.map((video,index) => (
          <Card key={index}
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-200"
          >
             
      <CardMedia
              sx={{ height: 240 }}
              className=" rounded-2xl border-4"
              component="iframe"
              title="test"
              src={video.video_link}
              allowFullScreen
            />

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {video.video_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="uppercase">
                Class/Branch : {video.branch.name} <br />
                Subject : {video.subject.name}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              {/* <Button size="medium" className="bg-red-100 rounded-lg"><a href={`${import.meta.env.VITE_BASE_PATH}${question.file_path}`} target='_blank'>
                DOWNLOAD</a>
              </Button> */}
              <Button size="medium" className="bg-rose-100 rounded-lg">
                ADD TO FAVOURITE
              </Button>
            </CardActions>
            {/* <iframe src={`http://localhost:4000/${question.file_path}`} width="100%" height="500px"></iframe> */}
             
          </Card>
         
         
             )))    : (
              <p>No results found for "{searchQuery}" and "{selectedSubject}"</p>
            )}


          {/* <Card
            sx={{ maxWidth: 345 }}
            className="m-4 rounded-2xl shadow-xl bg-slate-200"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science mid term exam
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
            className="m-4 rounded-2xl shadow-xl bg-slate-200"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science mid term exam
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
            className="m-4 rounded-2xl shadow-xl bg-slate-200"
          >
            <CardMedia
              sx={{ height: 240 }}
              image={school}
              title="green iguana"
              className="m-3 rounded-2xl border"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Social science mid term exam
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

export default VideosContent;


