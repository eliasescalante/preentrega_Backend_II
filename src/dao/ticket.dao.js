import TicketModel from './models/ticket.model.js';

class TicketDAO {
    // metodo para crear un ticket
    async createTicket(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }
}

export default new TicketDAO();


