import React, { useState } from "react";
import "../../../styles/Card.module.css";
import AddIcon from "@material-ui/icons/Add";
import { ReserveModal } from "../ReserveModal/ReserveModal";
import { IconButton } from "@material-ui/core";
import { useEffect } from "react";

export const Card = ({ date, reservedAppointments, day, hour }) => {
  const [open, setOpen] = useState(false);

  // console.log("card", reservedAppointments);

  let reserved = [];
  useEffect(() => {
    reservedAppointments.map((e) => {
      if (
        e.day === day &&
        e.reservation.hour === hour &&
        !reserved.includes(e.reservation.court)
      ) {
        reserved.push(e.reservation.court);
      }
    });
    // console.log(reserved);
  }, [reservedAppointments]);

  date.setHours(hour);
  date.setMinutes(0);
  const reserveDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      day,
      date.getHours(),
      date.getMinutes()
    )
  ).toISOString();

  if (reserved && reserved.length > 0) {
    if (reserved.length === 2) {
      return <div className="full">Reserved</div>;
    } else {
      return (
        <div className={"container"}>
          <div className={reserved[0] === "TWO" ? "segment" : "half"}>
            {reserved[0] === "TWO" ? (
              <div>
                <IconButton onClick={() => setOpen(true)}>
                  <AddIcon />
                </IconButton>
                <ReserveModal
                  reserved={reserved}
                  open={open}
                  onClose={() => setOpen(false)}
                  date={reserveDate}
                />
              </div>
            ) : (
              <p>Reserved</p>
            )}
          </div>
          <div className={"verticalLine"} />
          <div className={reserved[0] === "ONE" ? "segment" : "half"}>
            {reserved[0] === "ONE" ? (
              <div>
                <IconButton onClick={() => setOpen(true)}>
                  <AddIcon />
                </IconButton>
                <ReserveModal
                  reserved={reserved}
                  open={open}
                  onClose={() => setOpen(false)}
                  date={reserveDate}
                />
              </div>
            ) : (
              <p>Reserved</p>
            )}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={"container"}>
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
        <ReserveModal
          reserved={reserved}
          open={open}
          onClose={() => setOpen(false)}
          date={reserveDate}
        />
      </div>
    );
  }
};

export default Card;
