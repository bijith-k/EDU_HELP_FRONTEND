import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import school from "../../../assets/pdf.png";

const VideosContent = () => {
  const [age, setAge] = React.useState("");

  const handleChanges = (event) => {
    setAge(event.target.value);
  };

  const data = [
    {
      label: "Vue",
      value: "3",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <div>
      <div className="m-4 md:m-8 flex md:justify-evenly md:flex-row flex-col items-center ">
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search videos"
            className="bg-transparent placeholder-white font-semibold focus:outline-none"
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
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChanges}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-4">
          <Card sx={{ maxWidth: 345 }} className="m-4">
            <CardMedia
              sx={{ height: 250 }}
              component="iframe"
              title="test"
              src="https://www.youtube.com/embed/j3IqIGaiGWc"
              allowFullScreen
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Maths Unit 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subject : Maths <br />
                Class : 12
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="large">VIEW</Button>
              <Button size="large">ADD TO FAVOURITE</Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }} className="m-4">
            <CardMedia
              sx={{ height: 250 }}
              component="iframe"
              title="test"
              src="https://www.youtube.com/embed/j3IqIGaiGWc"
              allowFullScreen
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Maths Unit 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subject : Maths <br />
                Class : 12
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="large">VIEW</Button>
              <Button size="large">ADD TO FAVOURITE</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideosContent;
