class SuccessResponse {
  constructor({ message = "ok", status = 200, metadata = {} }) {
    this.status = status;
    this.message = message;
    this.metadata = metadata;
  }
  send(res) {
    return res.status(this.status).json(this);
  }
}
module.exports = SuccessResponse;
