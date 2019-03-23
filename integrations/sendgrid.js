
const config = require('../config/config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = class Sendgrid {

  static send(params) {
    return new Promise((resolve, reject) => {
      return sgMail.send({
        from: 'EXPRESS API <lema.nahuel+express-api@gmail.com>',
        to: 'lema.nahuel@gmail.com',
        subject: `Notificacion desde NL-EXPRESS-API`,
        html: `Se completo la tarea <strong>${params.task.title}!</strong>`,
      }).then(resolve).catch(reject);
    });
  }

}