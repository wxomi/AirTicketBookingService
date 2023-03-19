const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");

const bookingService = new BookingService();

class BookingController {
  // constructor(channel) {
  // this.channel = channel;
  // }
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a Noti from Queue",
        content: "Some queue will subscribe this",
        recepientEmail: "sainianshul4987@gmail.com",
        notificationTime: "2023-03-19T09:19:00.000",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully Completed Booking",
        success: true,
        error: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explaination,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
