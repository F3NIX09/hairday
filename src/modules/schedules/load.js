import { hoursLoad } from "../form/hours-load";

// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  // Buscar na API os agendamentos para carrregar do lado direito da tela

  //Obtém a data do input
  const date = selectedDate.value
  
  // Renderiza as horas disponiveis 
  hoursLoad({ date })
}