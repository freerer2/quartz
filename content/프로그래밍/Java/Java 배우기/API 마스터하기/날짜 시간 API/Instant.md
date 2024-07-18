---
date: 2022-1-27
updated: 2022-1-27
order: 70
---
## The Instant Class

One of the core classes of the Date-Time API is the [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) class, which represents the start of a nanosecond on the timeline. This class is useful for generating a time stamp to represent machine time.

```java
Instant timestamp = Instant.now();
```

A value returned from the [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) class counts time beginning from the first second of January 1, 1970 (1970-01-01T00:00:00Z) also called the [`EPOCH`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#EPOCH). An instant that occurs before the epoch has a negative value, and an instant that occurs after the epoch has a positive value.

The other constants provided by the Instant class are [`MIN`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#MIN), representing the smallest possible (far past) instant, and [`MAX`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#MAX), representing the largest (far future) instant.

Invoking `toString()` on an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) produces output like the following:

```shell
2013-05-30T23:38:23.085Z
```

This format follows the ISO-8601 standard for representing date and time.

The [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) class provides a variety of methods for manipulating an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html). There are [`plus()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#plus(java.time.temporal.TemporalAmount)) and [`minus()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#minus(java.time.temporal.TemporalAmount)) methods for adding or subtracting time. The following code adds 1 hour to the current time:

```java
Instant oneHourLater = Instant.now().plus(1, ChronoUnit.HOURS);
```

There are methods for comparing instants, such as [`isAfter()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#isAfter(java.time.Instant)) and [`isBefore()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#isBefore(java.time.Instant)). The [`until()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html#until(java.time.temporal.Temporal,java.time.temporal.TemporalUnit)) method returns how much time exists between two [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) objects. The following line of code reports how many seconds have occurred since the beginning of the Java epoch.

```java
long secondsFromEpoch = Instant.ofEpochSecond(0L).until(Instant.now(),
                        ChronoUnit.SECONDS);
```

The [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) class does not work with human units of time, such as years, months, or days. If you want to perform calculations in those units, you can convert an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) to another class, such as [`LocalDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDateTime.html) or [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html), by binding the [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) with a time zone. You can then access the value in the desired units. The following code converts an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) to a [`LocalDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDateTime.html) object using the [`ofInstant()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDateTime.html#ofInstant(java.time.Instant,java.time.ZoneId)) method and the default time zone, and then prints out the date and time in a more readable form:

```java
Instant timestamp;

LocalDateTime ldt = LocalDateTime.ofInstant(timestamp, ZoneId.systemDefault());
System.out.printf("%s %d %d at %d:%d%n", ldt.getMonth(), ldt.getDayOfMonth(),
                  ldt.getYear(), ldt.getHour(), ldt.getMinute());
```

The output will be similar to the following:

```shell
MAY 30 2021 at 18:21
```

Either a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) or an [`OffsetDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/OffsetDateTime.html) object can be converted to an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) object, as each maps to an exact moment on the timeline. However, the reverse is not true. To convert an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) object to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) or an [`OffsetDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/OffsetDateTime.html) object requires supplying time zone, or time zone offset, information.
