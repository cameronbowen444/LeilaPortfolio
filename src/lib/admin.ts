import { currentUser } from "@clerk/nextjs/server";

const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL_1,
  process.env.ADMIN_EMAIL_2,
]
  .filter((email): email is string => Boolean(email))
  .map((email) => email.toLowerCase());

export async function getAdminUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const primaryEmail =
    user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;

  if (!primaryEmail) {
    return null;
  }

  if (!ADMIN_EMAILS.includes(primaryEmail.toLowerCase())) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName:
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      "Admin",
    email: primaryEmail,
    imageUrl: user.imageUrl,
  };
}