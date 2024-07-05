---
date: 2024-07-05
updated: 2024-07-05
order: 130
---
Prior to the Java SE 8 release, the Java date and time mechanism was provided by the [`java.util.Date`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html), [`java.util.Calendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Calendar.html), and [`java.util.TimeZone`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TimeZone.html) classes, as well as their subclasses, such as [`java.util.GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html). These classes had several drawbacks, including:

- The [`Calendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Calendar.html) class was not type safe.
- Because the classes were mutable, they could not be used in multithreaded applications.
- Bugs in application code were common due to the unusual numbering of months and the lack of type safety.

 

## Interoperability with Legacy Code

Perhaps you have legacy code that uses the [`java.util`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/package-summary.html) date and time classes and you would like to take advantage of the [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) functionality with minimal changes to your code.

Added to the JDK 8 release are several methods that allow conversion between [`java.util`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/package-summary.html) and [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) objects:

- [`Calendar.toInstant()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Calendar.html#toInstant()) converts the [`Calendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Calendar.html) object to an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html).
- [`GregorianCalendar.toZonedDateTime()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html#toZonedDateTime()) converts a [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html) instance to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html).
- [`GregorianCalendar.from(ZonedDateTime)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html#from(java.time.ZonedDateTime)) creates a [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html) object using the default locale from a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) instance.
- [`Date.from(Instant)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html#from(java.time.Instant)) creates a [`Date`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html) object from an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html).
- [`Date.toInstant()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html#toInstant()) converts a [`Date`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html) object to an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html).
- [`TimeZone.toZoneId()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TimeZone.html#toZoneId()) converts a [`TimeZone`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TimeZone.html) object to a [`ZoneId`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZoneId.html).

The following example converts a [`Calendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Calendar.html) instance to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) instance. Note that a time zone must be supplied to convert from an [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) to a [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html):

```java
Calendar now = Calendar.getInstance();
ZonedDateTime zdt = ZonedDateTime.ofInstant(now.toInstant(), ZoneId.systemDefault()));
```

The following example shows conversion between a Date and an Instant:

```java
Instant inst = date.toInstant();

Date newDate = Date.from(inst);
```

The following example converts from a GregorianCalendar to a ZonedDateTime, and then from a ZonedDateTime to a GregorianCalendar. Other temporal-based classes are created using the ZonedDateTime instance:

```java
GregorianCalendar cal = ...;

TimeZone tz = cal.getTimeZone();
int tzoffset = cal.get(Calendar.ZONE_OFFSET);

ZonedDateTime zdt = cal.toZonedDateTime();

GregorianCalendar newCal = GregorianCalendar.from(zdt);

LocalDateTime ldt = zdt.toLocalDateTime();
LocalDate date = zdt.toLocalDate();
LocalTime time = zdt.toLocalTime();
```

 

## Mapping Legacy Date and Time Functionality to the Date Time API

Because the Java implementation of date and time has been completely redesigned in the Java SE 8 release, you cannot swap one method for another method. If you want to use the rich functionality offered by the [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) package, your easiest solution is to use the `toInstant()` or `toZonedDateTime()` methods listed in the previous section. However, if you do not want to use that approach or it is not sufficient for your needs, then you must rewrite your date-time code.

The [table](https://dev.java/learn/date-time/intro/#methods) introduced on the [Overview](https://dev.java/learn/date-time/intro/) page is a good place to begin evaluating which [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) classes meet your needs.

There is no one-to-one mapping correspondence between the two APIs, but the following table gives you a general idea of which functionality in the [`java.util`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/package-summary.html) date and time classes maps to the [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) APIs.

### Correspondence between legacy Date and Instant

The [`Instant`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Instant.html) and [`Date`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html) classes are similar. Each class:

- Represents an instantaneous point of time on the timeline (UTC)
- Holds a time independent of a time zone
- Is represented as epoch-seconds (since 1970-01-01T00:00:00Z) plus nanoseconds

The [`Date.from(Instant)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html#from(java.time.Instant)) and [`Date.toInstant()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Date.html#toInstant()) methods allow conversion between these classes.

### Correspondence between GregorianCalendar and ZonedDateTime

The [`ZonedDateTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZonedDateTime.html) class is the replacement for [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html). It provides the following similar functionality. Human time representation is as follows:

- [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html): year, month, day
- [`LocalTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalTime.html): hours, minutes, seconds, nanoseconds
- [`ZoneId`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZoneId.html): time zone
- [`ZoneOffset`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZoneOffset.html): current offset from GMT

The [`GregorianCalendar.from(ZonedDateTime)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html#from(java.time.ZonedDateTime)) and [`GregorianCalendar.toZonedDateTime()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html#toZonedDateTime()) methods facilitate conversions between these classes.

### Correspondence between legacy TimeZone and ZoneId or ZoneOffset

The [`ZoneId`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZoneId.html) class specifies a time zone identifier and has access to the rules used each time zone. The [`ZoneOffset`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/ZoneOffset.html) class specifies only an offset from Greenwich/UTC. For more information, see [Time Zone and Offset Classes](https://dev.java/learn/date-time/zoneid-zone-offset/).

### Correspondence between GregorianCalendar with the date set to 1970-01-01 and LocalTime

Code that sets the date to 1970-01-01 in a [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html) instance in order to use the time components can be replaced with an instance of [`LocalTime`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalTime.html).

### Correspondence between GregorianCalendar with time set to 00:00 and LocalDate

Code that sets the time to 00:00 in a [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html) instance in order to use the date components can be replaced with an instance of [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html). (This [`GregorianCalendar`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/GregorianCalendar.html) approach was flawed, as midnight does not occur in some countries once a year due to the transition to daylight saving time.)

 

## Date and Time Formatting

Although the [`java.time.format.DateTimeFormatter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/DateTimeFormatter.html) provides a powerful mechanism for formatting date and time values, you can also use the [`java.time`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/package-summary.html) temporal-based classes directly with [`java.util.Formatter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Formatter.html) and [`String.format()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html#format(java.lang.String,java.lang.Object...)), using the same pattern-based formatting that you use with the [`java.util`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/package-summary.html) date and time classes.

---
Last update: January 27, 2022