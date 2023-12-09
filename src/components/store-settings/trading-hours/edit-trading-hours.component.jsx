import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import storeService from "../../../services/store.service";

function EditTradingHours(props) {
  const { register, handleSubmit } = useForm();
  const { storeID, tradingHours } = props;

  const [mondayStartValue, mondayStartOnChange] = useState(
    tradingHours[0].startHour
  );
  const [tuesdayStartValue, tuesdayStartOnChange] = useState(
    tradingHours[1].startHour
  );
  const [wednesdayStartValue, wednesdayStartOnChange] = useState(
    tradingHours[2].startHour
  );
  const [thursdayStartValue, thursdayStartOnChange] = useState(
    tradingHours[3].startHour
  );
  const [fridayStartValue, fridayStartOnChange] = useState(
    tradingHours[4].startHour
  );
  const [saturdayStartValue, saturdayStartOnChange] = useState(
    tradingHours[5].startHour
  );
  const [sundayStartValue, sundayStartOnChange] = useState(
    tradingHours[6].startHour
  );

  const [mondayEndValue, mondayEndOnChange] = useState(tradingHours[0].endHour);
  const [tuesdayEndValue, tuesdayEndOnChange] = useState(
    tradingHours[1].endHour
  );
  const [wednesdayEndValue, wednesdayEndOnChange] = useState(
    tradingHours[2].endHour
  );
  const [thursdayEndValue, thursdayEndOnChange] = useState(
    tradingHours[3].endHour
  );
  const [fridayEndValue, fridayEndOnChange] = useState(tradingHours[4].endHour);
  const [saturdayEndValue, saturdayEndOnChange] = useState(
    tradingHours[5].endHour
  );
  const [sundayEndValue, sundayEndOnChange] = useState(tradingHours[6].endHour);

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
      .editStoreTradingHours(storeID, newTradingHours)
      .then(() => {
        alert(JSON.stringify("New trading hours added."));
        // window.location.reload();
      })
      .catch((e) => {
        // console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  // console.log(value);
  console.log(tradingHours[0].weekday);
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
export default EditTradingHours;
