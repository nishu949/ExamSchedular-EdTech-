from datetime import datetime, timedelta

START_DATE = datetime(2026, 11, 1)

TIME_SLOTS = [
    "09:00 AM",
    "02:00 PM"
]


def generate_exam_dates(days=30):
    """
    Generate exam dates for scheduling.
    """

    dates = []

    current = START_DATE

    for _ in range(days):

        dates.append(current.strftime("%Y-%m-%d"))

        current += timedelta(days=1)

    return dates