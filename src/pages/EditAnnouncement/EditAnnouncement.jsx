import React from 'react'
import ManageAnnouncements from '../../components/ManageAnnouncements/ManageAnnouncements.jsx'
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function EditAnnouncement() {
  const announcements = useSelector((state) => state.announcements.data);

  const { id } = useParams();

  // eslint-disable-next-line
  const announcement = announcements.find((announcement) => announcement.id == id);

  if (!announcement)
    return <Navigate to="/error" replace />;

  return (
    <ManageAnnouncements announcement={announcement} />
  )
}

export default EditAnnouncement;