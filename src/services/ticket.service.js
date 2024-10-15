import TicketRepository from '../repositories/ticket.repository.js';

class TicketService {
    
    async generateTicket(usuarioDelCarrito, amount) {
        // Método para generar un ticket
        const code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const purchaser = usuarioDelCarrito.email;

        if (!amount) {
            console.error("El amount no puede ser undefined.");
            return null;
        }
        try {
            const ticket = await TicketRepository.createTicket({ code, amount, purchaser });
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
