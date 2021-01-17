const { check } = require("express-validator");

const botMessageValidator = [
  check("title")
    .not().isEmpty().withMessage("Title is Required"),
  check("buttonTitle").not().isEmpty().withMessage("Button Title is Required"),
  check("messageTime")
    .not()
    .isEmpty()
    .withMessage("Message Time is Required."),
  check("data")
    .not()
    .isEmpty()
    .withMessage("Data is Required."),
  check("imageUrl").not().isEmpty().withMessage("Image URL is Required.")
];
module.exports = botMessageValidator;
