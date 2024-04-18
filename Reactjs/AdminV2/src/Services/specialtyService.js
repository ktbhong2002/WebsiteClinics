import axios from '../axios';

const filterSpecialties = (data) => axios.post('/api/filter-specialties', data);

const udateSpecialtyData = (data) => axios.post('/api/edit-specialty', data);

const getDetailSpecialtyById = (data) =>
  axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=ALL`);

const deleteSpecialty = (data) => axios.get(`/api/delete-specialty?id=${data.id}`);

export { deleteSpecialty, filterSpecialties, udateSpecialtyData, getDetailSpecialtyById };
