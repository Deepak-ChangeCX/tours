import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import router from "next/router";
const Card = () => {
  const [tourData, setTourData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to the login page if the user is not authenticated
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you are not logged in!",
        });
        router.push("/login");
      } else {
        const res = await axios.get(`http://127.0.0.1:9000/api/v1/tours`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setTourData(res.data.data.tours);
      }
    } catch (err: any) {
      // err.response.data.message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  const deleteTour = async (id: any) => {
    try {
      // console.log(localStorage.getItem("token"))
      const res = await axios.delete(
        `http://127.0.0.1:9000/api/v1/tours/${id}`,
        { headers: { authorization: localStorage.getItem("token") } },
      );
      setDeleted((prev) => prev + 1);
      console.log("Tour deleted successfully!");
    } catch (err: any) {
      // err.response.data.message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  // const role = localStorage.getItem("role")
  // const handleEdit = async () =>{

  // }

  useEffect(() => {
    fetchData();
    // fetchRole();
  }, [deleted]);

  return (
    <>
      {/* {console.log(tourData)} */}
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {tourData.map((tourItem: any) => {
          // console.log(tourItem)
          return (
            <div className="w-full max-w-xs p-4 border border-grey-800 rounded-lg shadow sm:p-4 dark:bg-teal-100 dark:border-gray-700 bg-teal-50 m-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  TOURIST PLACE
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700 "
                >
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Name
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.name}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Rating
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Duration
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.duration}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Difficulty
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.difficulty}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Price
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.price}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex mt-4 md:mt-6">
                      <Link
                        href="/edit"
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-teal-500 bg-white border border-teal-400 rounded-lg hover:bg-teal-400 hover:text-white hover:border-white dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white "
                      >
                        Edit
                      </Link>
                      <Link
                        href="#"
                        onClick={() => deleteTour(tourItem._id)}
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-white bg-teal-400 border border-white rounded-lg hover:bg-white hover:text-teal-400 hover:border-teal-400  dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white ms-3"
                      >
                        Delete
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
