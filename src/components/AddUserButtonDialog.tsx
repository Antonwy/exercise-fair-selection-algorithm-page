import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {
  useAddUserForm,
  useFormErrors,
  useShowDialog,
} from '../stores/addUserDialogStore';

export const AddUserButtonDialog = () => {
  const { showDialog, addUser, openDialog, closeDialog } = useShowDialog();
  const { errors } = useFormErrors();
  const { name, lastTimeCleaned, handleInputChange, handleDateChange } =
    useAddUserForm();

  const fieldHasError = (field: string): boolean =>
    (errors && errors[field] != null) ?? true;

  const fieldHelperText = (field: string): string =>
    errors != null && errors[field] != null ? errors[field].message : '';

  return (
    <div>
      <Button variant="outlined" onClick={openDialog}>
        Add User
      </Button>

      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" autoComplete="off">
            <DialogContentText>
              Add a user to the database by entering their name and their last
              cleaned date.
            </DialogContentText>
            <TextField
              required
              error={fieldHasError('name')}
              helperText={fieldHelperText('name')}
              id="name"
              fullWidth
              label="Name"
              type="text"
              variant="filled"
              value={name}
              onChange={handleInputChange}
              sx={{ mb: 1 }}
            />
            <DesktopDatePicker
              label="Last time cleaned"
              inputFormat="MM/DD/YYYY"
              value={lastTimeCleaned}
              onChange={(val) =>
                handleDateChange(val == null ? undefined : val)
              }
              renderInput={(params) => (
                <TextField
                  required
                  error={fieldHasError('lastTimeCleaned')}
                  helperText={fieldHelperText('lastTimeCleaned')}
                  onChange={handleInputChange}
                  id="lastTimeCleaned"
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
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit" onClick={addUser}>
            Add user
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
