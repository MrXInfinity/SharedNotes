import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ModalWrapper: React.FC<{
  isOpen: boolean;
  title: string | JSX.Element;
  closeModal: () => void;
  options?: JSX.Element;
  children: React.ReactNode;
}> = ({ isOpen, title, closeModal, children, options }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => closeModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          {typeof title === "string" ? (
            <Typography
              id="new-note-modal-title"
              sx={{ fontWeight: "bold", fontSize: { xs: 24, md: 32 } }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
          <Stack direction="row">
            {options}
            <IconButton onClick={() => closeModal()}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>

        {children}
      </Box>
    </Modal>
  );
};

const NoDataComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        height: "min-content",
        maxHeight: "200px",
        alignItems: "start",
        px: 2,
        py: 1.7,
        fontSize: 16,
        opacity: 0.9,
      }}
    >
      {title}
    </Card>
  );
};

const PageLayout: React.FC<{
  title: string;
  pageList: JSX.Element;
  modal?: JSX.Element;
  customCss?: { [key: string]: string | { [property: string]: string } };
  action?: JSX.Element;
}> = ({ title, pageList, modal, customCss, action }) => {
  return (
    <>
      <Container
        sx={{ px: { xs: 4, sm: 6 }, pt: { xs: 0, md: 6 } }}
        disableGutters={true}
      >
        <Stack direction="row">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 24, sm: 30, md: 36, lg: 40 },
            }}
          >
            {title}
          </Typography>
          {action}
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            },
            ...customCss,
            gap: 4,
            width: "100%",
            flexWrap: "wrap",
            paddingTop: 2,
            alignContent: "flex-end",
          }}
        >
          {pageList}
        </Box>
      </Container>
      {modal}
    </>
  );
};

const MenuComponent: React.FC<{
  data: { title: string; icon: any; click: () => void }[];
}> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);

  const LinkMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="settings"
        onClick={LinkMenuClick}
        aria-controls={showMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={showMenu ? "true" : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={showMenu}
        onClose={MenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {data.map(({ title, icon, click }, index) => (
          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => {
              click();
              MenuClose();
            }}
            key={index}
          >
            <Typography sx={{ pr: 1, fontSize: { xs: 14 } }}>
              {title}
            </Typography>
            {icon}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { ModalWrapper, NoDataComponent, PageLayout, MenuComponent };
