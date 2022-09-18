import { Card, Divider, List, ListItemText } from '@mui/material';
import { useUsersStore } from '../stores/usersStore';

const UsersList = () => {
  const users = useUsersStore((state) => state.users);

  return (
    <Card sx={{ width: '100%' }}>
      <List>
        {users.map((user, i) => (
          <>
            <ListItemText
              key={user.id}
              primary={user.name}
              secondary={user.lastTimeCleaned?.format('DD/MM/YYYY')}
              sx={{ px: 2, py: 1 }}
            />
            {i != users.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </Card>
  );
};

export default UsersList;
