import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { Image } from "react-bootstrap";
import { myContext } from "../../App";
import axios from "axios";

const BookTable = () => {
  // States
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");
  const [chosenDay_hrs, setChosenDay_hrs] = useState([]);

  // ContextData
  const { schedules } = useContext(myContext);

  // Set the hours in the chosenDay_hrs state
  useEffect(() => {
    if (schedules["schedules"]) {
      schedules["schedules"].map((d) => {
        if (d.day === date.split(" ")[0]) {
          setChosenDay_hrs(d.hours);
        }
      });
    }
  }, [schedules, date, chosenDay_hrs]);

  // Get current date
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const currentDateString = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }`;

  useEffect(() => {
    //1
    setDate(currentDay);

    //2 Check if one week pass, if yes reset the obj
    if (schedules["schedules"]) {
      schedules["schedules"].map((d) => {
        d.hours.map((obj) => {
          const objDate = new Date(obj.date);
          const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
          const difference = currentDate - objDate;

          if (difference >= oneWeek) {
            obj.fullName = "";
            obj.phoneNumber = "";
            obj.email = "";
            obj.guests = "";
            obj.location = "";
            obj.comments = "";
          }
        });
      });
    }
  }, []);

  // Handle Order
  const handleOrder = () => {
    if (
      !comments ||
      !phoneNumber ||
      !email ||
      !location ||
      !guests ||
      !time ||
      !date
    ) {
      alert("Please fill in all fields");
      return;
    }

    let chosen_day =
      date === "" ? currentDateString.split(" ")[0] : date.split(" ")[0];

    // With the help of this index, we can get the correct order in the schedules hours array
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);
    const index = (hour - 12) * 2 + (minutes === 30 ? 1 : 0);

    let updated_schedules = schedules["schedules"].map((day_of_the_week) => {
      if (day_of_the_week.day === chosen_day) {
        day_of_the_week.hours[index].comments = comments;
        day_of_the_week.hours[index].email = email;
        day_of_the_week.hours[index].fullName = fullName;
        day_of_the_week.hours[index].guests = guests;
        day_of_the_week.hours[index].location = location;
        day_of_the_week.hours[index].phoneNumber = phoneNumber;
        day_of_the_week.hours[index].date = currentDate;
      }
      return day_of_the_week;
    });

    const schedules_id = schedules["_id"];
    const data = {
      schedules_id,
      newSchedules: updated_schedules,
    };

    // axios update request
    axios
      .put("https://restaurant-server-nqis.onrender.com/schedule/update_schedules", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success == true) {
          alert("Thank you for your reservation :)");
          //refresh the page
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get future dates
  const getFutureDates = () => {
    const futureDates = [];
    const currentDate = new Date();
    for (let i = 1; i <= 6; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const day = daysOfWeek[date.getDay()];
      const dateString = `${day} ${date.getDate()}/${date.getMonth() + 1}`;
      futureDates.push(dateString);
    }
    return futureDates;
  };

  return (
    <div className={styles.order_table_container}>
      {/* Top Image */}
      <div className={styles.background_image_container}>
        <Image
          src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Example Image"
        />
      </div>

      <div className={styles.container}>
        {/* Top headers */}
        <div className={styles.header}>
          <p className={styles.header_span}>Book Table</p>
        </div>

        <div className={styles.book_table_container}>
          {/* Selects section */}
          <div className={styles.section1}>
            {/* Guests */}
            <div className={styles.guests}>
              <select
                onChange={(e) => setGuests(e.target.value)}
                className={styles.select}
                name="guests"
                id="guests"
              >
                <option value="">Select Guests</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* Days */}
            <div className={styles.day}>
              <select
                onChange={(e) => setDate(e.target.value)}
                className={styles.select}
                name="day"
                id="day"
              >
                <option
                  value={`${currentDay} ${currentDateString}`}
                >{`${currentDay} ${currentDateString}`}</option>
                {getFutureDates().map((dateString, index) => (
                  <option
                    key={index}
                    style={{ color: "black" }}
                    value={dateString}
                  >
                    {dateString}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className={styles.time}>
              <select
                onChange={(e) => setTime(e.target.value)}
                className={styles.select}
                name="time"
                id="time"
              >
                <option value="">Select Time</option>

                {chosenDay_hrs &&
                  chosenDay_hrs.map((hour, index) => {
                    return (
                      <option
                        style={{
                          color: `${hour.fullName !== "" ? "grey" : "black"}`,
                        }}
                        disabled={hour.fullName !== ""}
                        key={index}
                        value={hour.time}
                      >
                        {hour.time}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className={styles.location}>
              <select
                onChange={(e) => setLocation(e.target.value)}
                className={styles.select}
                name="location"
                id="location"
              >
                <option value="">Select Location</option>
                <option value="indore">indore</option>
                <option value="bar">bar</option>
                <option value="garden">garden</option>
              </select>
            </div>
          </div>

          <div className={styles.full_name}>
            <input
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Full Name"
            />
          </div>

          <div className={styles.phone_number}>
            <input
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className={styles.input}
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Phone Number"
            />
          </div>

          <div className={styles.email}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.special_commands}>
            <textarea
              onChange={(e) => setComments(e.target.value)}
              className={styles.textarea}
              name="special_commands"
              id="special_commands"
              placeholder="Special Commands"
            ></textarea>
          </div>

          <button onClick={handleOrder} className={styles.button}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
