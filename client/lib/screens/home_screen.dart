import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(title: const Text('Home Screen',style: TextStyle(color: Colors.white)) ),
      body: const Center(child: Text('Welcome to the Home Screen!')),
    );
  }
}
