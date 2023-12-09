import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import storeService from "../../services/store.service";

function AddTradingHours(props) {
  const { register, handleSubmit } = useForm();
  const { storeID } = props;

  const [mondayStartValue, mondayStartOnChange] = useState("09:00");
  const [tuesdayStartValue, tuesdayStartOnChange] = useState("09:00");
  const [wednesdayStartValue, wednesdayStartOnChange] = useState("09:00");
  const [thursdayStartValue, thursdayStartOnChange] = useState("09:00");
  const [fridayStartValue, fridayStartOnChange] = useState("09:00");
  const [saturdayStartValue, saturdayStartOnChange] = useState("09:00");
  const [sundayStartValue, sundayStartOnChange] = useState("09:00");
  const [mondayEndValue, mondayEndOnChange] = useState("18:00");
  const [tuesdayEndValue, tuesdayEndOnChange] = useState("18:00");
  const [wednesdayEndValue, wednesdayEndOnChange] = useState("18:00");
  const [thursdayEndValue, thursdayEndOnChange] = useState("18:00");
  const [fridayEndValue, fridayEndOnChange] = useState("18:00");
  const [saturdayEndValue, saturdayEndOnChange] = useState("18:00");
  const [sundayEndValue, sundayEndOnChange] = useState("18:00");

  const onSubmit = (data) => {
    const newTradingHours = {
      tradingHours: [
        {
          storeID: storeID,
          weekday: 0,
          startHour: mondayStartValue,
          endHour: mondayEndValue,
        },
        {
          storeID: storeID,
          weekday: 1,
          startHour: tuesdayStartValue,
          endHour: tuesdayEndValue,
        },
        {
          storeID: storeID,
          weekday: 2,
          startHour: wednesdayStartValue,
          endHour: wednesdayEndValue,
        },
        {
          storeID: storeID,
          weekday: 3,
          startHour: thursdayStartValue,
          endHour: thursdayEndValue,
        },
        {
          storeID: storeID,
          weekday: 4,
          startHour: fridayStartValue,
          endHour: fridayEndValue,
        },
        {
          storeID: storeID,
          weekday: 5,
          startHour: saturdayStartValue,
          endHour: saturdayEndValue,
        },
        {
          storeID: storeID,
          weekday: 6,
          startHour: sundayStartValue,
          endHour: sundayEndValue,
        },
      ],
    };
    storeService
      .addStoreTradingHours(storeID, newTradingHours)
      .then(() => {
        alert(JSON.stringify("New trading hours added."));
        // window.location.reload();
      })
      .catch((e) => {
        // console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Open </th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>
              <TimePicker
                onChange={mondayStartOnChange}
                value={mondayStartValue}
              />
            </td>
            <td>
              <TimePicker onChange={mondayEndOnChange} value={mondayEndValue} />
            </td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>
              <TimePicker
                onChange={tuesdayStartOnChange}
                value={tuesdayStartValue}
              />
            </td>
            <td>
              <TimePicker
                onChange={tuesdayEndOnChange}
                value={tuesdayEndValue}
              />
            </td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>
              <TimePicker
                onChange={wednesdayStartOnChange}
                value={wednesdayStartValue}
              />
            </td>
            <td>
              <TimePicker
                onChange={wednesdayEndOnChange}
                value={wednesdayEndValue}
              />
            </td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>
              <TimePicker
                onChange={thursdayStartOnChange}
                value={thursdayStartValue}
              />
            </td>
            <td>
              <TimePicker
                onChange={thursdayEndOnChange}
                value={thursdayEndValue}
              />
            </td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>
              <TimePicker
                onChange={fridayStartOnChange}
                value={fridayStartValue}
              />
            </td>
            <td>
              <TimePicker onChange={fridayEndOnChange} value={fridayEndValue} />
            </td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>
              <TimePicker
                onChange={saturdayStartOnChange}
                value={saturdayStartValue}
              />
            </td>
            <td>
              <TimePicker
                onChange={saturdayEndOnChange}
                value={saturdayEndValue}
              />
            </td>
          </tr>
          <tr>
            <td>Sunday</td>
            <td>
              <TimePicker
                onChange={sundayStartOnChange}
                value={sundayStartValue}
              />
            </td>
            <td>
              <TimePicker onChange={sundayEndOnChange} value={sundayEndValue} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default AddTradingHours;
