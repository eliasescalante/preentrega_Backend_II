import TicketRepository from '../repositories/ticket.repository.js';
import TicketModel from '../dao/models/ticket.model.js';

class TicketService {
    
    async generateTicket(usuarioDelCarrito, amount) {
        // Método para generar un ticket
        console.log("Usuario del carrito en TicketService:", usuarioDelCarrito);

        // Genera el código único para el ticket
        const code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const purchaser = usuarioDelCarrito.email;

        // Asegúrate de que `amount` no sea undefined
        if (!amount) {
            console.error("El amount no puede ser undefined.");
            return null;
        }

        console.log("Generando ticket con los siguientes datos:", {
            code,
            amount,
            purchaser
        });

        try {
            // Envía un objeto con las propiedades necesarias al método de creación
            const ticket = await TicketRepository.createTicket({ code, amount, purchaser });
            
            // Verifica que el ticket tenga un ID
            if (!ticket || !ticket._id) {
                console.error("No se pudo crear el ticket correctamente:", ticket);
                return null;
            }

            return ticket;
        } catch (error) {
            console.error("Error al crear el ticket en TicketService:", error);
            throw error;
        }
    }
}

export default new TicketService();
