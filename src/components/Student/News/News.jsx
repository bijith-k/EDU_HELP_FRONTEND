import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import Navbar from "../Home/Navbar";
import axios from "axios";
import newsImg from "../../../assets/news.png";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";
import { Box, Skeleton } from "@chakra-ui/react";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(4);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  

  
  

    useEffect(() => {
      console.log("first")
      const fetchNews = async () => {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        );
        console.log(response);
        setNews(response.data.articles);
        setLoading(false)
      };
      fetchNews();
    }, []);

    console.log(news)
const lastNewsIndex = currentPage * newsPerPage;
const firstNewsIndex = lastNewsIndex - newsPerPage;

const currentNews = news?.slice(firstNewsIndex, lastNewsIndex);

   
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"news"} />
      {loading ? (
        <Box
          padding="6"
          boxShadow="lg"
          bg="white"
          className="mt-5 mx-auto h-52 w-4/5 rounded-3xl flex md:flex-row flex-col  items-center  md:justify-center"
        >
          <Skeleton height="28" mt="3" width="28" />
          <div className="ml-5 md:block hidden">
            <Skeleton height="2" width={"2xl"} mt="3" />
            <Skeleton height="2" width={"2xl"} mt="3" />
            <Skeleton height="2" width={"2xl"} mt="3" />
            <Skeleton height="2" width={"2xl"} mt="3" />
          </div>
          <div className="ml-5 md:hidden block">
            <Skeleton height="2" width={"2xs"} mt="3" />
            <Skeleton height="2" width={"2xs"} mt="3" />
            <Skeleton height="2" width={"2xs"} mt="3" />
            <Skeleton height="2" width={"2xs"} mt="3" />
          </div>
        </Box>
      ) : (
        <div>
          {news?.length > 0 ? (
            <div>
              <div className="h-4/6">
                {currentNews.map((news, index) => (
                  <div className="p-2 flex justify-center ">
                    <div className="bg-[#fffffe] hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-[#232946]  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
                      <div className=" w-36 h-36 bg-black flex flex-col mx-auto  md:mx-2">
                        {news?.urlToImage ? (
                          <img
                            src={news.urlToImage}
                            className="w-36  h-36 object-cover shadow-sm shadow-black"
                            alt=""
                          />
                        ) : (
                          <img
                            src={newsImg}
                            className="w-36  h-36 shadow-sm shadow-black"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center md:items-start uppercase">
                        <div className="mb-4 font-bold">
                          <p className="text-center">{news?.title}</p>
                        </div>
                        <div>
                          {" "}
                          <p className="text-start">{news?.description}</p>
                        </div>
                        <div>
                          <p className="text-center">
                            Source: {news?.source?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center m-2">
                        <span>
                          <a
                            href={news?.url}
                            className="bg-[#232946] p-2 text-[#fffffe] rounded-lg  uppercase font-bold mt-5 w-full hover:bg-slate-500 hover:text-white mx-auto"
                          >
                            View
                          </a>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                totalContents={news.length}
                contentsPerPage={newsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          ) : (
            <div className="mt-5 h-40  ">
              <p className="text-center font-bold text-xl mt-10">
                No news is available at the moment
              </p>
              <p className="text-center font-semibold text-xl ">
                Please check back later
              </p>
            </div>
          )}
        </div>
      )}
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default News;
