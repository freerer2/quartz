---
date: 2022-1-27
updated: 2022-1-27
order: 110
---
Most temporal-based objects provide a no-argument `now()` method that provides the current date and time using the system clock and the default time zone. These temporal-based objects also provide a one-argument `now(Clock)` method that allows you to pass in an alternative [`Clock`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html).

The current date and time depends on the time-zone and, for globalized applications, a [`Clock`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html) is necessary to ensure that the date/time is created with the correct time-zone. So, although the use of the [`Clock`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html) class is optional, this feature allows you to test your code for other time zones, or by using a fixed clock, where time does not change.

The [`Clock`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html) class is abstract, so you cannot create an instance of it. The following factory methods can be useful for testing.

- [`Clock.offset(Clock, Duration)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html#offset(java.time.Clock,java.time.Duration)) returns a clock that is offset by the specified [`Duration`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Duration.html).
- [`Clock.systemUTC()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html#systemUTC()) returns a clock representing the Greenwich/UTC time zone.
- [`Clock.fixed(Instant, ZoneId)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Clock.html#fixed(java.time.Instant,java.time.ZoneId)) always returns the same Instant. For this clock, time stands still.
