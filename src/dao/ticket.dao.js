// src/dao/ticket.dao.js
import TicketModel from './models/ticket.model.js';

class TicketDAO {
    async create(ticketData) {
        try {
            const ticket = new TicketModel(ticketData);
            return await ticket.save();
        } catch (error) {
            console.error("Error en TicketDAO al crear el ticket:", error);
            throw error;
        }
    }
}

export default new TicketDAO();


