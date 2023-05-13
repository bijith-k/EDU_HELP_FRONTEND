import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import axiosInstance from "../../../axios";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton, SkeletonText, Spinner, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";

const Plans = () => {
  const { student } = useSelector((state) => state.student);

  const [plans, setPlans] = useState([]);
  
  const [selectedPlan, setSelectedPlan] = useState([]);

  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(true)
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-plans`)
      .then((res) => {
        if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setPlans(res.data);
          setContentLoading(false)
        }
      })
      .catch((err) => {
        setContentLoading(false)
         
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-subscribed-plan?id=${student._id}`)
      .then((res) => {
        if (res.data.subscribed) {
          setIsSubscribed(true);
        }else if (res.data.status == false) {
          
          localStorage.removeItem("Stoken");
          navigate("/signin");
        }
      })
      .catch((err) => {
      
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  const initPayment = (data, plan) => {
    const options = {
      key: import.meta.env.VITE_KEY_ID,
      amount: data.amount,
      name: plan.plan,
      description: "Test transaction",
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const { data } = await axiosInstance("Stoken").post(
            `verify-payment`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              plan,
            }
          );

          if (data.verified) {
            setLoading(false);
            setSelectedPlan(null);
            
            toast({
              title: data.message,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            navigate("/");
          } else {
             
            toast({
              title: data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
        } catch (error) {
           
          setLoading(false);
          setSelectedPlan(null);
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (plan) => {
    try {
      // setLoading(true)
      if (isSubscribed) {
        return toast({
          title: "You already have a subscription plan",
          description: "Please check your profile page for details",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      const { data } = await axiosInstance("Stoken").post(`buy-plan`, {
        id: plan._id,
      });

      initPayment(data.data, plan);
    } catch (error) {
     
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      
    }
  };

 

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"available plans"} />

      {contentLoading ? (
        <Box className="flex flex-col md:flex-row gap-2">
          <Box
            padding="6"
            boxShadow="lg"
            bg="white"
            className="mt-5 mx-auto h-80 md:w-2/6 w-80 rounded-3xl"
          >
            <SkeletonText mt="8" noOfLines={1} spacing="4" skeletonHeight="3" />
            <SkeletonText mt="8" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="5" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
            <Skeleton height="7" mt="6" width="36" className="mx-auto" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg="white"
            className="mt-5 mx-auto h-80 md:w-2/6 w-80 rounded-3xl"
          >
            <SkeletonText mt="8" noOfLines={1} spacing="4" skeletonHeight="3" />
            <SkeletonText mt="8" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="5" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
            <Skeleton height="7" mt="6" width="36" className="mx-auto" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg="white"
            className="mt-5 mx-auto h-80 md:w-2/6 w-80 rounded-3xl"
          >
            <SkeletonText mt="8" noOfLines={1} spacing="4" skeletonHeight="3" />
            <SkeletonText mt="8" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="5" noOfLines={2} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
            <Skeleton height="7" mt="6" width="36" className="mx-auto" />
          </Box>
        </Box>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-3 h-full">
          {plans.map((plan, index) => (
            <div
              className="bg-[#fffffe] border-b-4 border-r-4 border-[#d4939d] hover:opacity-90 text-[#232946] hover:scale-105 transition duration-300  w-full rounded-xl mt-5 p-10 h-fit text-center"
              key={index}
            >
              <p className="font-black text-2xl uppercase border-b w-fit mx-auto">
                {plan.plan} plan
              </p>
              <p className="font-sans font-bold text-lg mt-8">
                Chat with tutors and clear <br /> your doubts
              </p>
              <p className="font-sans font-bold text-lg mt-4">
                Exclusive notes <br /> uploaded by tutors
              </p>

              <p className="font-sans font-medium text-lg mt-3">
                Plan validity : {plan.duration} Month
              </p>
              <p className="font-sans font-medium text-lg mt-3">
                Price : <FaRupeeSign className="inline" /> {plan.price}{" "}
              </p>
              {loading ? (
                <Spinner className="mt-5" />
              ) : (
                <span
                  onClick={() => {
                    setSelectedPlan(plan);
                    handlePayment(plan);
                  }}
                >
                  <p className="bg-[#232946] p-2 text-[#b8c1ec] rounded-3xl uppercase font-bold mt-5 w-2/3 hover:bg-slate-500 hover:text-white mx-auto cursor-pointer">
                    buy now
                  </p>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Plans;
