---
date: 2024-07-05
updated: 2024-07-05
order: 30
---
## JFR Security Events Overview

Monitoring the underlying security configuration of your Java application offers you insights on its overall strength with respect to cryptographic standards. JDK 12 introduced four JDK Flight Recorder(JFR) Security Events, disabled by default in the `default.jfc` and `profile.jfc` JFR configuration files:

- `jdk.SecurityPropertyModification` to record `Security.setProperty(String key, String value)` method calls
- `jdk.TLSHandshake` to keep track of TLS handshake activity
- `jdk.X509Validation` to record details of X.509 certificates negotiated in successful X.509 validation
- `jdk.X509Certificate` to record details of X.509 Certificates.

These events were also backported to Oracle JDK 11.0.5 and 8u231 update releases. You can enable these events by modifying the JFR configuration files or via standard JFR options. Take a look at the [JDK Flight Recorder series](https://dev.java/learn/jvm/jfr/) and learn how to configure it to capture JVM relevant events.

Another two JFR cryptographic events offer insights on initial JDK security properties (`jdk.InitialSecurityProperty`) and the amount of service provider method invocations (`jdk.SecurityProviderService`). JDK 20 release announced the new `jdk.InitialSecurityProperty` and it was backported to Oracle JDK 17.0.7 and 11.0.20 update releases. `jdk.SecurityProviderService` event is also available since JDK 20 release, but also in the code base of JDK 17.0.8, 11.0.22 and 8u391 update releases.

This tutorial aims show you how to use how to utilize these JFR Security Events and other JDK tools (keytool, JDK Flight Recorder, JDK Mission Control) to monitor the security of your Java application.

 

## Observing JDK Security Properties

The `jdk.InitialSecurityProperty` was introduced in JDK 20 to record details of initial security properties when loaded via the [`java.security.Security`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/Security.html) class. You can also print the initial security properties to the standard error stream if you set the `java.security.debug=properties` system property:

```shell
java -Djava.security.debug=properties
```

The `jdk.InitialSecurityProperty` event is enabled by default in the `default.jfc` and `profile.jfc` JFR configuration files. If you enable the `jdk.SecurityPropertyModification` event and keep `jdk.InitialSecurityProperty` enabled, you can use a JFR recording to monitor the initial settings of all security properties and any subsequent changes. There are several ways to get a complete view of changes over JDK security properties, including the service provider invocations:

- Have also `jdk.SecurityPropertyModification` and `jdk.SecurityProviderService` enabled in JFR configuration

```shell
$JAVA_HOME/bin/jfr configure jdk.SecurityPropertyModification#enabled=true jdk.SecurityProviderService#enabled=true
```

- Add the `-XX:StartFlightRecording` flag with default settings, while `jdk.SecurityPropertyModification` and `jdk.SecurityProviderService` are enabled

```shell
java -XX:StartFlightRecording:settings=default,duration=60s,+jdk.SecurityPropertyModification#enabled=true,+jdk.SecurityProviderService#enabled=true
```

- Start a JFR recording from JDK Mission Control (JMC) by establishing a connection to a running JVM and configuring the events. Go to JDK Mission Control (JMC) menu, select `File > Connection... > [Select one running JVM] > Start Flight Recording` and configure each JDK Security event.

[![Customize Flight Recording via JMC](https://dev.java/assets/images/security/flight_recording_jmc.png)](https://dev.java/assets/images/security/flight_recording_jmc.png)

You can start a recording from JDK Mission Control (JMC) or in the command line by:

- running java with `-XX:StartFlightRecording` or
- execute a diagnostic command via `jcmd` tool
    
    ```shell
    jcmd llvmid JFR.start duration=60s filename=recording.jfr
    ```
    
    Copy
    

Once you have a ".jfr" recording file, you can print the events using jfr JDK tool:

```shell
$JAVA_HOME/bin/jfr print --events "*Security*" /tmp/recording.jfr

jdk.InitialSecurityProperty {
  startTime = 20:15:48.871 (2023-11-29)
  key = "keystore.type"
  value = "pkcs12"
  eventThread = "main" (javaThreadId = 1)
}

....
jdk.SecurityPropertyModification {
  startTime = 20:15:48.944 (2023-11-29)
  key = "keystore.type"
  value = "jks"
  eventThread = "main" (javaThreadId = 1)
  stackTrace = [
    java.security.Security.setProperty(String, String) line: 762
    CryptoExample.main() line: 26
  ]
}

jdk.SecurityProviderService {
  startTime = 20:15:50.630 (2023-11-29)
  type = "SecureRandom"
  algorithm = "NativePRNG"
  provider = "SUN"
  eventThread = "Attach Listener" (javaThreadId = 37)
  stackTrace = [
    java.security.Provider.getService(String, String) line: 1298
    java.security.SecureRandom.getDefaultPRNG(boolean, byte[]) line: 279
    java.security.SecureRandom.<init>() line: 225
    java.rmi.server.UID.<init>() line: 112
    java.rmi.server.ObjID.<clinit>() line: 88
    ...
  ]
}
...
#output trimmed from a total of 98 security related events
```

By analyzing the output of this command, you can observe the changes that occurred for each security property between its initials values captured by `jdk.InitialSecurityProperty` and the changes from `jdk.SecurityPropertyModification` event. For example, the `jdk.InitialSecurityProperty` captured `keystore.type` as initially set to `pkcs12`, and later `jdk.SecurityPropertyModification` recorded its value to `jks`.

You can also inspect and visualize the evolution of captured events in JDK Mission Control by loading the recording file and navigating to the `Event Browser > Java Development Kit > Security` section:

[![Security view inside a Flight Recording via JMC](https://dev.java/assets/images/security/jmc_view_jfr_recording.png)](https://dev.java/assets/images/security/jmc_view_jfr_recording.png)

Apart from the table display of events, JMC offers performance analysis insights via its views:

- Flame view renders aggregated stack trace collected by the JFR events.
- Graph view renders aggregate stack traces with cumulative count. It presents the stack trace in a graphical format, which helps identify method path to its root.
- Heatmap view provides a visual representation of events occurred during a specific time period within the stacktrace.
- Dependency view presents aggregation of events using hierarchical edge bundling and helps in visualizing the dependencies between packages.

If you are wondering what Transport Layer Security(TLS) protocol version your Java application is using, that depends on how your JDK and applications are configured. In the most recent JDK releases, `TLSv1.3` and `TLSv1.2` are the default options.

Determining precisely what TLS protocol version an application uses is most straightforward by collecting runtime data. Various tools and logger options are available and the next section will discuss some of those.

 

## Monitoring TLS Protocol

To capture TLS protocol information, one could attach a network protocol analyzer tool to the network interface where the running JVM communicates, and get information on all the network traffic. Look for the "Server Hello" record and the accompanying version value to determine the TLS version used on a particular socket.

But a more Java developer friendly way to check TLS protocol version is by inspecting the JDK debug logs. If you enable `javax.net.debug` system property to `ssl:handshake` (i.e. `-Djavax.net.debug=ssl:handshake`), you will obtain the TLS version protocol value. Below is an example of a `ServerHello` capture in a recent JDK 21 release:

```text
"ServerHello": {
  "server version"      : "TLSv1.2",
  "random"              : "D36A78A81EA96FA48CAA23D0397E2EDD1FBA783D2B105A8C00D58D7EE74E24A4",
  "session id"          : "A998EB34379D24829F6E8884D4D2BCC39BACEF6D77C4B9435D104779DC6003CD",
  "cipher suite"        : "TLS_AES_256_GCM_SHA384(0x1302)",
  "compression methods" : "00",
  "extensions"          : [
    "supported_versions (43)": {
      "selected version": [TLSv1.3]
    },
    "key_share (51)": {
      "server_share": {
        "named group": x25519
        "key_exchange": {
          0000: 39 EC 40 25 89 1A 75 FF   EF 53 0C 36 58 57 1F F8  9.@%..u..S.6XW..
          0010: 23 F6 07 D6 9E A8 E4 43   F1 6C 20 F7 AE 5E B1 79  #......C.l ..^.y
        }
      },
    }
  ]
}
```

The above output shows that `TLSv1.3` is in use for this particular connection (`"selected version": [TLSv1.3]`).

In the long run, inspecting logs can be a tedious task, so a valuable option for capturing essential TLS information is via JDK Flight Recorder. The `jdk.TLSHandshake` event captures core information on every TLS handshake performed by the JDK. To enable it, you can perform the following:

- Simply switch the `jdk.TLSHandshake` options to `true` in your JFR configuration file:

```xml
    <event name="jdk.TLSHandshake">
      <setting name="enabled">true</setting>
      <setting name="stackTrace">true</setting>
    </event>
```

- Run `jfr configure` command in a terminal window

```shell
$JAVA_HOME/bin/jfr configure jdk.TLSHandshake#enabled=true jdk.TLSHandshake#stackTrace=true
```

- Add the `-XX:StartFlightRecording` flag with default settings, while `jdk.TLSHandshake` is enabled as well:

```shell
java -XX:StartFlightRecording:settings=default,duration=60s,+jdk.TLSHandshake#enabled=true,+jdk.TLSHandshake#stackTrace=true
```

- Start a JFR recording from JDK Mission Control (JMC) by establishing a connection to a running JVM and configuring the event. Go to JDK Mission Control (JMC) menu, select `File > Connection... > [Select one running JVM] > Start Flight Recording` and configure `jdk.TLSHandshake` event.

You can start a recording from JDK Mission Control (JMC) or in the command line by:

- running java with `-XX:StartFlightRecording` or
- execute a diagnostic command via `jcmd` tool
    
    ```shell
    jcmd llvmid JFR.start duration=60s filename=/tmp/TLS.jfr
    ```
    
    Copy
    

As soon as you obtain a recording, you can analyze the `TLSHandshake` event data with jfr or in JDK Mission Control. For example, running the following `jfr print` command will show you the TLS handshake activity:

```shell
$JAVA_HOME/bin/jfr print --events "TLS*" /tmp/TLS.jfr

jdk.TLSHandshake {
  startTime = 15:28:42.949 (2023-11-30)
  peerHost = "google.com"
  peerPort = 443
  protocolVersion = "TLSv1.3"
  cipherSuite = "TLS_AES_128_GCM_SHA256"
  certificateId = 587815551
  eventThread = "main" (javaThreadId = 1)
  stackTrace = [
    sun.security.ssl.Finished.recordEvent(SSLSessionImpl) line: 1165
    sun.security.ssl.Finished$T13FinishedProducer.onProduceFinished(ClientHandshakeContext, SSLHandshake$HandshakeMessage) line: 767
    sun.security.ssl.Finished$T13FinishedProducer.produce(ConnectionContext, SSLHandshake$HandshakeMessage) line: 672
    sun.security.ssl.SSLHandshake.produce(ConnectionContext, SSLHandshake$HandshakeMessage) line: 437
    sun.security.ssl.Finished$T13FinishedConsumer.onConsumeFinished(ClientHandshakeContext, ByteBuffer) line: 1030
    ...
  ]
}
```

You can observe in the output the following event fields:

- Peer hostname
- Peer port
- TLS protocol version negotiated
- TLS cipher suite negotiated
- Certificate id of peer client

While Transport Layer Security (TLS) is a cryptographic protocol designed to support secure communications over a computer network, digital certificates ensure that data is transmitted privately and without modifications, loss or theft. Next section discusses how you can record and analyze X.509 certificates details.

 

## Analyzing X.509 certificates

X.509 certificates are widely deployed in JDK applications to support authentication and other functionality in security systems. An X.509 certificate has a set of fields defined according to [RFC 1422] and include:

1. version
2. serial number
3. signature (algorithm ID and parameters)
4. issuer name
5. validity period
6. subject name
7. subject public key (and associated algorithm ID)

The values of these fields impact the underlying security configuration in the environments where they are used. For example, the validity period of a certificate is an essential piece of data as expired certificates can cause application downtime from a specific date onward.

From a static analysis point of view, you can use the `keytool` to query certificates. For example, you can view verbose details about every certificate inside the default JDK truststore (`$JDK_HOME/lib/security/cacerts` in JDK 9 and later) by running the following command:

```shell
$JAVA_HOME/bin/keytool -cacerts -list -v
```

The above scenario is simple, but how can you retrieve details of certificates that are actually in use for a Java application?

By configuring the debug system properties `-Djava.security.debug=certpath` and `-Djavax.net.debug=all` to print verbose X.509 certificate information during the lifetime of a Java application.

```shell
java -Djava.security.debug=certpath -Djavax.net.debug=all
```

Below you can see a sample output of X.509 certificates printed during certificate path validation attempts:

```text
Trusted CA cert: [
[
Version: V3
Subject: CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US
Signature Algorithm: SHA1withRSA, OID = 1.2.840.113549.1.1.5

Key:  Sun RSA public key, 2048 bits
params: null
modulus: 28559384442792876273280274398620578979733786817784174960112400169719065906301471912340204391164075730987771255281479191858503912379974443363319206013285922932969143082114108995903507302607372164107846395526169928849546930352778612946811335349917424469188917500996253619438384218721744278787164274625243781917237444202229339672234113350935948264576180342492691117960376023738627349150441152487120197333042448834154779966801277094070528166918968412433078879939664053044797116916260095055641583506170045241549105022323819314163625798834513544420165235412105694681616578431019525684868803389424296613694298865514217451303
public exponent: 65537
Validity: [From: Fri Nov 10 00:00:00 UTC 2006,
To: Mon Nov 10 00:00:00 UTC 2031]
Issuer: CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US
SerialNumber: [    083be056 904246b1 a1756ac9 5991c74a]
 
===

Certificate details are also printed during TLS handshake messages. e.g.:

"certificate" : {
"version"            : "v3",
"serial number"      : "083BE056904246B1A1756AC95991C74A",
"signature algorithm": "SHA1withRSA",
"issuer"             : "CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US",
"not before"         : "2006-11-10 24:00:00.000 UTC",
"not  after"         : "2031-11-10 24:00:00.000 UTC",
"subject"            : "CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US",
"subject public key" : "RSA",
```

Yet verbose logging slows down systems because of the time needed to collect additional information or display additional details. You can elegantly capture relevant data about X.509 certificates using two JDK Flight Recorder security events:

- `jdk.X509Validation` that records details of X.509 certificates negotiated in successful X.509 validations.
- `jdk.X509Certificate` that captures information about every X.509 cert generated by the JDK security libraries.

You have several options to enable these events:

- Simply switch the `jdk.X509Certificate` options to `true` in your JFR configuration file:

```xml
    <event name="jdk.X509Certificate">
      <setting name="enabled">true</setting>
      <setting name="stackTrace">true</setting>
    </event>

    <event name="jdk.X509Validation">
       <setting name="enabled">true</setting>
       <setting name="stackTrace">true</setting>
    </event>
```

- Run `jfr configure` command in a terminal window

```shell
$JAVA_HOME/bin/jfr configure jdk.X509Certificate#enabled=true jdk.X509Validation#enabled=true
```

- Add the `-XX:StartFlightRecording` flag with default settings, while `jdk.X509Certificate` and `jdk.X509Validation` are enabled as well:

```shell
java -XX:StartFlightRecording:settings=default,duration=60s,+jdk.X509Certificate#enabled=true,+jdk.X509Validation#enabled=true
```

- Start a JFR recording from JDK Mission Control (JMC) by establishing a connection to a running JVM and configuring the event. Go to JDK Mission Control (JMC) menu, select `File > Connection... > [Select one running JVM] > Start Flight Recording` and configure `jdk.X509Certificate` and `jdk.X509Validation` events.

You can start a recording from JDK Mission Control (JMC) or in the command line by:

- running java with `-XX:StartFlightRecording` or
- execute a diagnostic command via `jcmd` tool
    
    ```shell
    jcmd llvmid JFR.start duration=60s filename=/tmp/myTLSApp.jfr
    ```
    
    Copy
    

For example, running the following command will show you recorded details about X.509 Certificates:

```shell
$JAVA_HOME/bin/jfr print --events jdk.X509Certificate /tmp/myTLSApp.jfr


jdk.X509Certificate {
  startTime = 09:59:25.672 (2022-11-10)
  algorithm = "SHA1withRSA"
  serialNumber = "18dad19e267de8bb4a2158cdcc6b3b4a"
  subject = "CN=VeriSign Class 3 Public Primary Certification Authority - G5, OU="(c) 2006 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US"
  issuer = "CN=VeriSign Class 3 Public Primary Certification Authority - G5, OU="(c) 2006 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US"
  keyType = "RSA"
  keyLength = 2048
  certificateId = 303010488
  validFrom = 00:00:00.000 (2006-11-08)
  validUntil = 23:59:59.000 (2036-07-16)
  eventThread = "main" (javaThreadId = 1)
  stackTrace = [
    sun.security.jca.JCAUtil.tryCommitCertEvent(Certificate) line: 126
    java.security.cert.CertificateFactory.generateCertificate(InputStream) line: 356
    sun.security.pkcs12.PKCS12KeyStore.loadSafeContents(DerInputStream) line: 2428
    sun.security.pkcs12.PKCS12KeyStore.engineLoad(InputStream, char[]) line: 2038
    sun.security.util.KeyStoreDelegator.engineLoad(InputStream, char[]) line: 228
    java.security.KeyStore.load(InputStream, char[]) line: 1500
    java.security.KeyStore.getInstance(File, char[], KeyStore$LoadStoreParameter, boolean) line: 1828
    java.security.KeyStore.getInstance(File, char[]) line: 1709
    sun.security.tools.KeyStoreUtil.getCacertsKeyStore() line: 137
    sun.security.tools.keytool.Main.buildTrustedCerts() line: 5072
    sun.security.tools.keytool.Main.doCommands(PrintStream) line: 1122
    sun.security.tools.keytool.Main.run(String[], PrintStream) line: 419
    ...
  ]
}
```

JDK Flight Recorder provides rich, structured data,like stack traces and timestamped values, and API support to event streams. Until JDK 16, developers could monitor a Java process on a remote host and control what is recorded via JDK Mission Control. JDK Mission Control fetches recording data and configures events on a remote machine using [`FlightRecorderMXBean`](https://docs.oracle.com/en/java/javase/22/docs/api/jdk.management.jfr/jdk/management/jfr/FlightRecorderMXBean.html).

Starting with JDK 16, you can transfer recorded events programmatically over the network as they occur using an [`MBeanServerConnection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.management/javax/management/MBeanServerConnection.html):

```java

String host = "com.example";
int port = 7091;

String url = "service:jmx:rmi:///jndi/rmi://" + host + ":" + port + "/jmxrmi";

JMXServiceURL u = new JMXServiceURL(url);
JMXConnector c = JMXConnectorFactory.connect(u);
MBeanServerConnection connection = c.getMBeanServerConnection();

try (RemoteRecordingStream stream = new RemoteRecordingStream(connection)) {
    stream.enabled("jdk.X509Certificate").withStackTrace();
    stream.onEvent("jdk.X509Certificate", System.out::println),
    stream.start();
}
```

So utilize the JDK tools and APIs available with your JDK version and analyze security settings and certificate data at runtime to keep your application safe!

---
Last update: December 1, 2023