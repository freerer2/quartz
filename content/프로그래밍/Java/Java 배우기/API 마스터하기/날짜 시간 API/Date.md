---
date: 2024-07-05
updated: 2024-07-05
order: 40
---
The Date-Time API provides four classes that deal exclusively with date information, without respect to time or time zone. The use of these classes are suggested by the class names: [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html), [`YearMonth`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/YearMonth.html), [`MonthDay`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/MonthDay.html), and [`Year`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Year.html).

 

## The LocalDate Class

A [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html) represents a year-month-day in the ISO calendar and is useful for representing a date without a time. You might use a [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html) to track a significant event, such as a birth date or wedding date. The following examples use the of and with methods to create instances of [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html):

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
LocalDate nextWed = date.with(TemporalAdjusters.next(DayOfWeek.WEDNESDAY));
```

For more information about the [`TemporalAdjuster`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/TemporalAdjuster.html) interface, see the section on [Temporal Adjuster](https://dev.java/learn/date-time/temporal/#temporal-adjusters).

In addition to the usual methods, the [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html) class offers getter methods for obtaining information about a given date. The [`getDayOfWeek()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek()) method returns the day of the week that a particular date falls on. For example, the following line of code returns "MONDAY":

```java
DayOfWeek dotw = LocalDate.of(2012, Month.JULY, 9).getDayOfWeek();
```

The following example uses a [`TemporalAdjuster`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/temporal/TemporalAdjuster.html) to retrieve the first Wednesday after a specific date.

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);
LocalDate nextWed = date.with(adj);
System.out.printf("For the date of %s, the next Wednesday is %s.%n",
                  date, nextWed);
```

Running the code produces the following:

```shell
For the date of 2000-11-20, the next Wednesday is 2000-11-22.
```

The [Period and Duration](https://dev.java/learn/date-time/period-duration/) section also has examples using the [`LocalDate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/LocalDate.html) class.

 

## The YearMonth Class

The [`YearMonth`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/YearMonth.html) class represents the month of a specific year. The following example uses the [`lengthOfMonth()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/YearMonth.html#lengthOfMonth()) method to determine the number of days for several year and month combinations.

```java
YearMonth date = YearMonth.now();
System.out.printf("%s: %d%n", date, date.lengthOfMonth());

YearMonth date2 = YearMonth.of(2010, Month.FEBRUARY);
System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());

YearMonth date3 = YearMonth.of(2012, Month.FEBRUARY);
System.out.printf("%s: %d%n", date3, date3.lengthOfMonth());
```

The output from this code looks like the following:

```shell
2013-06: 30
2010-02: 28
2012-02: 29
```

 

## The MonthDay Class

The [`MonthDay`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/MonthDay.html) class represents the day of a particular month, such as New Year's Day on January 1.

The following example uses the [`isValidYear()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/MonthDay.html#isValidYear(int)) method to determine if February 29 is valid for the year 2010. The call returns false, confirming that 2010 is not a leap year.

```java
MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
boolean validLeapYear = date.isValidYear(2010);
```

 

## The Year Class

The [`Year`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Year.html) class represents a year. The following example uses the [`isLeap()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/time/Year.html#isLeap()) method to determine if the given year is a leap year. The call returns `true`, confirming that 2012 is a leap year.

```java
boolean validLeapYear = Year.of(2012).isLeap();
```

---
Last update: January 27, 2022