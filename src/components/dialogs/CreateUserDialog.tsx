import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import {
  useFormErrors,
  useAddUserForm,
  useShowCreateUserDialog,
} from '../../stores/createStores/createUserStore';

export const CreateUserDialog = () => {
  const { createUser, showDialog, toggleDialog } = useShowCreateUserDialog();
  const { errors } = useFormErrors();
  const { name, handleInputChange } = useAddUserForm();

  const fieldHasError = (field: string): boolean =>
    (errors && errors[field] != null) ?? true;

  const fieldHelperText = (field: string): string =>
    errors != null && errors[field] != null ? errors[field].message : '';

  return (
    <Dialog open={showDialog} onClose={toggleDialog}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Box component="form" autoComplete="off">
          <DialogContentText sx={{ mb: 1 }}>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button type="submit" onClick={createUser}>
          Add user
        </Button>
      </DialogActions>
    </Dialog>
  );
};
