import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../../common/components/CommonFunction";
import TopCard from "../../common/components/TopCard";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { fetchDashboardInfo } from "./HomeAPICall";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [dashboardData, setDashboardData] = useState([] as any);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>(getFromLocalStorage('blogs'));
  const [categories, setCategories] = useState<any[]>(getFromLocalStorage('categories'));

  useEffect(() => {
    setBlogs(getFromLocalStorage('blogs'));
    setCategories(getFromLocalStorage('categories'));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateCurrentPath("home", ""));

    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardInfo(); // Use the function here
        if (data) {
          setDashboardData(data);
        } else {
          setError("Failed to load dashboard info.");
        }
      } catch (err) {
        setError("Error fetching dashboard info.");
      }
      setLoading(false);
    };

    loadDashboardData();
  }, [dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>
      <div className="row">
        <TopCard title="Total Blogs" text={`${dashboardData.totalBlogs}`} icon="book" class="primary" />
        <TopCard title="Total Categories" text={`${dashboardData.totalCategories}`} icon="list" class="info" />
      </div>
      <div className="row">
      </div>
    </Fragment>
  );
};

export default Home;
