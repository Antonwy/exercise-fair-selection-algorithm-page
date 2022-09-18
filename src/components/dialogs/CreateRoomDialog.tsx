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
  useCreateRoomForm,
  useFormErrors,
  useShowCreateRoomDialog,
} from '../../stores/createStores/createRoomStore';

export const CreateRoomDialog = () => {
  const { createRoom, showDialog, toggleDialog } = useShowCreateRoomDialog();
  const { errors } = useFormErrors();
  const { name, handleInputChange } = useCreateRoomForm();

  const fieldHasError = (field: string): boolean =>
    (errors && errors[field] != null) ?? true;

  const fieldHelperText = (field: string): string =>
    errors != null && errors[field] != null ? errors[field].message : '';

  return (
    <Dialog open={showDialog} onClose={toggleDialog}>
      <DialogTitle>Add Room</DialogTitle>
      <DialogContent>
        <Box component="form" autoComplete="off">
          <DialogContentText sx={{ mb: 1 }}>
            Add a room to the database by entering the room name
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
        <Button type="submit" onClick={createRoom}>
          Add room
        </Button>
      </DialogActions>
    </Dialog>
  );
};
