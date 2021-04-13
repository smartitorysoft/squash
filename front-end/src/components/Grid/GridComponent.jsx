import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../store/appointments/actions";
import { useEffect } from "react";
import moment from "moment";

export const GridComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    console.log("Appointments", appointments, moment().start("week"));
  }, [appointments]);

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
                      {[...Array(8).keys()].map((itemvalue) => (
                        <Grid key={itemvalue} item>
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
