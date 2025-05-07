import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getReportById, updateReport, deleteReport } from '../utilities/report-api';
import './ReportDetails.css';

export default function ReportDetails({user}) {
//   const role = getUserRole();
  const { id } = useParams(); 
  const location = useLocation()
  const { role } = location.state || {}
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [formData, setFormData] = useState({     
    title: '',
    description: '',
    category: 'report.category',
    urgency: 'report.urgency',
    location: 'report.location',
    // incident: incidentId 
});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getReportById(id);
//         setReport(data);
//         setFormData({ title: data.title, description: data.description });
//       } catch (err) {
//         console.error('Failed to load report:', err);
//       }
//     }
//     fetchData();
//   }, [id]);

useEffect(() => {
    async function fetchData() {
      try {
        const data = await getReportById(id);
        setReport(data);
        console.log('report', report)
        setFormData({ 
          title: data.title, 
          description: data.description,
        });
      } catch (err) {
        console.error('Failed to load report:', err);
      }
    }
    fetchData();
  }, [id]);
  

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateReport(id, {...formData, 
        category: report.category, 
        urgency: report.urgency, 
        location: report.location, 
        incident: report.incident
      });
      alert('Report updated successfully');
      navigate(`/reports/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this report?');
    if (!confirmed) return;

    try {
      await deleteReport(id);
      alert('Report deleted');
      navigate('/reports');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  if (!report) return <p>Loading...</p>;
  return (
    <div className="report-details-container">
      <h2>Edit Report</h2>
      {role === 'employee' ? (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input name="title" value={formData.title} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <button type="submit">Update Report</button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Report
          </button>
        </form>
      ) : (
        <p className="access-msg">Only employees can edit or delete this report.</p>
      )}
    </div>
  );
}  