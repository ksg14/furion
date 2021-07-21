package gg.ez.furion.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseService {

    public void initialize () throws AssertionError, IOException {
        InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("./furion-auth-firebase-servicekey.json");

        assert serviceAccount != null;
        FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

        if (FirebaseApp.getApps().isEmpty())
            FirebaseApp.initializeApp(options);
    }

    public FirebaseToken verifyToken (String idToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }

}
