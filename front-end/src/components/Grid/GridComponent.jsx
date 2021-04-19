import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../store/appointments/actions";
import { useEffect } from "react";

export const GridComponent = () => {
  const dispatch = useDispatch();

  const appointments = useSelector((state) => state.appointments.appointments);

  const date = new Date();
  const firstDayOfTheWeeK = date.getDate() - date.getDay() + 1;

  const reservedAppointments = [];
  useEffect(() => {
    // console.log("Appointments", appointments);
    appointments.list &&
      appointments.list.map((appointment) => {
        appointment.reserved.map((app) => {
          let rd = new Date(app.begins);
          reservedAppointments.push({
            day: rd.getDate(),
            reservation: {
              hour: rd.getHours(),
              court: app.court,
            },
          });
        });
      });
    // console.log("changed", reservedAppointments);
  }, [appointments]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-between" spacing={1}>
            {[...Array(7).keys()].map((value) => (
              <Grid key={value} item xs={1}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      spacing={4}
                    >
                      {value < 5
                        ? [...Array(15).keys()].map((itemValue) => (
                            <Grid key={itemValue} item>
                              <Card
                                date={date}
                                day={value + firstDayOfTheWeeK}
                                hour={itemValue + 8}
                                reservedAppointments={
                                  reservedAppointments
                                  // ifReserved(
                                  //   value + firstDayOfTheWeeK,
                                  //   itemValue + 8
                                  // )
                                }
                              />
                            </Grid>
                          ))
                        : [...Array(14).keys()].map((itemValue) => (
                            <Grid key={itemValue} item>
                              <Card
                                date={date}
                                day={value + firstDayOfTheWeeK}
                                hour={itemValue + 8}
                                reservedAppointments={
                                  reservedAppointments
                                  // ifReserved(
                                  //   value + firstDayOfTheWeeK,
                                  //   itemValue + 8
                                  // )
                                }
                              />
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
