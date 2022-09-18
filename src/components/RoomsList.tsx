import { Add } from '@mui/icons-material';
import {
  Card,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDialogsStore } from '../stores/dialogsStore';
import { useRoomsStore } from '../stores/roomsStore';

const RoomsList = () => {
  const toggleCreateRoomDialog = useDialogsStore(
    (state) => state.toggleCreateRoomDialog
  );

  const rooms = useRoomsStore((state) => state.rooms);

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
