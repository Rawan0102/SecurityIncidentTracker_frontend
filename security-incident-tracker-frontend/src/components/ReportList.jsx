import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getAllReports } from '../utilities/report-api';
import CommentList from './CommentList';
import './ReportList.css'

function ReportList({user}) {
  const { incidentId } = useParams();
  const location = useLocation()
  const { role } = location.state || {}
  const [reports, setReports] = useState([]);
  useEffect(() => {
    async function fetchReports() {
      try {
        const reportData = await getAllReports(incidentId)
        // console.log('all reports', reportData)
        const filteredReports = reportData.filter(report => report.incident == incidentId)
        setReports(filteredReports)
        // console.log('filtered reports', reports)
      } catch (err) {
        console.log(err)
        setError('Could not load reports: ' + err.message);
      }
    }
    fetchReports()
  }, [incidentId]);
  return (
    <div>
      <h2>Reports for Incident {incidentId}</h2>
      {role === 'employee' && <Link to={`/report`} state={{ incident_id: incidentId }} >
        + Add Report
      </Link>}
      {reports.map(report => (
        <div key={report.id} className='report-card'>
            <Link to={`/reports/${report.id}`} state={{ role: role }}>
        <h4>Edit Report: {report.title}</h4>
            </Link>
          <p>{report.content}</p>
          {/* <Link to={`/report/${report.id}/comments`}>View Comments</Link> */}
          <CommentList reportId={report.id} role={role} user={user} />
        </div>
      ))}
    </div>
  );
}
export default ReportList;