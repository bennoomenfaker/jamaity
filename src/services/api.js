import axios from 'axios';

const API_BASE_URL = 'https://jamaity-org-1.onrender.com';

export const fetchReports = async () => {
  const response = await axios.get(`${API_BASE_URL}/reports/`);
  return response.data;
};

export const fetchJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/jobs/`);
  return response.data;
};

export const fetchJobById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
    return response.data;
  };

  export const fetchReportById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/reports/${id}`);
    return response.data;
  };