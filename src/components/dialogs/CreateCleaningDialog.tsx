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
import { useShowCreateCleaningDialog } from '../../stores/createStores/createCleaningStore';
import { useRoomsStore } from '../../stores/roomsStore';
import { useUsersStore } from '../../stores/usersStore';

export const CreateCleaningDialog = () => {
  const {
    userId,
    roomId,
    date,
    createCleaning,
    showDialog,
    toggleDialog,
    errors,
    handleDateChange,
    handleInputChange,
    handleSelectChange,
    rooms,
    users,
  } = useShowCreateCleaningDialog();

  const fieldHasError = (field: string): boolean =>
    (errors && errors[field] != null) ?? true;

  const fieldHelperText = (field: string): string =>
    errors != null && errors[field] != null ? errors[field].message : '';

  return (
    <Dialog open={showDialog} onClose={toggleDialog}>
      <DialogTitle>Add cleaning</DialogTitle>
      <DialogContent>
        <Box component="form" autoComplete="off">
          <DialogContentText sx={{ mb: 1 }}>
            Add a cleaning to the database by selecting the cleaning name, the
            cleaned room and the date.
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
          <FormControl
            variant="filled"
            sx={{ mb: 1 }}
            fullWidth
            error={fieldHasError('roomId')}
          >
            <InputLabel id="room-select-label">Room</InputLabel>
            <Select
              labelId="room-select-label"
              value={roomId}
              name="roomId"
              label="Room"
              onChange={handleSelectChange}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DesktopDatePicker
            label="Last time cleaned"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={(val) => handleDateChange(val == null ? undefined : val)}
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
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button type="submit" onClick={createCleaning}>
          Add cleaning
        </Button>
      </DialogActions>
    </Dialog>
  );
};
