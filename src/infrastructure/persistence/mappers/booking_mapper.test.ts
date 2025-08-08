import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { BookingMapper } from "./booking_mapper";

describe("booking mapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const bookingEntity: BookingEntity = {
      id: "1",
      guest: {
        id: "1",
        name: "Test",
      },
      property: {
        id: "1",
        name: "Test",
        description: "Test Desc",
        maxGuests: 5,
        basePricePerNight: 200,
        bookings: [],
      },
      guestCount: 2,
      startDate: new Date(),
      endDate: new Date(),
      status: "CONFIRMED",
      totalPrice: 500,
    };
    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toHaveProperty("id");
    expect(booking.getId()).toBe(bookingEntity.id);
    expect(booking).toHaveProperty("guest");
    expect(booking.getGuest()).toEqual(bookingEntity.guest);
    expect(booking).toHaveProperty("guest.id");
    expect(booking.getGuest().getId()).toBe(bookingEntity.guest.id);
    expect(booking).toHaveProperty("guest.name");
    expect(booking.getGuest().getName()).toBe(bookingEntity.guest.name);
    expect(booking).toHaveProperty("property");
    expect(booking).toHaveProperty("property.id");
    expect(booking.getProperty().getId()).toBe(bookingEntity.property.id);
    expect(booking).toHaveProperty("property.name");
    expect(booking.getProperty().getName()).toBe(bookingEntity.property.name);
    expect(booking).toHaveProperty("property.description");
    expect(booking.getProperty().getDescription()).toBe(
      bookingEntity.property.description
    );
    expect(booking).toHaveProperty("property.maxGuests");
    expect(booking.getProperty().getMaxGuests()).toBe(
      bookingEntity.property.maxGuests
    );
    expect(booking).toHaveProperty("property.basePricePerNight");
    expect(booking.getProperty().getBasePricePerNight()).toBe(
      bookingEntity.property.basePricePerNight
    );
    expect(booking).toHaveProperty("property.bookings");
    expect(booking).toHaveProperty("guestCount");
    expect(booking.getGuestCount()).toBe(bookingEntity.guestCount);
    expect(booking).toHaveProperty("dateRange.startDate");
    expect(booking.getDateRange().getStartDate()).toBe(bookingEntity.startDate);
    expect(booking).toHaveProperty("dateRange.endDate");
    expect(booking.getDateRange().getEndDate()).toBe(bookingEntity.endDate);
    expect(booking).toHaveProperty("status");
    expect(booking.getStatus()).toBe(bookingEntity.status);
    expect(booking).toHaveProperty("totalPrice");
    expect(booking.getTotalPrice()).toBe(bookingEntity.totalPrice);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const bookingEntity: any = {
      id: "1",
      property: {
        id: "1",
        name: "Test",
        description: "Test Desc",
        maxGuests: 5,
        basePricePerNight: 200,
        bookings: [],
      },
      guestCount: 2,
      startDate: new Date(),
      endDate: new Date(),
      status: "CONFIRMED",
      totalPrice: 500,
    };

    expect(() => BookingMapper.toDomain(bookingEntity)).toThrow(
      "Campos obrigatórios não encontrados em BookingEntity"
    );
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const booking = new Booking(
      "1",
      new Property("1", "Test", "Test Desc", 5, 200),
      new User("1", "Test"),
      new DateRange(new Date("2024-12-20"), new Date("2024-12-25")),
      3
    );

    booking["totalPrice"] = 1000;
    booking["status"] = "CONFIRMED";

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity).toHaveProperty("id");
    expect(bookingEntity.id).toBe(booking.getId());
    expect(bookingEntity).toHaveProperty("guest");
    expect(bookingEntity.guest).toEqual(booking.getGuest());
    expect(bookingEntity).toHaveProperty("guest.id");
    expect(bookingEntity.guest.id).toBe(booking.getGuest().getId());
    expect(bookingEntity).toHaveProperty("guest.name");
    expect(bookingEntity.guest.name).toBe(booking.getGuest().getName());
    expect(bookingEntity).toHaveProperty("property");
    expect(bookingEntity).toHaveProperty("property.id");
    expect(bookingEntity.property.id).toBe(booking.getProperty().getId());
    expect(bookingEntity).toHaveProperty("property.name");
    expect(bookingEntity.property.name).toBe(booking.getProperty().getName());
    expect(bookingEntity).toHaveProperty("property.description");
    expect(bookingEntity.property.description).toBe(
      booking.getProperty().getDescription()
    );
    expect(bookingEntity).toHaveProperty("property.maxGuests");
    expect(bookingEntity.property.maxGuests).toBe(
      booking.getProperty().getMaxGuests()
    );
    expect(bookingEntity).toHaveProperty("property.basePricePerNight");
    expect(bookingEntity.property.basePricePerNight).toBe(
      booking.getProperty().getBasePricePerNight()
    );
    expect(bookingEntity).toHaveProperty("guestCount");
    expect(bookingEntity.guestCount).toBe(booking.getGuestCount());
    expect(bookingEntity).toHaveProperty("startDate");
    expect(bookingEntity.startDate).toBe(booking.getDateRange().getStartDate());
    expect(bookingEntity).toHaveProperty("endDate");
    expect(bookingEntity.endDate).toBe(booking.getDateRange().getEndDate());
    expect(bookingEntity).toHaveProperty("status");
    expect(bookingEntity.status).toBe(booking.getStatus());
    expect(bookingEntity).toHaveProperty("totalPrice");
    expect(bookingEntity.totalPrice).toBe(booking.getTotalPrice());
  });
});
