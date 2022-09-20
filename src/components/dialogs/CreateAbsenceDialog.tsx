import { RoomOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useShowCreateAbsenceDialog } from '../../stores/createStores/createAbsenceStore';

export const CreateAbsenceDialog = () => {
  const {
    userId,
    createAbsence,
    showDialog,
    toggleDialog,
    handleDateChange,
    handleSelectChange,
    users,
    errors,
    from,
    to,
  } = useShowCreateAbsenceDialog();

  const fieldHasError = (field: string): boolean =>
    (errors && errors[field] != null) ?? true;

  const fieldHelperText = (field: string): string =>
    errors != null && errors[field] != null ? errors[field].message : '';

  return (
    <Dialog open={showDialog} onClose={toggleDialog}>
      <DialogTitle>Add absence</DialogTitle>
      <DialogContent>
        <Box component="form" autoComplete="off">
          <DialogContentText sx={{ mb: 1 }}>
            Add an absence to the database by selecting the absent user, and the
            from, to date.
          </DialogContentText>
          <FormControl
            variant="filled"
            sx={{ mb: 1 }}
            fullWidth
            error={fieldHasError('userId')}
          >
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              value={userId}
              name="userId"
              label="User"
              onChange={handleSelectChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DesktopDatePicker
            label="Absent from"
            inputFormat="MM/DD/YYYY"
            value={from}
            onChange={(val) => val && handleDateChange('from', val)}
            renderInput={(params) => (
              <TextField
                required
                error={fieldHasError('from')}
                helperText={fieldHelperText('from')}
                id="from"
                fullWidth
                type="text"
                variant="filled"
                sx={{ mb: 1 }}
                {...params}
              />
            )}
          />
          <DesktopDatePicker
            label="To"
            inputFormat="MM/DD/YYYY"
            value={to}
            onChange={(val) => val && handleDateChange('to', val)}
            renderInput={(params) => (
              <TextField
                required
                error={fieldHasError('to')}
                helperText={fieldHelperText('to')}
                id="to"
                fullWidth
                type="text"
                variant="filled"
                {...params}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button type="submit" onClick={createAbsence}>
          Add absence
        </Button>
      </DialogActions>
    </Dialog>
  );
};
