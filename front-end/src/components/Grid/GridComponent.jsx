import React from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card/Card";

export const GridComponent = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs>
          <Grid container direction="row" justify="spacebetween" spacing="10">
            {[...Array(7).keys()].map((value) => (
              <Grid key={value} item xs={1}>
                <Grid container spacing={10}>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      spacing="4"
                    >
                      {[...Array(8).keys()].map((value) => (
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
