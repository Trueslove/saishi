import { JSEncrypt } from './jsencrypt'

export function encrypt(data){
    var publickey="MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhANirgMSxwOPv2I3qR3tf1Ec2lghrdNI7sJdmrEKvzspM+VzxqWAVI+Cx8odMpoO6jPVpnkHFIHk7rXL0tfoQ79GQ3kCeRHrRLxgFdYHYOqMKG+FO2o8m7Cf2u83xjwiuywIDAQAB";

    var encrypt = new JSEncrypt();

    encrypt.setPublicKey(publickey);

    var encrypted = encrypt.encryptLong(JSON.stringify(data));
    

    return { paramData:[encrypted] };
}

export function decrypt(data){
    var privateKey="MIIB5QIBADANBgkqhkiG9w0BAQEFAASCAc8wggHLAgEAAmEAva4yFwj0szzWMtbjUt1i1toLGWfYXDK3by983Ckn7dd5mHj0ClnF74Aa6FhbkcM98lYq5UIAcxYDib4cmbZJA6PuFkyQngjf/H7QmomR9PQhP8eMVMi5oTqvLz7cm1FZAgMBAAECYQCs2bMXvrePJp9jkONzPf+2HtkCe9l0m1sB3VqBHpgea7+JLJ/nVsvDZxAeL3ayrCGTp2kJ2w67871y7484XH+Bpd64i2R3Vu7X7BkHHTEHk8N2Coj3bfoEryVjrC08V2kCMQDgXYdijOFrB+9xVocOt4dqrPOcJkdTBdDfi9Xd1vc+IHs2W4EHVCeZUOJK58j06usCMQDYbLcEddUX1gE0u/fTJa2wtMr42aohkFVokWn8BG79AJwcK9yoHrSAFdtiruDK28sCMCYC0m/4zCvU4VUDQshUgYWqHW+D8Kt5HcTxrN7zj1mgKR+xau+x6y+HS39DO4F61wIxAJl3PbAj/h8Q2XoTcACBz1BmYydi8YkrV+T2eDkEy88MB6bSU33DiCrrVM39Q9mVUQIwXXY1n3oHB8ok1FwWVWIccfw2N0Q7NnrVAREhGLGLDFLhZRytVjuQFn0r15W0YLcd";

    var encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    return encrypt.decryptLong(data);
}