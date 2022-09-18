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
import { useCleaningsStore } from '../stores/cleaningsStore';
import { useDialogsStore } from '../stores/dialogsStore';

const CleaningsList = () => {
  const toggleCreateCleaningDialog = useDialogsStore(
    (state) => state.toggleCreateCleaningDialog
  );

  const cleanings = useCleaningsStore((state) => state.cleanings);

  return (
    <div>
      <Fab
        variant="extended"
        sx={{ position: 'absolute', bottom: 24, right: 24 }}
        color="secondary"
        onClick={toggleCreateCleaningDialog}
      >
        <Add sx={{ mr: 1 }} />
        Add cleaning
      </Fab>

      <Card sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleanings.map((cleaning) => (
                <TableRow
                  key={cleaning.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {cleaning.date.format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {cleaning.user.name}
                  </TableCell>
                  <TableCell align="right">{cleaning.room.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default CleaningsList;
