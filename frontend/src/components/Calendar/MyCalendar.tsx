import { Button, Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CurrentSlot,
  Partner,
  Reservation,
  Room,
  TimeSlot,
} from "../../models";
import { fetchData } from "../../utils/intercall";
import {
  COMPANY_CALENDAR,
  COMPANY_TIMESLOT_AVAILABLE_PARTNERS,
  CREATE_RESERVATION,
  DELETE_RESERVATION,
} from "../../utils/queries";
import Modal from "../shared/Modal/Modal";
import RadioGroupList from "../shared/RadioGroup/RadioGroupList";

import classes from "./MyCalendar.module.css";

const MyCalendar: React.FC<{
  companyID: String | null | undefined;
  userID: String | null | undefined;
}> = (props) => {
  const [calendar, setCalendar] = useState<Calendar>();
  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<CurrentSlot>();
  const [availablePartners, setAvailablePartners] = useState<Partner[]>([]);
  const [selectedPartnerID, setSelectedPartnerID] = useState<String>();

  useEffect(() => {
    const loadRoomsTimeSlots = async () => {
      const graphqlQuery = {
        query: COMPANY_CALENDAR,
        variables: {
          id: props.companyID,
        },
      };

      const resData = await fetchData(graphqlQuery);
      if (resData.errors) throw new Error("Fetching my calendar failed!");
      setCalendar({
        rooms: resData.data.companyCalendar.rooms,
        timeSlots: resData.data.companyCalendar.timeSlots,
        companyReservations: resData.data.companyCalendar.companyReservations,
      });
    };

    loadRoomsTimeSlots();
  }, [props.companyID]);

  useEffect(() => {
    const fetchAvailablePartners = () => {
      const graphqlQuery = {
        query: COMPANY_TIMESLOT_AVAILABLE_PARTNERS,
        variables: {
          companyID: props.companyID,
          timeSlotID: currentSlot?.timeSlot._id,
        },
      };

      fetchData(graphqlQuery).then((resData) => {
        if (resData.errors)
          throw new Error("Error fetching available partners failed!");
        setAvailablePartners(resData.data.companytimeSlotPartners);
      });
    };

    if (currentSlot) {
      fetchAvailablePartners();
      setShowModal(true);
    }
  }, [currentSlot, props.companyID]);

  const isReservationMine = (reservation: Reservation): Boolean => {
    return reservation?.user._id === props.userID;
  };

  const getReservation = (
    timeSlotID: String,
    roomID: String
  ): Reservation | undefined => {
    return calendar?.companyReservations.filter(
      (reservation) =>
        reservation.appointment.timeSlot._id === timeSlotID &&
        reservation.appointment.room._id === roomID
    )?.[0];
  };

  const reservationElement = (reservation: Reservation) => {
    const isMine = reservation ? isReservationMine(reservation) : false;

    return (
      reservation?.partner.name && (
        <div>
          <p
            className={`text-center text-black text-uppercase font-weight-bold`}
          >
            {reservation?.partner.name}
            {!isMine && <br />} {!isMine && reservation?.user.name}
          </p>
        </div>
      )
    );
  };

  const onSlotClickHandler = (timeSlot: TimeSlot, room: Room) => {
    const reservation = getReservation(timeSlot._id, room._id);

    if (!reservation || (reservation && isReservationMine(reservation))) {
      setCurrentSlot({
        timeSlot,
        room,
        reservation: reservation ?? reservation,
      });
    }
  };

  const onAddReservationHandler = async () => {
    const graphqlQuery = {
      query: CREATE_RESERVATION,
      variables: {
        userID: props.userID,
        partnerID: selectedPartnerID,
        roomID: currentSlot?.room._id,
        timeSlotID: currentSlot?.timeSlot._id,
      },
    };

    const resData = await fetchData(graphqlQuery);
    if (resData.errors) throw new Error("Error creating reservation!");
    setShowModal(false);
  };

  const onDeleteReservationlHandler = async () => {
    const graphqlQuery = {
      query: DELETE_RESERVATION,
      variables: {
        id: currentSlot?.reservation?._id,
        userID: props.userID,
      },
    };

    setShowModal(false);
    const resData = await fetchData(graphqlQuery);
    if (resData.errors) throw new Error("Error deleting reservation!");
  };

  const onSelectPartnerHandler = (partnerID: String) => {
    setSelectedPartnerID(partnerID);
  };

  const onCloseModalHandler = () => {
    setShowModal(false);
  };

  const modalHeader =
    currentSlot && isReservationMine(currentSlot.reservation!) ? (
      <h2>Your Reservation</h2>
    ) : (
      <h2>Create Reservation</h2>
    );

  const modalBody = currentSlot && (
    <div className="row modalContainer">
      <div className="col">
        <div className="row">
          <div className="col">
            <h2>Hour:</h2>
          </div>
          <div className="col">
            <h3>{currentSlot.timeSlot.startDate}</h3>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>Room:</h2>
          </div>
          <div className="col">
            <h3>{currentSlot.room.name}</h3>
          </div>
        </div>

        {currentSlot.reservation &&
          isReservationMine(currentSlot.reservation!) && (
            <div className="row">
              <div className="col">
                <h2>{currentSlot.reservation?.partner?.name}</h2>
              </div>
            </div>
          )}

        {!isReservationMine(currentSlot.reservation!) && (
          <div className={`row ${classes.usersRadioButtons}`}>
            <div className="col">
              <RadioGroupList
                items={availablePartners}
                title="Select partner"
                onSelectItem={onSelectPartnerHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const modalFooter = currentSlot ? (
    <div>
      <Button onClick={onCloseModalHandler}>CLOSE</Button>
      {!currentSlot.reservation?.partner ? (
        <Button onClick={onAddReservationHandler}>Create</Button>
      ) : (
        <Button onClick={onDeleteReservationlHandler}>DELETE</Button>
      )}
    </div>
  ) : (
    <Button onClick={onCloseModalHandler}>CLOSE</Button>
  );

  return (
    <React.Fragment>
      {showModal && (
        <Modal header={modalHeader} footer={modalFooter}>
          {modalBody}
        </Modal>
      )}

      <div className={`container`}>
        <div className={`row h-100 w-100 text-center`}>
          <Box
            sx={{
              width: [50, 70, 110],
              height: [20, 50, 70],
              backgroundColor: "primary.white",
              p: 1,
              border: 2,
              borderColor: (theme: Theme) => theme.palette.primary.main,
            }}
          >
            TimeSlots
          </Box>

          {calendar?.timeSlots.map((timeSlot) => {
            return (
              <Box
                sx={{
                  width: [50, 70, 110],
                  height: [20, 50, 70],
                  backgroundColor: "primary.white",
                  p: 1,
                  border: 2,
                  borderColor: (theme: Theme) => theme.palette.primary.main,
                }}
              >
                {timeSlot.startDate}
              </Box>
            );
          })}
        </div>

        {calendar?.rooms.map((room) => {
          return (
            <div key={room._id.toString()} className={`row w-100 text-center`}>
              <Box
                sx={{
                  width: [50, 70, 110],
                  height: [20, 50, 70],
                  backgroundColor: "primary.white",
                  p: 1,
                  border: 2,
                  borderColor: (theme: Theme) => theme.palette.primary.main,
                }}
              >
                {room.name}
              </Box>
              {calendar?.timeSlots.map((timeSlot) => {
                const reservation = getReservation(timeSlot._id, room._id);
                const isMine = reservation
                  ? isReservationMine(reservation)
                  : false;
                return isMine ? (
                  <Box
                    onClick={() => onSlotClickHandler(timeSlot, room)}
                    sx={{
                      width: [50, 70, 110],
                      height: [20, 50, 70],
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        opacity: [0.9, 0.9, 0.9],
                        cursor: "pointer",
                      },
                      p: 1,
                      border: "4px dashed grey",
                      borderColor: (theme: Theme) => theme.palette.primary.dark,
                    }}
                  >
                    {reservationElement(reservation!)}
                  </Box>
                ) : reservation?.partner.name ? (
                  <Box
                    onClick={() => onSlotClickHandler(timeSlot, room)}
                    sx={{
                      width: [50, 70, 110],
                      height: [20, 50, 70],
                      backgroundColor: "green",
                      p: 1,
                      border: 1,
                      borderColor: (theme: Theme) =>
                        theme.palette.primary.light,
                    }}
                  >
                    {reservationElement(reservation!)}
                  </Box>
                ) : (
                  <Box
                    onClick={() => onSlotClickHandler(timeSlot, room)}
                    sx={{
                      width: [50, 70, 110],
                      height: [20, 50, 70],
                      backgroundColor: "primary.white",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        opacity: [0.2, 0.2, 0.2],
                        cursor: "pointer",
                      },
                      p: 1,
                      border: 1,
                      borderColor: (theme: Theme) =>
                        theme.palette.primary.light,
                    }}
                  >
                    {reservationElement(reservation!)}
                  </Box>
                );
              })}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default MyCalendar;
