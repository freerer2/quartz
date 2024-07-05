---
date: 2024-07-05
updated: 2024-07-05
order: 100
---
When you write code to specify an amount of time, use the class or method that best meets your needs: the [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) class, [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) class, or the [`ChronoUnit.between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method. A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) measures an amount of time using time-based values (seconds, nanoseconds). A [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) uses date-based values (years, months, days).

> Note: A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) of one day is exactly 24 hours long. A [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) of one day, when added to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html), may vary according to the time zone. For example, if it occurs on the first or last day of daylight saving time.

 

## Duration

A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) is most suitable in situations that measure machine-based time, such as code that uses an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) object. A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) object is measured in seconds or nanoseconds and does not use date-based constructs such as years, months, and days, though the class provides methods that convert to days, hours, and minutes. A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) can have a negative value, if it is created with an end point that occurs before the start point.

The following code calculates, in nanoseconds, the duration between two instants:

```java
Instant t1 = ...;
Instant t2 = ...;

long ns = Duration.between(t1, t2).toNanos();
```

The following code adds 10 seconds to an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html):

```java
Instant start= ...;

Duration gap = Duration.ofSeconds(10);
Instant later = start.plus(gap);
```

A [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) is not connected to the timeline, in that it does not track time zones or daylight saving time. Adding a [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html) equivalent to 1 day to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) results in exactly 24 hours being added, regardless of daylight saving time or other time differences that might result.

 

## ChronoUnit

The [`ChronoUnit`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html) enum, discussed in the The [`Temporal`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/Temporal.html) Package, defines the units used to measure time. The [`ChronoUnit.between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method is useful when you want to measure an amount of time in a single unit of time only, such as days or seconds. The [`between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method works with all temporal-based objects, but it returns the amount in a single unit only. The following code calculates the gap, in milliseconds, between two time-stamps:

```java
Instant previous = ...;
Instant current = ...;

long gap = 0L;

current = Instant.now();
if (previous != null) {
    gap = ChronoUnit.MILLIS.between(previous,current);
}
```

 

## Period

To define an amount of time with date-based values (years, months, days), use the [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) class. The [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) class provides various get methods, such as [`getMonths()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html#getMonths()), [`getDays()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html#getDays()), and [`getYears()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html#getYears()), so that you can extract the amount of time from the period.

The total period of time is represented by all three units together: months, days, and years. To present the amount of time measured in a single unit of time, such as days, you can use the [`ChronoUnit.between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method.

The following code reports how old you are, assuming that you were born on January 1, 1960. The [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) class is used to determine the time in years, months, and days. The same period, in total days, is determined by using the [`ChronoUnit.between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method and is displayed in parentheses:

```java
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

Period p = Period.between(birthday, today);
long p2 = ChronoUnit.DAYS.between(birthday, today);
System.out.println("You are " + p.getYears() + " years, " + p.getMonths() +
                   " months, and " + p.getDays() +
                   " days old. (" + p2 + " days total)");
```

The code produces output similar to the following:

```shell
You are 53 years, 4 months, and 29 days old. (19508 days total)
```

To calculate how long it is until your next birthday, you could use the following code. The [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) class is used to determine the value in months and days. The [`ChronoUnit.between()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/ChronoUnit.html#between(java.time.temporal.Temporal,java.time.temporal.Temporal)) method returns the value in total days and is displayed in parentheses.

```java
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

LocalDate nextBDay = birthday.withYear(today.getYear());

// If your birthday has occurred this year already, add 1 to the year.
if (nextBDay.isBefore(today) || nextBDay.isEqual(today)) {
    nextBDay = nextBDay.plusYears(1);
}

Period p = Period.between(today, nextBDay);
long p2 = ChronoUnit.DAYS.between(today, nextBDay);
System.out.println("There are " + p.getMonths() + " months, and " +
                   p.getDays() + " days until your next birthday. (" +
                   p2 + " total)");
```

The code produces output similar to the following:

```java
There are 7 months, and 2 days until your next birthday. (216 total)
```

These calculations do not account for time zone differences. If you were, for example, born in Australia, but currently live in Bangalore, this slightly affects the calculation of your exact age. In this situation, use a [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) in conjunction with the [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) class. When you add a [`Period`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Period.html) to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html), the time differences are observed.%%  %%

---
Last update: January 27, 2022