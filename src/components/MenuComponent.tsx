import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { reminderType } from "../types/firestoreDataTypes";
import useFirestoreDb from "../hooks/useFirestoreDb";
export const PopUpMenuItem = (props: any) => {
  const { title, icon, click, ...otherProps } = props;
  return (
    <MenuItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onClick={() => click()}
      {...otherProps}
    >
      <Typography sx={{ pr: 1, fontSize: { xs: 14 } }}>{title}</Typography>
      {icon}
    </MenuItem>
  );
};

const MenuComponent: React.FC<{
  eachData: reminderType;
  setData: React.Dispatch<React.SetStateAction<reminderType>>;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ eachData, setData, toggleModal }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);

  const LinkMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuClose = () => {
    setAnchorEl(null);
  };

  const { update, remove } = useFirestoreDb();

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
        <PopUpMenuItem
          title="Edit"
          icon={<EditIcon />}
          click={() => {
            toggleModal(true);
            setData(eachData);
          }}
        />
        <PopUpMenuItem
          title={!eachData.favorite ? "Favorite" : "Unfavorite"}
          icon={!eachData.favorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          click={() => {
            update({
              id: eachData.id,
              type: "Reminder",
              favorite: !eachData.favorite,
            });
          }}
        />
        <PopUpMenuItem
          title="Delete"
          icon={<DeleteIcon />}
          click={() => {
            remove("Reminder", eachData.id);
          }}
        />
      </Menu>
    </>
  );
};

export default MenuComponent;
