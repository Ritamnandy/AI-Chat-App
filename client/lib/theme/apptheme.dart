
import 'package:flutter/material.dart';

class AppTheme {
  // =========================
  // CHATGPT STYLE COLORS
  // =========================

  // LIGHT MODE

  static const Color lightPrimary = Color(0xFF10A37F);

  static const Color lightBackground = Color(0xFFFFFFFF);

  static const Color lightSurface = Color(0xFFF7F7F8);

  static const Color lightCard = Color(0xFFFFFFFF);

  static const Color lightText = Color(0xFF202123);

  static const Color lightSubText = Color(0xFF6E6E80);

  static const Color lightBorder = Color(0xFFE5E5E5);

  // DARK MODE

  static const Color darkPrimary = Color(0xFF10A37F);

  static const Color darkBackground = Color(0xFF343541);

  static const Color darkSurface = Color(0xFF444654);

  static const Color darkCard = Color(0xFF444654);

  static const Color darkText = Color(0xFFFFFFFF);

  static const Color darkSubText = Color(0xFFB4B4B4);

  static const Color darkBorder = Color(0xFF565869);

  // =========================
  // LIGHT THEME
  // =========================

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,

    brightness: Brightness.light,

    scaffoldBackgroundColor: lightBackground,

    primaryColor: lightPrimary,

    colorScheme: const ColorScheme.light(
      primary: lightPrimary,
      surface: lightSurface,
    ),

    // APP BAR
    appBarTheme: const AppBarTheme(
      backgroundColor: lightBackground,
      elevation: 0,
      centerTitle: false,
      foregroundColor: lightText,
      surfaceTintColor: Colors.transparent,

      titleTextStyle: TextStyle(
        color: lightText,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),

      iconTheme: IconThemeData(color: lightText),
    ),

    

    // TEXT
    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.bold,
        color: lightText,
      ),

      titleLarge: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: lightText,
      ),

      bodyLarge: TextStyle(fontSize: 16, color: lightText),

      bodyMedium: TextStyle(fontSize: 14, color: lightSubText),
    ),

    // BUTTON
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: lightPrimary,
        foregroundColor: Colors.white,

        elevation: 0,

        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),

    // INPUT FIELD
    inputDecorationTheme: InputDecorationTheme(
      filled: true,

      fillColor: lightSurface,

      contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),

      hintStyle: const TextStyle(color: lightSubText),

      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: lightBorder),
      ),

      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: lightBorder),
      ),

      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: lightPrimary, width: 1.5),
      ),
    ),

    // DIVIDER
    dividerColor: lightBorder,
  );

  // =========================
  // DARK THEME
  // =========================

  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,

    brightness: Brightness.dark,

    scaffoldBackgroundColor: darkBackground,

    primaryColor: darkPrimary,

    colorScheme: const ColorScheme.dark(
      primary: darkPrimary,
      surface: darkSurface,
    ),

    // APP BAR
    appBarTheme: const AppBarTheme(
      backgroundColor: darkBackground,
      elevation: 0,
      centerTitle: false,
      foregroundColor: darkText,
      surfaceTintColor: Colors.transparent,

      titleTextStyle: TextStyle(
        color: darkText,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),

      iconTheme: IconThemeData(color: darkText),
    ),

    
    // TEXT
    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.bold,
        color: darkText,
      ),

      titleLarge: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: darkText,
      ),

      bodyLarge: TextStyle(fontSize: 16, color: darkText),

      bodyMedium: TextStyle(fontSize: 14, color: darkSubText),
    ),

    // BUTTON
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: darkPrimary,
        foregroundColor: Colors.white,

        elevation: 0,

        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),

    // INPUT FIELD
    inputDecorationTheme: InputDecorationTheme(
      filled: true,

      fillColor: darkSurface,

      contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),

      hintStyle: const TextStyle(color: darkSubText),

      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: darkBorder),
      ),

      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: darkBorder),
      ),

      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: darkPrimary, width: 1.5),
      ),
    ),

    dividerColor: darkBorder,
  );
}
