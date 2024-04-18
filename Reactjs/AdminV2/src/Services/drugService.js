import axios from '../axios';

const filterDrugs = (data) => axios.post('/api/filter-drugs', data);

const createDrug = (data) => axios.post('/api/create-new-drug', data);

const deleteDrugById = (drugId) =>
  axios.delete('/api/delete-drug', {
    data: {
      id: drugId,
    },
  });

const getDrugInfoById = (inputId) => axios.get(`/api/get-drug-by-id?drugId=${inputId}`);

const editDrug = (inputData) => axios.put('/api/edit-drug', inputData);

export { editDrug, createDrug, filterDrugs, deleteDrugById, getDrugInfoById };
