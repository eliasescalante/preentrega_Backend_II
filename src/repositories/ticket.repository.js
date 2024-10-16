import ticketDAO from '../dao/ticket.dao.js';

class TicketRepository {
// llama al metodo para crear un ticket
    async createTicket(ticketData) {
        return await ticketDAO.createTicket(ticketData);
    }
}

export default new TicketRepository();
