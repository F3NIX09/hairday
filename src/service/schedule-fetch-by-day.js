import dayjs, { Dayjs } from "dayjs";
import { apiConfig } from "./api-config.js";

export async function scheduleFetchByDay({date}) {
  try {
    // Fazendo a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    // Converte para JSON!
    const data = await response.json()

    const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))

    const dailySchedulesSorted = dailySchedules.sort((a, b) => {
      const hourA = dayjs(a.when).hour()
      const hourB = dayjs(b.when).hour()

      return hourA - hourB
    })

    return dailySchedulesSorted
  } catch (error) {
    console.log(error);
    alert("Não foi possivel buscar os agendamentos, tente novamente mais tarde")
  }
}