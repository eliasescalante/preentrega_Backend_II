import TicketModel from './models/ticket.model.js';

class TicketDAO {
    async createTicket(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }
}

export default new TicketDAO();


