# todo

POST /api/register/patient: Register a new patient account. [x]
POST /api/register/hospital: Register a new hospital. [x]

GET /api/providers: Retrieve a list of all healthcare providers associated with a specific hospital. [x]
GET /api/providers/{id}: Retrieve details of a specific healthcare provider. [x]
POST /api/providers: Add a new healthcare provider to a specific hospital. [x]
PUT /api/providers/{id}: Update details of a specific healthcare provider. [x]
DELETE /api/providers/{id}: Delete a specific healthcare provider. [x]

GET /api/patients: Retrieve a list of all patients for a specific hospital. [ ]?
GET /api/patients/{id}: Retrieve details of a specific patient. [x]
POST /api/patients: Add a new patient to a specific hospital. [x]
PUT /api/patients/{id}: Update details of a specific patient. [x]

GET /api/appointments: Retrieve a list of all appointments scheduled by a specific hospital. [ ]
GET /api/appointments/{id}: Retrieve details of a specific appointment. [x]
POST /api/appointments: Schedule a new appointment for a specific hospital. [x]
PUT /api/appointments/{id}: Update details of a specific appointment. [x]
DELETE /api/appointments/{id}: Cancel a specific appointment. [x]

GET /api/procedures: Retrieve a list of all services or procedures offered by a specific hospital. [ ]
GET /api/procedures/{id}: Retrieve details of a specific service or procedure. [x]
POST /api/procedures: Add a new service or procedure to a specific hospital. [x]
PUT /api/procedures/{id}: Update details of a specific service or procedure. [x]
DELETE /api/procedures/{id}: Delete a specific service or procedure. [x]

GET /api/hospitals/{id}: Retrieve details of a specific hospital. [x]
PUT /api/hospitals/: Update details of a hospital. [x]
DELETE /api/hospitals/{id}: Delete a specific hospital. [ ]?

tambah upload gambar[x]
tambah url shortner[x]
tambah bcrypt[ ]
tambah event ke gcal account[x]
delete event ke gcal account[x]
update event ke gcal account[x]
ide:
convert currency[ ]

# lama

Entity Registration:
POST /api/register/entity: Register a new entity (business, service provider, staff).

Customer Registration:
POST /api/register/customer: Register a new customer account.

Appointments:
GET /api/appointments: Retrieve all appointments.
GET /api/appointments/{id}: Retrieve details of a specific appointment.
POST /api/appointments/book: Book a new appointment.abc
GET /api/appointments/available-slots: Retrieve available time slots for booking appointments.
GET /api/appointments/{date}/available-slots: Retrieve available time slots for a specific date.
GET /api/appointments/{date}/statistics: Retrieve statistics for appointments on a specific date.
GET /api/appointments/{date}/summary: Retrieve a summary of appointments for a specific date.
PUT /api/appointments/{id}: Update details of a specific appointment.
POST /api/appointments/{id}/feedback: Allow customers to provide feedback on their appointments.

Staff & Services:
GET /api/staff: Retrieve a list of all staff members.
GET /api/staff/{staff_id}/availability/calendar: Retrieve the availability calendar for a specific staff member.
GET /api/staff/{staff_id}/appointments: Retrieve all appointments for a specific staff member.
GET /api/staff/{staff_id}/availability: Retrieve availability of a specific staff member.
PUT /api/staff/{staff_id}
POST /api/businesses/{business_id}/staff: Add a new staff member to a business.

Customers & Entities:
GET /api/customers: Retrieve a list of all customers.
GET /api/customers/{customer_id}/appointments: Retrieve all appointments for a specific customer.
General:
GET /api/availability: Retrieve general availability information (e.g., business hours, holidays).

POST /api/subscription/subscribe: Subscribe to a specific subscription plan.
