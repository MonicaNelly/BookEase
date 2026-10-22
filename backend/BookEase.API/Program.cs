
var builder = WebApplication.CreateBuilder(args);

// Register OpenAPI services
builder.Services.AddOpenApi();

var app = builder.Build();

// Enable OpenAPI documentation in Development mode
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Sample services available for booking
var services = new[]
{
    new Service(1, "Haircut", "Haircut service", 150.00m),
    new Service(2, "Manicure", "Nail care service", 200.00m),
    new Service(3, "Consultation", "Professional consultation", 300.00m)
};

// Temporary storage for bookings while the API is running
var bookings = new List<Booking>();
var nextBookingId = 1;

// Home endpoint
app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        Message = "Welcome to BookEase API!",
        Status = "Running"
    });
});

// Get all available services
app.MapGet("/api/services", () =>
{
    return Results.Ok(services);
});

// Create a booking
app.MapPost("/api/bookings", (BookingRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.CustomerName))
    {
        return Results.BadRequest(new
        {
            Message = "Customer name is required."
        });
    }

    var selectedService = services.FirstOrDefault(
        service => service.Id == request.ServiceId);

    if (selectedService is null)
    {
        return Results.BadRequest(new
        {
            Message = "The selected service does not exist."
        });
    }

    if (request.AppointmentDate <= DateOnly.FromDateTime(DateTime.Today))
    {
        return Results.BadRequest(new
        {
            Message = "The appointment date must be in the future."
        });
    }

    var booking = new Booking(
        nextBookingId++,
        request.CustomerName.Trim(),
        selectedService.Id,
        selectedService.Name,
        selectedService.Price,
        request.AppointmentDate,
        request.AppointmentTime
    );

    bookings.Add(booking);

    return Results.Created(
        $"/api/bookings/{booking.Id}",
        booking
    );
});

// Get all bookings
app.MapGet("/api/bookings", () =>
{
    return Results.Ok(bookings);
});

// Get one booking by ID
app.MapGet("/api/bookings/{id:int}", (int id) =>
{
    var booking = bookings.FirstOrDefault(item => item.Id == id);

    if (booking is null)
    {
        return Results.NotFound(new
        {
            Message = "Booking not found."
        });
    }

    return Results.Ok(booking);
});

// Start the application
app.Run();

// Service model
record Service(
    int Id,
    string Name,
    string Description,
    decimal Price
);

// Data received when a customer creates a booking
record BookingRequest(
    string CustomerName,
    int ServiceId,
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime
);

// Booking information stored by the API
record Booking(
    int Id,
    string CustomerName,
    int ServiceId,
    string ServiceName,
    decimal Price,
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime
);
