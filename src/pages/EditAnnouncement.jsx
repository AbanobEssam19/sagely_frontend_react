import React from 'react'
import ManageAnnouncements from '../components/ManageAnnouncements'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFound';

function EditAnnouncement() {
  const announcements = useSelector((state) => state.announcements.data);

  const { id } = useParams();

  // eslint-disable-next-line
  const announcement = announcements.find((announcement) => announcement.id == id);

  if (!announcement)
    return <NotFoundPage />

  return (
    <ManageAnnouncements announcement={announcement} />
  )
}

export default EditAnnouncement;