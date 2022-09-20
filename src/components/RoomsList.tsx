import { Add, Delete } from '@mui/icons-material';
import {
  Card,
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
import { usePersistentRooms, useRoomsStore } from '../stores/roomsStore';

const RoomsList = () => {
  const toggleCreateRoomDialog = useDialogsStore(
    (state) => state.toggleCreateRoomDialog
  );

  const rooms = usePersistentRooms();
  const removeRoom = useRoomsStore((state) => state.removeRoom);

  return (
    <div>
      <Fab
        variant="extended"
        sx={{ position: 'absolute', bottom: 24, right: 24 }}
        color="secondary"
        onClick={toggleCreateRoomDialog}
      >
        <Add sx={{ mr: 1 }} />
        Add room
      </Fab>

      <Card sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow
                  key={room.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {room.name}
                  </TableCell>
                  <TableCell align="right">{room.id}</TableCell>
                  <TableCell padding="checkbox">
                    <IconButton onClick={() => removeRoom(room.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default RoomsList;
