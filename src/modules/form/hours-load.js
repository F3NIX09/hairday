import dayjs from "dayjs";

import { openingHours } from "../../utils/opening-hours"
import { hoursClick } from "./hours-click";
import { scheduleShow } from "../schedules/show";

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista
  hours.innerHTML = ""

  // Obtem a lista de horarios ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  const opening = openingHours.map((hour) => {
    // 10:00 split(":") = [10, 00]
    // Recupera somente a hora
    const [schedulesHour] = hour.split(":")

    // Adiciona a hora na data e verefica se esta no passado
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs())

    // Verefica se o horario ja passou
    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
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

    // Adiciona o evento de click nos horarios disponiveis
    hoursClick()
  })
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")

  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}