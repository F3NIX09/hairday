import dayjs from "dayjs";

import { openingHours } from "../../utils/opening-hours"

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
  // Limpa a lista
  hours.innerHTML = ""

  const opening = openingHours.map((hour) => {
    // 10:00 split(":") = [10, 00]
    // Recupera somente a hora
    const [schedulesHour] = hour.split(":")

    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs())

    return {
      hour,
      available: !isHourPast
    }
  })
  
  // [{ hour: "10:00", available: true }]
  // Renderiza os horarios
  opening.forEach(({ hour, available}) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if (hour === "9:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")

  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}