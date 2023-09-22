// 路由配置

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from "../pages/Issues.jsx";
import Books from "../pages/Books.jsx";
// import Jobs from "../pages/Jobs.jsx";
import Interview from "../pages/Interviews.jsx";
import IssuesDetail from "../pages/IssueDetail.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import Personal from "../pages/Personal.jsx";
import AddIssue from "../pages/AddIssue.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import NotFound from "../pages/NotFound.jsx";

function RouteConfig() {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />} />
      <Route path="/issues/:id" element={<IssuesDetail />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
      {/* <Route path="/jobs" element={<Jobs />} /> */}
      <Route path="/interviews" element={<Interview />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/addIssue" element={<AddIssue />} />
      <Route path="/searchPage" element={<SearchPage />} />
      <Route path="/" element={<Navigate replace to="/issues" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteConfig;