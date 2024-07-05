---
date: 2024-07-05
updated: 2024-07-05
order: 20
---
Having online access to almost anything and being able to interact with one another is part of our daily routine. However, living in the online world means you have to question the legitimacy of data: is each email trustworthy? When you log in to your favorite website, how do you know it’s reliable? Is the software update you want to install authentic, or is it a virus in disguise waiting to infect your device?

In this article we will take a closer to how you can verify digital signatures and inspect certificates within your Java code.  

## Implementing Digital Signatures with Java

You should use digital signatures if you need a mechanism for validating:

- Authenticity: the identity of the message author is accurate.
- Integrity: the message was not altered during the transmission.
- Non-repudiation: the transferred message has been sent and received by the parties claiming to have shipped and accepted it.

To send a message using a digital signature you first need to generate an asymmetric key pair using and algorithm, for example `Ed25519`:

```java
KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(Ed25519);
KeyPair keypair = keyPairGenerator.generateKeyPair();
```

Next, you should feed the message into the signature object and call the `sign` method:

```java
public static byte[] generateDigitalSignature(byte[] plainText, PrivateKey privateKey) throws Exception  {
    Signature signature = Signature.getInstance("Ed25519");
    signature.initSign(privateKey);
    signature.update(plainText);
    return signature.sign();
}
```

In the method `generateDigitalSignature`, you obtain an instance of the `Signature` object by passing the signing algorithm `Ed25519`, an elliptic curve signing algorithm using `EdDSA` and `Curve25519`. Then, you initialize the signature with a private key, pass the message, and finish the signing operation by storing it as a byte array.

To verify a signature, you create again a `Signature` instance, this time passing the text message and the public key, like in `verifyDigitalSignature` method:

```java
public static boolean verifyDigitalSignature(byte[] plainText, byte[] digitalSignature, PublicKey publicKey)
        throws Exception {
    Signature signature = Signature.getInstance("Ed25519");
    signature.initVerify(publicKey);
    signature.update(plainText);
    return signature.verify(digitalSignature);
}
```

Finally, you can check the signature by invoking the `verify` method on it.

You can try the previous methods by running the following snippet of code in `jshell`:

```java
import java.security.*;
import java.util.HexFormat;
import java.util.Scanner;

public class DigitalSignatureExample {
    public static final String Ed25519 = "Ed25519";

    public static byte[] generateDigitalSignature(byte[] plainText, PrivateKey privateKey) throws Exception  {
        Signature signature = Signature.getInstance(Ed25519);
        signature.initSign(privateKey);
        signature.update(plainText);
        return signature.sign();

    }
    
    public static boolean verifyDigitalSignature(byte[] plainText, byte[] digitalSignature, PublicKey publicKey)
            throws Exception {
        Signature signature = Signature.getInstance(Ed25519);
        signature.initVerify(publicKey);
        signature.update(plainText);
        return signature.verify(digitalSignature);
    }

    public static void main(String[] args) throws Exception {

        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("Ed25519");
        KeyPair keypair = keyPairGenerator.generateKeyPair();

        Scanner message = new Scanner(System.in);
        System.out.print("Enter the message you want to encrypt using Ed25519: ");
        String plainText = message.nextLine();
        byte[] bytes = plainText.getBytes();
        message.close();

        byte[] digitalSignature = generateDigitalSignature(bytes, keypair.getPrivate());

        System.out.println("Signature Value:\n " + HexFormat.of().formatHex(digitalSignature));
        System.out.println("Verification: " + verifyDigitalSignature(bytes, digitalSignature, keypair.getPublic()));

    }
}
```

In the following section, let's investigate more about digital certificates and how they can help you link the public key ownership with the entity that owns it.  

## Digital Certificates Basics in Java

In cryptography, certificates represent electronic document binding some pieces of information together, such as a user’s identity and public key. A trusted third party - Certificate Authority (CA) - issues digital certificates to verify the identity of the certificate holder.

![Portion of a CA certificate obtained from a remote SSL server](https://dev.java/assets/images/security/ca-snippet.png)

_Figure 1: Portion of a certificate from the output of `keytool -printcert -sslserver oracle.com/java`_

A digital certificate contains:

- Serial number used to uniquely identify a certificate, the individual or the entity determined by the certificate.
- Expiration dates (not before and not after)
- Name of certificate holder (subject).
- Copy of certificate holder's public key. You need this to decrypt messages and digital signatures.
- Digital Signature of the certificate issuing authority.

To gain a better understanding of digital signatures and certificates, please look at the table below:

|Characteristic|Digital Signature|Digital Certificate|
|---|---|---|
|Purpose|Verify authenticity, integrity, non-repudiation.|Verify the identity of the sender and receiver.|
|Process|Apply the cryptographic algorithm on the message with a private key to generate a unique digital signature.|A Certifying Authority (CA) generates it: Key Generation, Registration, Verification, Creation.|
|Standard|Digital Signature Standard ([DSS](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf))|[X.509 Standard Format](https://www.itu.int/rec/T-REC-X.509/en)|

Certificates not issued by a known Certificate Authority but rather by the server hosting the certificate are called self-signed. You can generate a self-signed certificate valid for 365 days using `keytool` by running the following command in a terminal window:

```shell
$ keytool -genkeypair -keyalg ed25519 -alias mykey -keystore mykeystore.jks -storepass jkspass \
    -dname "CN=server.mycompany.com,OU=My Company Dev Team,O=My Company,c=NL" -validity 365 

> Generating 255 bit Ed25519 key pair and self-signed certificate (Ed25519) 
> with a validity of 365 days for: CN=server.mycompany.com, OU=My Company Dev Team, O=My Company, C=NL 
```

The previous command performs several operations:

- creates the keystore named `mykeystore` and assigns it the password `jkspass`.
- generates a public/private key pair for the entity whose "distinguished name" has a common name of "server.company.com", organizational unit of "My Company", organization of "My Company" and two-letter country code of "NL".
- uses the default `Ed25519` key generation algorithm to create the keys.
- creates a self-signed certificate that includes the public key and the distinguished name information. This certificate will be valid for 365 days and is associated with the private key in a keystore entry referred to by the alias `mykey`.

You can read the certificate associated with the alias from the keystore and store it in a file `mycert.pem` in the printable encoding format via:

```shell
$ keytool -exportcert -alias mykey \
    -keystore mykeystore.jks -storepass jkspass -rfc -file mycert.pem

> Certificate stored in file <mycert.pem>
```

To parse and manage this certificate, work with certification paths and certificate revocation lists (CRLs) you can use either `keytool` or the classes from `java.security.cert` package. For example, you can generate a [`java.security.cert.Certificate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/cert/Certificate.html) and cast it to [`java.security.cert.X509Certificate`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/cert/X509Certificate.html) using the previously created self-signed certificate:

```java
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream; 
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

public class CertificateManagementExample {
    
    public static void main(String[] args) throws Exception {
        //generate a certificate object
        X509Certificate cert = extractCertificate("mycert.pem");
    }


    private static X509Certificate extractCertificate(String filePath) throws IOException, CertificateException {
        try (InputStream is = new FileInputStream(filePath)) {
            CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");
            return (X509Certificate) certificateFactory.generateCertificate(is);
        }
    }

}
```

While `java.security.cert.Certificate` is an abstraction for certificates that have different formats, the class `java.security.cert.X509Certificate` provides a standard way to access all the attributes of an `X.509` certificate. If you need to validate `X.509` certification paths you should use [`java.security.cert.TrustAnchor`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/cert/TrustAnchor.html) and [`java.security.cert.CertPathValidator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/cert/CertPathValidator.html) for certificate chains.

When working with digital certificates, you have a quick way to locate a particular certificate in the credential store of your system by using a certificate thumbprint. A certificate's fingerprint is the unique identifier of the certificate and can help you compare certificates. You can easily compute a certificate’s thumbprint by using [`java.security.MessageDigest`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/security/MessageDigest.html) over the `java.security.cert.X509Certificate` object:

```java
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.HexFormat;

public class CertificateManagementExample {
    
    public static void main(String[] args) throws Exception {
        //generate a certificate object
        X509Certificate cert = extractCertificate("mycert.pem");
        //compute thumbprint
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(cert.getEncoded());
        System.out.println(HexFormat.ofDelimiter(":").formatHex(md.digest()));
    }

    private static X509Certificate extractCertificate(String filePath) throws IOException, CertificateException {
        try (InputStream is = new FileInputStream(filePath)) {
            CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");
            return (X509Certificate) certificateFactory.generateCertificate(is);
        }
    }
}
```

Congratulations, you’ve learned about the differences between digital signatures and digital certificates and how to interact with those in Java using the Java Security API.

 

## Useful Links:

- [Oracle JDK Cryptographic Roadmap](https://www.java.com/en/jre-jdk-cryptoroadmap.html)
- [Java Security Standard Algorithm Names Specification](https://docs.oracle.com/en/java/javase/22/docs/specs/security/standard-names.html)
- [DSS](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf)
- [T-REC-X.509](https://www.itu.int/rec/T-REC-X.509/en)
- [RFC-8032](https://tools.ietf.org/html/rfc8032)

---
Last update: Invalid DateTime