---
date: 2022-1-27
updated: 2022-1-27
order: 30
---
The Date-Time API provides enums for specifying days of the week and months of the year.

 

## DayOfWeek

The [`DayOfWeek`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/DayOfWeek.html) enum consists of seven constants that describe the days of the week: `MONDAY` through `SUNDAY`. The integer values of the [`DayOfWeek`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/DayOfWeek.html) constants range from 1 (Monday) through 7 (Sunday). Using the defined constants (`DayOfWeek.FRIDAY`) makes your code more readable.

This enum also provides a number of methods, similar to the methods provided by the temporal-based classes. For example, the following code adds 3 days to `Monday` and prints the result. The output is `THURSDAY`:

```java
System.out.printf("%s%n", DayOfWeek.MONDAY.plus(3));
```

By using the [`getDisplayName(TextStyle, Locale)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/DayOfWeek.html#getDisplayName(java.time.format.TextStyle,java.util.Locale)) method, you can retrieve a string to identify the day of the week in the user's locale. The [`TextStyle`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/TextStyle.html) enum enables you to specify what sort of string you want to display: `FULL`, `NARROW` (typically a single letter), or `SHORT` (an abbreviation). The `STANDALONE` [`TextStyle`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/TextStyle.html) constants are used in some languages where the output is different when used as part of a date than when it is used by itself. The following example prints the three primary forms of the [`TextStyle`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/TextStyle.html) for `Monday`:

```java
DayOfWeek dow = DayOfWeek.MONDAY;
Locale locale = Locale.getDefault();
System.out.println(dow.getDisplayName(TextStyle.FULL, locale));
System.out.println(dow.getDisplayName(TextStyle.NARROW, locale));
System.out.println(dow.getDisplayName(TextStyle.SHORT, locale));
```

This code has the following output for the `en` locale:

```shell
Monday
M
Mon
```

 

## Month

The [`Month`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Month.html) enum includes constants for the twelve months, `JANUARY` through `DECEMBER`. As with the [`DayOfWeek`](javadoc:) enum, the [`Month`](javadoc:) enum is strongly typed, and the integer value of each constant corresponds to the ISO range from 1 (January) through 12 (December). Using the defined constants (`Month.SEPTEMBER`) makes your code more readable.

The [`Month`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Month.html) enum also includes a number of methods. The following line of code uses the [`maxLength()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Month.html#maxLength()) method to print the maximum possible number of days in the month of February. The output is "29":

```java
System.out.printf("%d%n", Month.FEBRUARY.maxLength());
```

The [`Month`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Month.html) enum also implements the [`getDisplayName(TextStyle, Locale)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Month.html#getDisplayName(java.time.format.TextStyle,java.util.Locale)) method to retrieve a string to identify the month in the user's locale using the specified [`TextStyle`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/TextStyle.html). If a particular [`TextStyle`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/format/TextStyle.html) is not defined, then a string representing the numeric value of the constant is returned. The following code prints the month of August using the three primary text styles:

```java
Month month = Month.AUGUST;
Locale locale = Locale.getDefault();
System.out.println(month.getDisplayName(TextStyle.FULL, locale));
System.out.println(month.getDisplayName(TextStyle.NARROW, locale));
System.out.println(month.getDisplayName(TextStyle.SHORT, locale));
```

This code has the following output for the `en` locale:

```shell
August
A
Aug
```

### In this tutorial

[DayOfWeek](https://dev.java/learn/date-time/dayofweek-month/#dayofweek)[Month](https://dev.java/learn/date-time/dayofweek-month/#month)
