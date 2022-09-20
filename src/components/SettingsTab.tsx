import { Button, Stack, TextField } from '@mui/material';
import { useCleaningSettings, useSettingsStore } from '../stores/settingsStore';

const SettingsTab = () => {
  const settings = useCleaningSettings();

  const onChangePeriod = useSettingsStore((state) => state.setCleaningPeriod);

  return (
    <Stack gap={2}>
      <TextField
        label="Cleaning period (in days)"
        variant="filled"
        placeholder="10"
        value={settings.cleaningPeriod}
        onChange={(e) => onChangePeriod(Number(e.target.value))}
        type="number"
      />
    </Stack>
  );
};

export default SettingsTab;
