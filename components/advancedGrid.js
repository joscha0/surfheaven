import React, { useState, useEffect, useCallback } from "react";
import TablePagination from "@mui/material/TablePagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RecordCard from "./recordCard";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import MapCard from "./mapCard";

const AdvancedGrid = ({ items, isRecord, openModal }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchString, setSearchString] = useState("");

  const sortingOptionsRecord = [
    "Date newest",
    "Date oldest",
    "Rank ↑",
    "Rank ↓",
    "Tier ↑",
    "Tier ↓",
    "Map name A-Z",
    "Map name Z-A",
  ];

  const sortingOptionsMap = [
    "Tier ↑",
    "Tier ↓",
    "Date added newest",
    "Date added oldest",
    "Map name A-Z",
    "Map name Z-A",
    "Completions ↑",
    "Completions ↓",
  ];

  const [sortingOption, setSortingOption] = React.useState(
    isRecord ? sortingOptionsRecord[0] : sortingOptionsMap[0]
  );

  useEffect(() => {
    setFilteredItems(items.sort(getComparator()));
  }, [items, getComparator]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const search = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setFilteredItems(
        items.filter(
          (e) =>
            e.map.toLowerCase().match(event.target.value.toLowerCase()) ||
            (e.author !== undefined &&
              e.author.toLowerCase().match(event.target.value.toLowerCase()))
        )
      );
    } else {
      setFilteredItems(items);
    }
    setPage(0);
    setSearchString(event.target.value);
  };

  const handleChangeSorting = (event) => {
    setSortingOption(event.target.value);
  };

  const getComparator = useCallback(() => {
    const sortingOptions = [
      "Date newest",
      "Date oldest",
      "Rank ↑",
      "Rank ↓",
      "Tier ↑",
      "Tier ↓",
      "Map name A-Z",
      "Map name Z-A",
      "Date added newest",
      "Date added oldest",
      "Completions ↑",
      "Completions ↓",
    ];
    switch (sortingOption) {
      case sortingOptions[0]:
        return (a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1);
      case sortingOptions[1]:
        return (a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1);
      case sortingOptions[2]:
        return (a, b) => (a.rank > b.rank ? 1 : -1);
      case sortingOptions[3]:
        return (a, b) => (a.rank > b.rank ? -1 : 1);
      case sortingOptions[4]:
        return (a, b) => (a.tier > b.tier ? 1 : -1);
      case sortingOptions[5]:
        return (a, b) => (a.tier > b.tier ? -1 : 1);
      case sortingOptions[6]:
        return (a, b) => (a.map + a.track).localeCompare(b.map + b.track);
      case sortingOptions[7]:
        return (a, b) => (a.map + a.track).localeCompare(b.map + b.track) * -1;
      case sortingOptions[8]:
        return (a, b) =>
          new Date(a.date_added) > new Date(b.date_added) ? -1 : 1;
      case sortingOptions[9]:
        return (a, b) =>
          new Date(a.date_added) > new Date(b.date_added) ? 1 : -1;
      case sortingOptions[10]:
        return (a, b) => (a.completions > b.completions ? 1 : -1);
      case sortingOptions[11]:
        return (a, b) => (a.completions > b.completions ? -1 : 1);
      default:
        return 1;
    }
  }, [sortingOption]);

  return (
    <div>
      <Box
        sx={{
          paddingX: { xs: 0, sm: 3 },
          paddingBottom: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          placeholder="Search…"
          fullWidth
          variant="filled"
          onChange={search}
          value={searchString}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Sorting Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sortingOption}
            onChange={handleChangeSorting}
            label="Sorting Option"
          >
            {(isRecord ? sortingOptionsRecord : sortingOptionsMap).map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>
      {filteredItems.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {filteredItems
            .sort(getComparator())
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((record) => (
              <Grid item xs key={record.map + record.track}>
                {isRecord ? (
                  <RecordCard record={record} openModal={openModal} />
                ) : (
                  <MapCard record={record} openModal={openModal} />
                )}
              </Grid>
            ))}
        </Grid>
      ) : (
        <p>No records found :(</p>
      )}
      <TablePagination
        component="div"
        count={filteredItems.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={(isRecord ? "Records" : "Items") + " per page:"}
        rowsPerPageOptions={[8, 12, 16, 20, 40, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdvancedGrid;
