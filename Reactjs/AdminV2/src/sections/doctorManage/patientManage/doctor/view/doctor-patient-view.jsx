// import { doctors } from 'src/_mock/doctor';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getAllPatientsForDoctor } from 'src/Services/userService';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import DoctorTableRow from '../patient-table-row';
import DoctorTableHead from '../patient-table-head';
import DoctorTableToolbar from '../patient-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function DoctorManagePatienView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [patients, setPatients] = useState([]);

  // Loại bỏ điều kiện trong useEffect và luôn đặt người dùng lấy được từ API
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    const doctorId = userData ? JSON.parse(userData).id : null;
    const fetchPatients = async () => {
      const res = await getAllPatientsForDoctor({ doctorId });
      if (res && res.errCode === 0) {
        const arrPatients = res.data;
        setPatients(arrPatients);
      }
    };
    if (doctorId) {
      // Thêm kiểm tra để tránh gọi API khi doctorId không tồn tại
      fetchPatients();
    }
  }, []); // Thêm doctorId vào mảng dependency

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = patients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: patients,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý danh sách bệnh nhân</Typography>
      </Stack>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
      />{' '}
      <Card>
        <DoctorTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <DoctorTableHead
                order={order}
                orderBy={orderBy}
                rowCount={patients.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Thời gian' },
                  { id: 'firstName', label: 'Họ tên' },
                  // { id: 'email', label: 'Email' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'reason', label: 'Lý do khám' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'status', label: 'Trạng thái', align: 'center' },
                  { id: 'action', label: 'Hành động' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <DoctorTableRow
                      key={row.id}
                      time={row.timeTypeDataPatient.valueVi}
                      patientId={row.id}
                      date={row.date}
                      firstName={row.patientData.firstName}
                      // lastName={row.patientData.lastName}
                      address={row.patientData.address}
                      reason={row.patientData.reason}
                      gender={row.patientData.genderData.valueVi}
                      email={row.patientData.email}
                      status={row.statusDataPatient.valueVi}
                      timeType={row.timeType}
                      // keyMap={row.keyMap}
                      // avatarUrl={row.image}

                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, patients.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
