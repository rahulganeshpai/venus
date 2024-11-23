import React, { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CsvDownloader from "react-csv-downloader";
import "./mainpage.css";

const mainpage = () => {
  let InitialState = null;

  const columns = [
    {
      id: "first",
      displayName: "First column",
    },
    {
      id: "second",
      displayName: "Second column",
    },
  ];

  const datas = [
    {
      first: "foo",
      second: "bar",
    },
    {
      first: "foobar",
      second: "foobar",
    },
  ];

  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        InitialState = results.data;
      },
    });
  };
  const downloadHandler = () => {
    const CSVString = Papa.unparse(InitialState, { newline: "\n" });
    console.log(CSVString);
  };
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ background: "#643B9F" }}>
            <Typography
              style={{ textAlign: "center", background: "#643B9F" }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Venus Online
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Stack spacing={2} direction="row">
              <input
                accept=".csv"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadHandler}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <CsvDownloader
                filename="myfile"
                extension=".csv"
                separator=";"
                wrapColumnChar="'"
                columns={columns}
                datas={datas}
                text="DOWNLOAD"
                className="MuiButton"
              />
              </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default mainpage;
