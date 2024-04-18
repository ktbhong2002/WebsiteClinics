import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getAllUsers } from 'src/Services/userService';
import { toast } from 'react-toastify';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers(`ALL`);
        if (res && res.errCode === 0) {
          setUsers(res.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
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
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleDeleteUser = async (userId) => {
    try {
      // Gọi API hoặc hàm xóa người dùng ở đây
      // Sau khi xóa thành công, cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã bị xóa
      // Ví dụ:
      // const res = await deleteUserService(userId);
      // if (res && res.errCode === 0) {
      //   toast.info('Xóa tài khoản thành công');
      //   setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      // }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý tài khoản người dùng</Typography>
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
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Họ tên' },
                  { id: 'phoneNumber', label: 'Số điện thoại' },
                  { id: 'email', label: 'Email' },
                  { id: 'gender', label: 'Giới tính' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'roleId', label: 'Vai trò' },
                  { id: 'action', label: 'Hành động' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      userId={row.id}
                      firstName={row.firstName}
                      lastName={row.lastName}
                      phoneNumber={row.phoneNumber}
                      email={row.email}
                      gender={row.gender}
                      address={row.address}
                      roleId={row.roleId}
                      status={row.status}
                      avatarUrl={row.image}
                      selected={selected.indexOf(row.email) !== -1}
                      handleClick={(event) => handleClick(event, row.email)}
                      onDeleteUser={handleDeleteUser}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
