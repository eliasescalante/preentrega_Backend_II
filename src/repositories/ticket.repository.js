// src/repositories/ticket.repository.js
import TicketDAO from '../dao/ticket.dao.js';

class TicketRepository {
    async createTicket(ticketData) {
        try {
            return await TicketDAO.create(ticketData);
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw error;
        }
    }
}

export default new TicketRepository();

