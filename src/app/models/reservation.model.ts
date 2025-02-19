export interface Reservation {
    id: number;
    guestId: number;
    checkIn: string;
    checkOut: string;
    roomType: string;
    numberOfGuests: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    remarks: string;
  }