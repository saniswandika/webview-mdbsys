
# Cara Menjalankan di Android (Flutter)

1. **Buat Project Flutter Baru:**
   ```bash
   flutter create gemini_nexus_app
   ```

2. **Tambahkan Dependencies di `pubspec.yaml`:**
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     webview_flutter: ^4.10.0
     permission_handler: ^11.3.1
   ```

3. **Update Android Manifest (`android/app/src/main/AndroidManifest.xml`):**
   Tambahkan izin internet dan izin lainnya di atas tag `<application>`:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   ```

4. **Update `minSdkVersion`:**
   Di `android/app/build.gradle`, pastikan `minSdkVersion` minimal **21**.

5. **Salin Kode:**
   Ganti isi `lib/main.dart` dengan kode dari file `android_flutter_main.dart` yang saya berikan.

6. **Deploy Website:**
   Pastikan website React Anda sudah di-deploy (misal ke Firebase Hosting atau Vercel) dan ganti URL di `main.dart` ke URL tersebut.
