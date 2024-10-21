import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Home from "../Home/Home";
import Notifications from "../../common/components/Notification";
import BlogManagement from "../BlogManagement/BlogManagement";
import BlogView from "../BlogManagement/BlogView";
import TestimonialsManagement from "../TestimonialsManagement/TestimonialsManagement";
import GalleryManagement from "../GalleryManagement/GalleryManagement";

const Admin: React.FC = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/BlogManagement`}><BlogManagement /></Route>
              <Route path={`/TestimonialsManagement`}><TestimonialsManagement /></Route>
              <Route path={`/GalleryManagement`}><GalleryManagement /></Route>
              <Route path="/view-blog/:blogId"><BlogView /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
