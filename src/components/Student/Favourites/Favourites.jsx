import React from 'react'
import Navbar from '../Home/Navbar';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FavouriteNotes from './FavouriteNotes';
import FavouriteVideos from './FavouriteVideos';
import FavouriteQuestions from './FavouriteQuestions';
import Header from '../Header/Header';
import HeadTitle from '../Header/HeadTitle';
import Footer from '../Footer/Footer';

const Favourites = () => {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"favourites"} />
      {/* <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          FAVOURITES
        </h1>
      </div> */}
      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-[#fffffe] text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FavouriteNotes />
          </TabPanel>
          <TabPanel>
            <FavouriteVideos />
          </TabPanel>
          <TabPanel>
            <FavouriteQuestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default Favourites