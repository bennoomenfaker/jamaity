import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JobsComponent from './component/JobsComponent';
import JobComponent from './component/jobComponent';
import ReportsComponent from './component/ReportsComponent';
import ReportComponnet from './component/ReportComponnet';

const App = () => {
  return (
    <Routes>
                           <Route path="/jobs" element={<JobsComponent/>} />
                           <Route path="/jobs/:id" element={<JobComponent/>} />
                           <Route path="/reports/:id" element={<ReportComponnet/>} />


              <Route path="/reports" element={<ReportsComponent/>} />

    </Routes>
  );
};

export default App;