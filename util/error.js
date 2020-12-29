module.exports={
    serverError(res,error){
        // console.log(error);
        res.status(500).json({
          message: "Server Error Occurred"
        });
    },
    validationError(res,errors){
      res.status(422).json({ errors: errors.mapped() });
    }
}