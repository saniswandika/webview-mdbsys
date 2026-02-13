
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:permission_handler/permission_handler.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MaterialApp(
    home: GeminiNexusWebView(),
    debugShowCheckedModeBanner: false,
  ));
}

class GeminiNexusWebView extends StatefulWidget {
  const GeminiNexusWebView({super.key});

  @override
  State<GeminiNexusWebView> createState() => _GeminiNexusWebViewState();
}

class _GeminiNexusWebViewState extends State<GeminiNexusWebView> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    
    // Meminta izin yang diperlukan saat startup
    _requestPermissions();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            // Bisa tambahkan loading bar di sini
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebView Error: ${error.description}');
          },
        ),
      )
      // GANTI URL INI dengan URL hosting website React Anda
      ..loadRequest(Uri.parse('https://your-gemini-nexus-app.web.app'));
  }

  Future<void> _requestPermissions() async {
    await [
      Permission.camera,
      Permission.microphone,
      Permission.location,
    ].request();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Menggunakan SafeArea agar tidak terpotong notch/status bar
      body: SafeArea(
        child: WebViewWidget(controller: _controller),
      ),
    );
  }
}
