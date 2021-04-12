import React from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card/Card";

export const GridComponent = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="spacebetween" spacing="1">
            {[0, 1, 2, 3, 4, 5, 6].map((value) => (
              <Grid key={value} item xs={1}>
                <Grid container spacing={16}>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      spacing="12"
                    >
                      {[0, 1, 2, 3].map((value) => (
                        <Grid key={value} item>
                          <Card reserved={[]} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
