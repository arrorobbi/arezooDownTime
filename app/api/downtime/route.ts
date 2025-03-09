// Define the maintenance start time in UTC+7 (Bangkok, Jakarta, Hanoi)
const MAINTENANCE_START = new Date("2025-03-09T10:57:00+07:00"); // set time yyyy-mm-ddThh:mm:ss:UTC
const DURATION_MINUTES = 10; //set duration

export function GET() {
  const now = new Date();

  // Calculate maintenance end time directly
  const maintenanceEndTime = new Date(
    MAINTENANCE_START.getTime() + DURATION_MINUTES * 60 * 1000
  );

  // Calculate time left
  const timeLeft = Math.max(
    0,
    Math.floor((maintenanceEndTime.getTime() - now.getTime()) / 1000)
  );

  return Response.json({ timeLeft });
}
