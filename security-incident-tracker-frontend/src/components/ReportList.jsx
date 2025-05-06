import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ReportList() {
  const { incidentId } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`/api/incidents/${incidentId}/reports/`)
      .then(res => res.json())
      .then(data => setReports(data));
  }, [incidentId]);

  return (
    <div>
      <h2>Reports for Incident {incidentId}</h2>
      <Link to={`/incidents/${incidentId}/new-report`}>+ Add Report</Link>
      {reports.map(report => (
        <div key={report.id}>
          <h4>{report.title}</h4>
          <p>{report.content}</p>
          <Link to={`/reports/${report.id}`}>View Comments</Link>
        </div>
      ))}
    </div>
  );
}
