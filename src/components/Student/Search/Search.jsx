import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { useSelector } from "react-redux";


const Search = ({searchQueryData,selectedSubjectData}) => {
  const { student } = useSelector((state) => state.student);

  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  searchQueryData(searchQuery)
  selectedSubjectData(selectedSubject)
  useEffect(() => {
    axiosInstance("Stoken")
      .get(`subjects?branch=${student.branch._id}`)
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <div className="m-4 md:m-8 flex md:justify-evenly md:flex-row flex-col items-center ">
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search..."
            className="bg-transparent placeholder-white font-semibold focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
           
        </div>
        <div>
          {/* filter */}
          <FormControl className="w-56">
            <FormLabel id="demo-simple-select-label">Subject</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSubject}
              label="subject"
              variant={"filled"}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value={""}>All Subjects</option>
              {subjects.map((subject) => (
                <option
                  key={subject._id}
                  value={subject.name}
                  className="uppercase"
                >
                  {subject.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
  );
};

export default Search;
