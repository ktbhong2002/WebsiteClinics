import axios from '../axios';

const filterClinics = (data) => axios.post('/api/filter-clinics', data);

const udateClinicData = (data) => axios.post('/api/edit-clinic', data);

const getDetailClinicById = (data) => axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);

const deleteClinic = (data) => axios.get(`/api/delete-clinic?id=${data.id}`);

export { deleteClinic, filterClinics, udateClinicData, getDetailClinicById };
