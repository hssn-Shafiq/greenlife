import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import AdminHeader from "../../../Components/AdminHeader";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ".././admin.css";

const Dashboard = () => {
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAcd, setTotalAcd] = useState(0);
  const [totalCurriculum, setTotalCurriculum] = useState(0);
  const [totalDetails, setTotalDetails] = useState(0);
  const [userRegistrationData, setUserRegistrationData] = useState([]);

  const fetchAllData = async () => {
    const collections = [
      "curriculums",
      "user-details",
      "academic_qualifications",
    ];
    let allData = [];

    for (let collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      snapshot.docs.forEach((doc) => {
        const docData = doc.data();

        // Check if createdAt exists and is a valid date
        if (
          docData.createdAt &&
          !isNaN(new Date(docData.createdAt).getTime())
        ) {
          docData.createdAt = new Date(docData.createdAt);
        }

        allData.push(docData);
      });
    }

    setData(allData);
  };

  const fetchCollectionData = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const collectionData = snapshot.docs.map((doc) => {
      const docData = doc.data();
      if (docData.createdAt) {
        docData.createdAt = new Date(docData.createdAt);
      }
      return docData;
    });
    setData(collectionData);
  };

  const fetchTotalUsers = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const usersData = snapshot.docs.map((doc) => {
      const docData = doc.data();

      // Check if createdAt exists and is a Firestore Timestamp
      if (docData.createdAt && typeof docData.createdAt.toDate === "function") {
        docData.createdAt = docData.createdAt.toDate(); // Convert Firestore Timestamp to Date object
      } else if (
        docData.createdAt &&
        !isNaN(new Date(docData.createdAt).getTime())
      ) {
        docData.createdAt = new Date(docData.createdAt); // If it's a valid date string, convert it
      }

      return docData;
    });

    setTotalUsers(usersData.length); // Set the total number of users

    const acdref = collection(db, "academic_qualifications");
    const acdsnap = await getDocs(acdref);
    setTotalAcd(acdsnap.size);

    const curRef = collection(db, "curriculums");
    const curSnap = await getDocs(curRef);
    setTotalCurriculum(curSnap.size);

    const detailRef = collection(db, "user-details");
    const detailSnap = await getDocs(detailRef);
    setTotalDetails(detailSnap.size);

    processUserRegistrationData(snapshot);
  };

  const processUserRegistrationData = (snapshot) => {
    const registrationMap = new Map();

    snapshot.docs.forEach((doc) => {
      const docData = doc.data();
      const dateKey = docData.createdAt
        ? docData.createdAt.toString().split("T")[0]
        : null;

      if (dateKey) {
        if (!registrationMap.has(dateKey)) {
          registrationMap.set(dateKey, 1);
        } else {
          registrationMap.set(dateKey, registrationMap.get(dateKey) + 1);
        }
      }
    });

    const registrationArray = Array.from(registrationMap, ([date, count]) => ({
      date,
      count,
    }));

    setUserRegistrationData(registrationArray);
  };

  useEffect(() => {
    if (selectedCollection === "all") {
      fetchAllData();
    } else {
      fetchCollectionData(selectedCollection);
    }
    fetchTotalUsers();
  }, [selectedCollection]);

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const processDataForGraph = () => {
    let totalEntries = {
      course: 0,
      level: 0,
      skill: 0,
      interest: 0,
      village: 0,
      area: 0,
    };

    data.forEach((entry) => {
      totalEntries.course += entry.course ? 1 : 0;
      totalEntries.level += entry.level ? 1 : 0;
      totalEntries.skill += entry.skill ? 1 : 0;
      totalEntries.interest += entry.interest ? 1 : 0;
      totalEntries.village += entry.birth ? 1 : 0;
      totalEntries.area += entry.area ? 1 : 0;
    });

    return [
      {
        name: "Total Entries",
        course: totalEntries.course,
        level: totalEntries.level,
        skill: totalEntries.skill,
        interest: totalEntries.interest,
        village: totalEntries.village,
        area: totalEntries.area,
      },
    ];
  };

  return (
    <>
      <AdminHeader />
      <div className="dashboard-container " style={{ marginTop: "4rem" }}>
        <h2 className="text-center fw-bold dashboard_title">Dashboard</h2>
        <div className="dashboard-summary">
          <div className="summary-block bg-primary">
            <h3 className="text-light">Total Registered Users</h3>
            <p className="text-light">{totalUsers}</p>
          </div>
          <div className="summary-block bg-info">
            <h3 className="text-dark fw-bold">Total Curriculum Entries</h3>
            <p className="text-dark">{totalCurriculum}</p>
          </div>
          <div className="summary-block bg-dark">
            <h3 className="text-light">Total Academic Entries</h3>
            <p className="text-light">{totalAcd}</p>
          </div>

          <div className="summary-block bg-warning">
            <h3 className="fw-bold">Total User Entries</h3>
            <p>{totalDetails}</p>
          </div>
        </div>
        <div className="dropdown-container">
          <label htmlFor="collectionSelect">Select Collection: </label>
          <select
            id="collectionSelect"
            value={selectedCollection}
            onChange={handleCollectionChange}
          >
            <option value="all">All Collections</option>
            <option value="curriculums">Curriculums</option>
            <option value="user-details">User Details</option>
            <option value="academic_qualifications">Academic Details</option>
          </select>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="chart-container">
                <h3>
                  {selectedCollection === "all"
                    ? "All Data"
                    : selectedCollection}{" "}
                  Data
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={processDataForGraph()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="course" fill="#8884d8" />
                    <Bar dataKey="level" fill="#292929" />
                    <Bar dataKey="skill" fill="#82ca9d" />
                    <Bar dataKey="interest" fill="#ffc658" />
                    <Bar dataKey="village" fill="#d0ed57" />
                    <Bar dataKey="area" fill="#a4de6c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="chart-container">
                <h3>Total Registered Users Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userRegistrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
