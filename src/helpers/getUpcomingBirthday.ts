import { IContacts } from "../interfaces/interfaces";

export const getUpcomingBirthdays = (contacts: IContacts[], daysRange = 7) => {
  if (!contacts) return [];

  const today = new Date();
  const currentYear = today.getFullYear();

  return contacts.filter((contact) => {
    const birthDate = new Date(contact.birthdate);
    const birthdayThisYear = new Date(
      currentYear,
      birthDate.getMonth(),
      birthDate.getDate()
    );

    const diffInDays = Math.ceil(
      (birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffInDays >= 0 && diffInDays <= daysRange;
  });
};
