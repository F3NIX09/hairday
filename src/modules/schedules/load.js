import { scheduleFetchByDay } from "../../service/schedule-fetch-by-day";
import { hoursLoad } from "../form/hours-load";
import { scheduleShow } from "./show";


// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  //Obtém a data do input
  const date = selectedDate.value
  
  // Buscar na API os agendamentos para carrregar do lado direito da tela
  const dailySchedules = await scheduleFetchByDay({date})

  // Renderiza os agendamentos da data selecionada
  scheduleShow({ dailySchedules })
  
  
  // Renderiza as horas disponiveis 
  hoursLoad({ date, dailySchedules })
}