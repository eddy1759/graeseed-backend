const options = {
    definition: {
        openapi: "3.0.3",
        info: {
          title: "List and Order Delivery System",
          version: "1.0.0",
          description:
            "A list and order delivery system made with Express and documented with Swagger",
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Local development server"
          },
        ],
      },
      apis: ["./routes/*.js"],
}

module.exports = options