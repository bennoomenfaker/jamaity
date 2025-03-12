import React, { useState, useEffect } from 'react';
import { fetchReports } from '../services/api';
import DataTable from './DataTable';
import {useNavigate} from 'react-router-dom'

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);
  const [reportSearch, setReportSearch] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await fetchReports();
      setReports(reportsData.reports);
    };

    fetchData();
  }, []);

  const handleConsultReport = (id) => {
    navigate(`/reports/${id}`);
  }

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(reportSearch.toLowerCase())
  );

  return (
    <div>
      <h1>Reports</h1>
      <DataTable
        rows={filteredReports}
        columns={[
          { field: 'id', headerName: 'ID', width: 150 },
          { field: 'title', headerName: 'Title', width: 930 },
        ]}
        searchValue={reportSearch}
        onSearchChange={(e) => setReportSearch(e.target.value)}
        onConsult={handleConsultReport}
      />
    </div>
  );
};

export default ReportsComponent;