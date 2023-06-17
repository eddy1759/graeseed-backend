const options = {
    definition: {
        openapi: "3.0.3",
        info: {
          title: "GraeMart",
          version: "1.0.0",
          description:
            "This is a self service that helps busy professionals automate their grocery shopping",
        }
      },
      apis: ["./routes/*.js"],
}

module.exports = options