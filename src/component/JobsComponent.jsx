import React, { useState, useEffect } from 'react';
import { fetchJobs } from '../services/api';
import DataTable from './DataTable';
import { useNavigate } from 'react-router-dom';


const JobsComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData.jobs.map(job => ({
        id: job.id,
        title: job.fields.title,
      })));
    };

    fetchData();
  }, []);

  const handleConsultJob = (id) => {
    navigate(`/jobs/${id}`);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div>
      <h1>Jobs</h1>
      <DataTable
        rows={filteredJobs}
        columns={[
          { field: 'id', headerName: 'ID', width: 150 },
          { field: 'title', headerName: 'Title', width: 930 },
        ]}
        searchValue={jobSearch}
        onSearchChange={(e) => setJobSearch(e.target.value)}
        onConsult={handleConsultJob}
      />
    </div>
  );
};

export default JobsComponent;