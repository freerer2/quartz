---
date: 2024-07-05
updated: 2024-07-05
order: 40
---
The JDK comes with a set of built-in tools and capabilities that can help system administrators keep Java installations safe. Although these tools and capabilities are often well known to experienced Java developers, they may not always be familiar to administrators asked to safeguard Java applications.

In this post we’ll go over a few built-in tools and capabilities, providing pointers to further resources. Administrators can explore this information to prepare for situations where they may have to re-evaluate and apply measures to improve the security posture of their Java applications.

In short, this article provides general advice for keeping Java applications safe, rather than advice for mitigating a specific vulnerability.

 

## JDK Command Line Tools for identifying classes being used by an application

When securing a Java application, it is common to first determine whether a particular class is being used. The JDK includes tools that can help with this task.

### jcmd tool

The `jcmd` tool can be used to retrieve a running application’s system properties by running `jcmd $pid VM.system_properties`, where `$pid` stands for the process id of the Java application to be examined. If using `jcmd` you find a potentially interesting library name in a location on the classpath, the library can then be examined further to, for example, determine its version.

![Figure 1: jcmd VM.system_properties output example (highlighted class path for emphasis)](https://dev.java/assets/images/tools/jcmd/vm-system-properties.png)

_Figure 1: jcmd VM.system_properties output example (highlighted class path for emphasis)_

In JDK 9 and later versions, `jcmd` can print a hierarchical listing of all classes loaded by a Java application running on the same machine, using the VM.class_hierarchy subcommand, by invoking `jcmd $pid VM.class_hierarchy`.

![Figure 2: jcmd VM.class_hierarchy output example](https://dev.java/assets/images/tools/jcmd/vm-class-hierarchy.png)

_Figure 2: jcmd VM.class_hierarchy output example_

In JDK 7 and later, the `GC.class_histogram` subcommand can be used instead to obtain a listing of all instantiated classes (and their memory usage), by invoking `jcmd $pid GC.class_histogram`.

![Figure 3: jcmd GC.class_histogram output example (highlighted for emphasis)](https://dev.java/assets/images/tools/jcmd/vm-class-histogram.png)

_Figure 3: jcmd GC.class_histogram output example (highlighted for emphasis)_

Administrators can examine the output from `jcmd` for packages of interest, such as `com.example.foo.bar` to establish whether a running Java application has loaded or instantiated classes from packages with those names.

Packages and classes that have not yet been loaded or instantiated would not show up in the output of `jcmd`. In that case, their absence from the `jcmd` output alone should not be taken to indicate that they can’t be loaded by the application at a later point in time, provided that its configuration and dependencies permit that.

With JDK 9 and later, it is not necessary to examine the GC class histogram for a suspect class since a class cannot be instantiated without first being loaded. You should use the `jcmd` version from a JDK that matches the JDK used to run the process you are inspecting. More information about using the `jcmd` tool is available in the [JDK troubleshooting guide](https://docs.oracle.com/en/java/javase/21/troubleshoot/diagnostic-tools.html#GUID-42A18B29-B4AD-4831-B846-2CDBA55F2254).

#### Summary

|Command|Supported since|Description|Action|
|---|---|---|---|
|`jcmd <pid> VM.system_properties`|JDK 7|Prints all the system properties set for the JDK|Examine classpath for specific libraries|
|`jcmd <pid> GC.class_histogram`|JDK 7|Creates and prints a class histogram|Examine instantiated classes|
|`jcmd <pid> VM.class_hierarchy`|JDK 9|Prints the class hierarchy|Examine loaded classes|

### jdeps

Classes and packages may be loaded as dependencies at runtime. Starting with JDK 8, developers and system administrators can use `jdeps` to analyze Java libraries and classes statically to learn more about their package-level or class-level dependencies.

Developers can use jdeps to examine individual JAR libraries, searching for dependencies on specific packages using the `-p` option, e.g. `jdeps -p com.example.foo.bar some.jar` will list the packages in some.jar that depend on the package specified by `-p`. `jdeps` can also filter package dependencies using regular expressions. This allows developers and administrators to search for partial package names to, e.g., find shaded libraries.

More information on using jdeps can be found in the [corresponding manual page](https://docs.oracle.com/en/java/javase/22/docs/specs/man/jdeps.html#options-to-filter-classes-to-be-analyzed).

#### Summary

|Command|Supported since|Description|Action|
|---|---|---|---|
|`jdeps -package <package-name> <jar>`|JDK 8|Statically analyzes Java libraries and classes|Examine package-level or class-level dependencies|

 

## Runtime Configuration Options

### System properties, environment variables, and command line options

Another important reason to keep your Java runtimes up to date is because Oracle improves runtime capabilities continuously, and provides mitigations in line with best practices, as documented in the [JDK release notes](https://www.oracle.com/java/technologies/javase/jdk-relnotes-index.html).

Best security practices encourage users to disable capabilities not required by their applications and to configure their systems to restrict required capabilities as much as possible.

For example, several options to disable or restrict the usage of the Java Naming and Directory Interface (JNDI) have been introduced since January 2017 (in 8u121, 7u131, and 6u141), when [remote class loading via JNDI object factories was disabled by default](https://www.oracle.com/java/technologies/javase/8u121-relnotes.html#notes-8u121). Further restrictions are enabled by default since October 2018 (11.0.1, 8u191, 7u201, and 6u211).

If an application is using JNDI and it does not need factories to create any Java LDAP objects, administrators should use the `JAVA_TOOL_OPTIONS` environment variable at startup to pass the Java runtime command line options: `-Djdk.jndi.object.factoriesFilter=!* and -Dcom.sun.jndi.ldap.object.trustSerialData=false`. These properties are available on Oracle Java 17, 11.0.11, 8u291, and 7u301 and later (since April 2021).

A detailed description of these properties is available in the Java SE API [documentation](https://docs.oracle.com/en/java/javase/22/docs/api/java.naming/module-summary.html):

- `jdk.jndi.object.factoriesFilter`: This system and security property allows a serial filter to be specified that controls the set of object factory classes permitted to instantiate objects from object references returned by naming/directory systems. The factory class named by the reference instance is matched against this filter during remote reference reconstruction. The filter property supports pattern-based filter syntax with the format specified by [JEP 290: Filter Incoming Serialization Data](https://openjdk.java.net/jeps/290). This property applies both to the JNDI/RMI and the JNDI/LDAP built-in provider implementations. The default value allows any object factory class specified in the reference to recreate the referenced object.
- `com.sun.jndi.ldap.object.trustSerialData`: This system property allows control of the deserialization of java objects from the `javaSerializedData` LDAP attribute. To prevent deserialization of java objects from the attribute, the system property can be set to false value. By default, deserialization of java objects from the `javaSerializedData` attribute is allowed.

More information on using the `JAVA_TOOL_OPTIONS` environment variable can be found in the [corresponding troubleshooting guide](https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/envvars002.html).

If your application uses serialization, Oracle recommends using a serialization filter as described in [JEP 290: Filter Incoming Serialization Data](https://openjdk.java.net/jeps/290) and [JEP 415: Context-Specific Deserialization Filters](https://openjdk.java.net/jeps/415), to limit the classes that can be deserialized. Filtering incoming streams of object-serialization data significantly improves an application’s security and robustness.

#### Summary of Configuration Options

|Command|Supported since|Description|Action|
|---|---|---|---|
|`jdk.jndi.object.factoriesFilter`|17, 11.0.11, 8u291, and 7u301|Controls the set of object factory classes permitted to instantiate objects from object references returned by naming/directory systems.|`-Djdk.jndi.object.factoriesFilter=!*` Disallows use of any object factory for JNDI|
|`com.sun.jndi.ldap.object.trustSerialData`|17, 11.0.11, 8u291, and 7u301|Allows control of the deserialization of java objects from the `javaSerializedData` LDAP attribute.|`-Dcom.sun.jndi.ldap.object.trustSerialData=false` Prevents deserialization from the LDAP attribute|
|`jdk.serialFilter`|9, 8u121, and 7u131|Filters incoming streams of object-serialization in order to improve both security and robustness.|[JDK 21 Guide and Examples](https://docs.oracle.com/en/java/javase/21/core/serialization-filtering1.html#GUID-91735293-E38E-4A81-85DC-719AFEB36026)  <br>[JDK 17 Guide and Examples](https://docs.oracle.com/en/java/javase/17/core/serialization-filtering1.html#GUID-91735293-E38E-4A81-85DC-719AFEB36026)  <br>[JDK 11 Guide and Examples](https://docs.oracle.com/en/java/javase/11/core/serialization-filtering1.html#GUID-3ECB288D-E5BD-4412-892F-E9BB11D4C98A)  <br>[JDK 7 and 8 Guide and Examples](https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/filters/serialization-filtering.html)|

### Crafting a dedicated runtime to omit unnecessary functionality using jlink

Finally, starting with JDK 9, developers can take advantage of the `jlink` tool to generate a custom JDK runtime image for their application, which provides just the JDK functionality required by their code and its dependent libraries. If an application does not have a GUI, for example, and therefore does not need the desktop APIs and their implementations, a JDK runtime image can be generated that does not contain the `java.desktop` module, reducing the combined download size as well as the potential attack surface for the application.

To continue with our earlier example, if one wanted to create a runtime which did not use JNDI, one could create a custom runtime that didn’t include the `java.naming` module, where that functionality is located. The set of all modules in a JDK runtime image can be found using the `java --list-modules` command.

![Figure 4: java --list-modules partial output example using jdk 11.0.13](https://dev.java/assets/images/tools/jlink/list-modules.png)

_Figure 4: java --list-modules partial output example using jdk 11.0.13_

Developers can create a custom JDK runtime image using `jlink` by providing it an explicit list of modules to be contained within the runtime image. The set of modules to include in an image depends on the requirements and JDK module dependencies of the application the image is being created for. The latter can be determined using `jdeps`.

Starting with JDK 11, `jdeps` provides the `–print-module-deps` option, which provides a comma-separated list of JDK (and other) modules, that can be passed to `jlink` with the option `–add-modules` to create a custom runtime image containing just those modules and their transitive dependencies.

A trivial example using `jlink` to generate a custom runtime image containing just a few modules can be found below. Other custom JDK runtimes may contain a substantially larger subset of the JDK modules, as well as additional files, such as support for different locales, or different service provider implementations, that their code ultimately depends on. Not all such JDK dependencies can be determined through the static analysis of bytecode performed by `jdeps` alone. Developers should carefully examine their custom JDK runtimes to ensure that all JDK functionality required for their application is present by running `java –list-modules` from the generated custom runtime image.

```shell
$ jlink --module-path . --add-modules java.base,java.logging,java.net.http,java.xml --output my_runtime

$ my_runtime/bin/java --list-modules
java.base@11.0.13
java.logging@11.0.13
java.net.http@11.0.13
java.xml@11.0.13
```

Custom JDK runtime images created through `jlink` are a well-defined subset of the JDK. System administrators should apply the same kind of integration testing to custom JDK runtime images as they would to a regular JDK upgrade.

You can learn more about using the `jlink` command to create customized JDK runtime images on its [manual page](https://docs.oracle.com/en/java/javase/22/docs/specs/man/jlink.html).

If creating a custom JDK runtime image is not an option, system administrators can use the `–limit-modules` Java option at runtime to limit the set of JDK modules that can be observed by an application. JDK 9 introduced this Java option as part of [JEP 261: Module System](https://openjdk.java.net/jeps/261). It allows specifying the precise set of JDK modules, including their dependencies, which will be available to an application at runtime instead of the full Java SE API.

Running code that expects to be able to use APIs on a runtime that doesn’t make them available may lead to runtime exceptions. When using custom runtimes images generated with `jlink`, or if using flags to limit the observability of JDK modules, it is important that developers and administrators run integration testing as when applying a JDK upgrade.%%  %%

---
Last review: June 10, 2024