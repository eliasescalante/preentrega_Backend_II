import ticketDAO from '../dao/ticket.dao.js';

class TicketRepository {
    async createTicket(ticketData) {
        return await ticketDAO.createTicket(ticketData);
    }
}

export default new TicketRepository();
