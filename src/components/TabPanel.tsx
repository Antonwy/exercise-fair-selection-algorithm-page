import { Box, Typography } from '@mui/material';
import { useTabStore } from '../stores/tabStore';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
};

export const TabPanel = (props: TabPanelProps) => {
  const { children, index, ...other } = props;
  const activeTab = useTabStore((state) => state.activeTab);

  return (
    <div hidden={activeTab !== index} {...other}>
      <Box
        sx={{ p: 3, visibility: activeTab === index ? 'visible' : 'hidden' }}
      >
        {children}
      </Box>
    </div>
  );
};
