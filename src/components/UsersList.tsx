import { Add, Delete, Info, MoreVert } from '@mui/icons-material';
import {
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDialogsStore } from '../stores/dialogsStore';
import { usePersistentUsers, useUsersStore } from '../stores/usersStore';

const UsersList = () => {
  const users = usePersistentUsers();
  const removeUser = useUsersStore((state) => state.removeUser);

  const toggleCreateUserDialog = useDialogsStore(
    (state) => state.toggleCreateUserDialog
  );

  return (
    <>
      <Fab
        variant="extended"
        sx={{ position: 'absolute', bottom: 24, right: 24 }}
        color="secondary"
        onClick={toggleCreateUserDialog}
      >
        <Add sx={{ mr: 1 }} />
        Add user
      </Fab>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell padding="checkbox" />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton onClick={() => removeUser(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;
