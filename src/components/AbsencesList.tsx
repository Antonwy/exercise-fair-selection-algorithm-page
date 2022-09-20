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
import moment from 'moment';
import {
  useAbsencesStore,
  usePersistentAbsences,
} from '../stores/absencesStore';
import { useDialogsStore } from '../stores/dialogsStore';

const AbsencesList = () => {
  const toggleCreateAbsencesDialog = useDialogsStore(
    (state) => state.toggleCreateAbsenceDialog
  );

  const absences = usePersistentAbsences();
  const removeAbsence = useAbsencesStore((state) => state.removeAbsence);

  return (
    <div>
      <Fab
        variant="extended"
        sx={{ position: 'absolute', bottom: 24, right: 24 }}
        color="secondary"
        onClick={toggleCreateAbsencesDialog}
      >
        <Add sx={{ mr: 1 }} />
        Add absence
      </Fab>

      <Card sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {absences.map((absence) => {
                return (
                  <TableRow
                    key={absence.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {absence.user.name}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {moment(absence.from).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {moment(absence.to).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <IconButton onClick={() => removeAbsence(absence.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AbsencesList;
