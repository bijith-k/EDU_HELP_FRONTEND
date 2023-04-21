
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
import axios from "../../../axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyVideos = () => {
  const student = useSelector((state) => state.student);

  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);
  console.log(videos, "vid");
  const[change,setChange] = useState('')

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // const video = videos.filter(
  //   (video) => video.branch._id === student.branch._id
  // );
  // console.log(video, "vidooooo");
  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? videos.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.video_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.subject.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) &&
            (selectedSubject === "" ||
              selectedSubject.toLowerCase() === item.subject.name.toLowerCase())
          );
        })
      : videos;

  useEffect(() => {
    axios
      .get(`get-videos?id=${student._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Stoken")}`,
        },
      })
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "sfasdfsdf");
        setVideos(response.data);
      });
  }, [change]);

  useEffect(() => {
    axios
      .get(
        `subjects?branch=${
          student.branch._id
        }`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Stoken")}`,
          },
        }
      )
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handlePrivate = (id) =>{
    axios.put(
     `videos-private-public?id=${
       id
     }`,null,
     {
       headers: {
         authorization: `Bearer ${localStorage.getItem("Stoken")}`,
       },
     }
   ).then((res) => {
     console.log(res);
     // setToastMessage(res.data.message);
     toast.success(res.data.message, {
       position: "top-center",
     });
     setChange(res.data.message)
   })
   .catch((err) => {
     console.log(err);
     // setToastMessage(res.data.message);
     toast.error(err.message, {
       position: "top-center",
     });
   });
   }
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
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="uppercase"
            >
              <MenuItem value={""}>All Subjects</MenuItem>
              {subjects.map((subject) => (
                <MenuItem
                  key={subject._id}
                  value={subject.name}
                  className="uppercase"
                >
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid md:grid-cols-4">
          {filteredData.length > 0 ? (
            filteredData.map((video, index) => (
              <Card
                key={index}
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

                <CardContent >
                  <Typography gutterBottom variant="h6" component="div">
                    {video.video_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="uppercase"
                  >
                    Class/Branch : {video.branch.name} <br />
                    Subject : {video.subject.name}
                  </Typography>
                  {video.approved ? 
                  (<Typography variant="body2" color="text.secondary">
                 Status : Approved
                </Typography>) :
                ((<Typography variant="body2" color="text.secondary">
                Status : Pending Admin approval
               </Typography>) ) }
                </CardContent>
                <CardActions className="flex justify-center">
                  {/* <Button size="medium" className="bg-red-100 rounded-lg"><a href={`${question.file_path}`} target='_blank'>
                DOWNLOAD</a>
              </Button> */}
                  {video.private ? 
                  (<Button size="medium" className="bg-rose-100 rounded-lg" onClick={()=>handlePrivate(video._id)}>
                  MAKE PUBLIC
                </Button>) :
                (<Button size="medium" className="bg-rose-100 rounded-lg" onClick={()=>handlePrivate(video._id)}>
                MAKE PRIVATE
              </Button>)}
                </CardActions>
                {/* <iframe src={`http://localhost:4000/${question.file_path}`} width="100%" height="500px"></iframe> */}
              </Card>
            ))
          ) : (
            <p>
              No results found for "{searchQuery}" and "{selectedSubject}"
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default MyVideos