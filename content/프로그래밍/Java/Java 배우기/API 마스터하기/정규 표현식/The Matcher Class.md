---
date: 2022-1-10
updated: 2022-1-10
order: 90
---
## Index Methods

Index methods provide useful index values that show precisely where the match was found in the input string:

- [`public int start()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#start()): Returns the start index of the previous match.
- [`public int start(int group)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#start(int)): Returns the start index of the subsequence captured by the given group during the previous match operation.
- [`public int end()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#end()): Returns the offset after the last character matched.
- [`public int end(int group)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#end(int)): Returns the offset after the last character of the subsequence captured by the given group during the previous match operation.

 

## Study Methods

Study methods review the input string and return a boolean indicating whether or not the pattern is found.

- [`public boolean lookingAt()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#lookingAt()): Attempts to match the input sequence, starting at the beginning of the region, against the pattern.
- [`public boolean find()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#find()): Attempts to find the next subsequence of the input sequence that matches the pattern.
- [`public boolean find(int start)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#find(int)): Resets this matcher and then attempts to find the next subsequence of the input sequence that matches the pattern, starting at the specified index.
- [`public boolean matches()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#matches()): Attempts to match the entire region against the pattern.

 

## Replacement Methods

Replacement methods are useful methods for replacing text in an input string.

- [`public Matcher appendReplacement(StringBuffer sb, String replacement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#appendReplacement(java.lang.StringBuilder,java.lang.String)): Implements a non-terminal append-and-replace step.
- [`public StringBuilder appendTail(StringBuilder sb)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#appendTail(java.lang.StringBuilder)): Implements a terminal append-and-replace step.
- [`public String replaceAll(String replacement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceAll(java.lang.String)): Replaces every subsequence of the input sequence that matches the pattern with the given replacement string.
- [`public String replaceFirst(String replacement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst(java.lang.String)): Replaces the first subsequence of the input sequence that matches the pattern with the given replacement string.
- [`public static String quoteReplacement(String s)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#quoteReplacement(java.lang.String)): Returns a literal replacement String for the specified String. This method produces a String that will work as a literal replacement s in the appendReplacement method of the Matcher class. The String produced will match the sequence of characters in s treated as a literal sequence. Slashes ('') and dollar signs ('$') will be given no special meaning.

 

## Using the Start and End Methods

Here's an example, that counts the number of times the word "dog" appears in the input string.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MatcherDemo {

    private static final String REGEX =
        "\\bdog\\b";
    private static final String INPUT =
        "dog dog dog doggie dogg";

    public static void main(String[] args) {
       Pattern p = Pattern.compile(REGEX);
       //  get a matcher object
       Matcher m = p.matcher(INPUT);
       int count = 0;
       while(m.find()) {
           count++;
           System.out.println("Match number "
                              + count);
           System.out.println("start(): "
                              + m.start());
           System.out.println("end(): "
                              + m.end());
      }
   }
}
```

Running this code produces the following result.

```shell
Match number 1
start(): 0
end(): 3
Match number 2
start(): 4
end(): 7
Match number 3
start(): 8
end(): 11
```

You can see that this example uses word boundaries to ensure that the letters "d" "o" "g" are not merely a substring in a longer word. It also gives some useful information about where in the input string the match has occurred. The [`start()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#start()) method returns the start index of the subsequence captured by the given group during the previous match operation, and [`end()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#end()) returns the index of the last character matched, plus one.

 

## Using the Matches and LookingAt Methods

The [`matches()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#matches()) and [`lookingAt()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#lookingAt()) methods both attempt to match an input sequence against a pattern. The difference, however, is that [`matches()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#matches()) requires the entire input sequence to be matched, while [`lookingAt()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#lookingAt()) does not. Both methods always start at the beginning of the input string. Here is the full code:

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MatchesLooking {

    private static final String REGEX = "foo";
    private static final String INPUT =
        "fooooooooooooooooo";
    private static Pattern pattern;
    private static Matcher matcher;

    public static void main(String[] args) {
   
        // Initialize
        pattern = Pattern.compile(REGEX);
        matcher = pattern.matcher(INPUT);

        System.out.println("Current REGEX is: "
                           + REGEX);
        System.out.println("Current INPUT is: "
                           + INPUT);

        System.out.println("lookingAt(): "
            + matcher.lookingAt());
        System.out.println("matches(): "
            + matcher.matches());
    }
}
```

Running this code produces the following result.

```shell
Current REGEX is: foo
Current INPUT is: fooooooooooooooooo
lookingAt(): true
matches(): false
```

 

## Using ReplaceFirst and ReplaceAll

The [`replaceFirst()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst(java.lang.String)) and [`replaceAll()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceAll(java.lang.String)) methods replace text that matches a given regular expression. As their names indicate, [`replaceFirst()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst(java.lang.String)) replaces the first occurrence, and [`replaceAll()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceAll(java.lang.String)) replaces all occurrences. Here is the code:

```java
import java.util.regex.Pattern; 
import java.util.regex.Matcher;

public class ReplaceDemo {
 
    private static String REGEX = "dog";
    private static String INPUT =
        "The dog says meow. All dogs say meow.";
    private static String REPLACE = "cat";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        // get a matcher object
        Matcher m = p.matcher(INPUT);
        INPUT = m.replaceAll(REPLACE);
        System.out.println(INPUT);
    }
}
```

Running this code produces the following result.

```shell
The cat says meow. All cats say meow.
```

In this first version, all occurrences of dog are replaced with cat. But why stop here? Rather than replace a simple literal like dog, you can replace text that matches any regular expression. The API for this method states that "given the regular expression `a*b`, the input `aabfooaabfooabfoob`, and the replacement string `-`, an invocation of this method on a matcher for that expression would yield the string `-foo-foo-foo-`.".

Let us write the following example.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;
 
public class ReplaceDemo2 {
 
    private static String REGEX = "a*b";
    private static String INPUT =
        "aabfooaabfooabfoob";
    private static String REPLACE = "-";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        // get a matcher object
        Matcher m = p.matcher(INPUT);
        INPUT = m.replaceAll(REPLACE);
        System.out.println(INPUT);
    }
}
```

Running this code produces the following result.

```shell
-foo-foo-foo-
```

To replace only the first occurrence of the pattern, simply call [`replaceFirst()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst(java.lang.String)) instead of [`replaceAll()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceAll(java.lang.String)). It accepts the same parameter.

 

## Using AppendReplacement and AppendTail

The [`Matcher`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html) class also provides [`appendReplacement()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#appendReplacement(java.lang.StringBuilder,java.lang.String)) and [`appendTail()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#appendTail(java.lang.StringBuilder)) methods for text replacement. The following example uses these two methods to achieve the same effect as [`replaceAll()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html#replaceAll(java.lang.String)).

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexDemo {
 
    private static String REGEX = "a*b";
    private static String INPUT = "aabfooaabfooabfoob";
    private static String REPLACE = "-";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        Matcher m = p.matcher(INPUT); // get a matcher object
        StringBuffer sb = new StringBuffer();
        while(m.find()){
            m.appendReplacement(sb,REPLACE);
        }
        m.appendTail(sb);
        System.out.println(sb.toString());
    }
}
```

Running this code produces the same result as previously.

```shell
-foo-foo-foo-
```

 

## Matcher Method Equivalents in String

For convenience, the [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) class mimics a couple of [`Matcher`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Matcher.html) methods as well:

- [`public String replaceFirst(String regex, String replacement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html#replaceFirst(java.lang.String,java.lang.String)): Replaces the first substring of this string that matches the given regular expression with the given replacement. An invocation of this method of the form `string.replaceFirst(regex, repl)` yields exactly the same result as the expression `Pattern.compile(regex).matcher(str).replaceFirst(repl)`
- [`public String replaceAll(String regex, String replacement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html#replaceAll(java.lang.String,java.lang.String)): Replaces each substring of this string that matches the given regular expression with the given replacement. An invocation of this method of the form `string.replaceAll(regex, repl)` yields exactly the same result as the expression `Pattern.compile(regex).matcher(str).replaceAll(repl)`
