// import { doctors } from 'src/_mock/doctor';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getAllDoctors } from 'src/Services/userService';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import DoctorTableRow from '../doctor-table-row';
import TableEmptyRows from '../table-empty-rows';
import DoctorTableHead from '../doctor-table-head';
import UserTableToolbar from '../doctor-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { toast, ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------

export default function DoctorPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [doctors, setDoctors] = useState([]);

  // Loại bỏ điều kiện trong useEffect và luôn đặt người dùng lấy được từ API
  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await getAllDoctors();
      if (res && res.errCode === 0) {
        const arrDoctors = res.data;
        setDoctors(arrDoctors);
      }
    };
    fetchDoctors();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = doctors.map((n) => n.name);
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
    inputData: doctors,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý danh sách bác sĩ</Typography>

        <Link to="/create-user">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            Tạo tài khoản
          </Button>
        </Link>
      </Stack>

      <Card>
        <UserTableToolbar
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
                rowCount={doctors.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Họ tên' },
                  { id: 'phoneNumber', label: 'Số điện thoại' },
                  // { id: 'email', label: 'Email' },
                  { id: 'position', label: 'Chức danh' },
                  { id: 'specialty', label: 'Chuyên khoa' },
                  { id: 'clinic', label: 'Bệnh viện' },
                  // { id: 'isVerified', label: 'Verified', align: 'center' },
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
                      doctorId={row.id}
                      firstName={row.firstName}
                      lastName={row.lastName}
                      phoneNumber={row.phoneNumber}
                      email={row.email}
                      status={row.status}
                      avatarUrl={row.image}
                      position={row.positionData.valueVi}
                      specialty={row.Doctor_Infor.Specialty.name}
                      clinic={row.Doctor_Infor.nameClinic}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, doctors.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={doctors.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
