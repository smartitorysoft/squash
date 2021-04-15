import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../store/appointments/actions";
import { useEffect } from "react";

export const GridComponent = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAppointments());
  // }, []);

  const appointments = useSelector((state) => state.appointments.appointments);

  const date = new Date();
  const firstDayOfTheWeeK = date.getDate() - date.getDay() + 1;

  const reservedAppointments = [];
  useEffect(() => {
    console.log("Appointments", appointments);
    appointments.items &&
      appointments.items.map((appointment) => {
        let rd = new Date(appointment.begins);
        reservedAppointments.push({
          day: rd.getDate(),
          reservation: {
            hour: rd.getHours(),
            court: appointment.court,
          },
        });
      });
  }, [appointments]);

  // const ifReserved = (rd, rh) => {
  //   let obj = [];
  // reservedAppointments.map((e) => {
  //     console.log(rd, rh, e.day);
  //     if (
  //       e.day === rd &&
  //       e.reservation.hour === rh &&
  //       !obj.includes(e.reservation.court)
  //     ) {
  //       obj.push(e.reservation.court);
  //     }
  //   });
  //   console.log("obj", obj);
  //   return obj;
  // };

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
