// import { specialties } from 'src/_mock/doctor';
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

import { getAllMedicalPackages } from 'src/Services/userService';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import MedicalPackageTableRow from '../medicalPackage-table-row';
import { emptyRows, applyFilter, getComparator } from '../utils';
import MedicalPackageTableHead from '../medicalPackage-table-head';
import MedicalPackageTableToolbar from '../medicalPackage-table-toolbar';

// ----------------------------------------------------------------------

export default function SpecialtyPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [medicalPackages, setMedicalPackages] = useState([]);

  // Loại bỏ điều kiện trong useEffect và luôn đặt người dùng lấy được từ API
  useEffect(() => {
    const fetchMedicalPackages = async () => {
      const res = await getAllMedicalPackages();
      if (res && res.errCode === 0) {
        const arrMedicalPackages = res.data;
        setMedicalPackages(arrMedicalPackages);
      }
    };
    fetchMedicalPackages();
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
      const newSelecteds = medicalPackages.map((n) => n.name);
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
    inputData: medicalPackages,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý danh sách gói khám</Typography>

        <Link to="/create-medical-package">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            Tạo gói khám mới
          </Button>
        </Link>
      </Stack>

      <Card>
        <MedicalPackageTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <MedicalPackageTableHead
                order={order}
                orderBy={orderBy}
                rowCount={medicalPackages.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Tên gói khám' },
                  { id: 'image', label: 'Ảnh' },
                  { id: 'sapo', label: 'Mô tả' },
                  { id: 'specialty', label: 'Chuyên khoa' },
                  { id: 'clinic', label: 'Cơ sở' },
                  { id: 'price', label: 'Giá gói' },
                  { id: 'action', label: 'Hành động' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <MedicalPackageTableRow
                      key={row.id}
                      medicalPackageId={row.id}
                      name={row.name}
                      avatarUrl={row.image}
                      sapo={row.sapo}
                      specialty={row.specialtyData.name}
                      clinic={row.clinicData.name}
                      price={row.price}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, medicalPackages.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={medicalPackages.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
