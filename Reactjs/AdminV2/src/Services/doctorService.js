import axios from '../axios';

const filterDoctors = (data) => axios.post('/api/filter-doctors', data);

export { filterDoctors };
