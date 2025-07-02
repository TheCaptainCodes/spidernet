# SpiderNet Mobile App

A React Native mobile application for managing and monitoring a decentralized mesh network. Built with Expo and TypeScript.

## Features

- **Network Management**: Connect to and monitor mesh network nodes
- **Real-time Messaging**: Send and receive messages through the mesh network
- **Emergency SOS**: Send emergency signals to all nearby nodes
- **Interactive Map**: Visualize network topology and node locations
- **Device Monitoring**: Track device health, battery, and signal strength
- **Profile Management**: User settings and device information

## Screens

1. **Home Screen**: Network status, device health, and quick actions
2. **Map Screen**: Interactive map showing all network nodes
3. **Messages Screen**: Real-time messaging through the mesh network
4. **Emergency Screen**: SOS functionality and help requests
5. **Profile Screen**: User settings and device management

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Maps** for map functionality
- **Expo Linear Gradient** for UI effects
- **Expo Location** for location services
- **Ionicons** for icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spidernet-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## Project Structure

```
spidernet-mobile/
├── src/
│   ├── data/
│   │   └── mockData.ts          # Mock data for development
│   └── screens/
│       ├── HomeScreen.tsx       # Main dashboard
│       ├── MapScreen.tsx        # Network map
│       ├── MessagesScreen.tsx   # Messaging interface
│       ├── EmergencyScreen.tsx  # Emergency features
│       └── ProfileScreen.tsx    # User profile
├── App.tsx                      # Main app component
├── app.json                     # Expo configuration
└── package.json                 # Dependencies
```

## Key Features

### Network Connection
- Connect to nearby mesh network nodes via Bluetooth
- Real-time status monitoring
- Automatic node discovery

### Emergency Services
- One-tap SOS functionality
- Custom help requests
- Emergency message broadcasting
- Location sharing for emergency responders

### Messaging System
- Real-time messaging through mesh network
- Encrypted message support
- Message delivery confirmation
- Network hop tracking

### Map Visualization
- Interactive map showing all network nodes
- Node status indicators
- Connection range visualization
- Node information popups

## Configuration

### Permissions

The app requires the following permissions:

- **Location**: For node discovery and emergency services
- **Bluetooth**: For mesh network connectivity
- **Internet**: For network communication
- **Network State**: For connection monitoring

### Environment Setup

1. **iOS Development**:
   - Xcode installed
   - iOS Simulator or physical device
   - Apple Developer account (for physical device testing)

2. **Android Development**:
   - Android Studio installed
   - Android SDK configured
   - Android emulator or physical device

## Development

### Adding New Features

1. Create new screen components in `src/screens/`
2. Add navigation routes in `App.tsx`
3. Update mock data in `src/data/mockData.ts` if needed
4. Test on both iOS and Android

### Styling

The app uses a consistent dark theme with:
- Primary color: `#06B6D4` (cyan)
- Background: `#111827` (dark gray)
- Text: `#FFFFFF` (white)
- Accent colors for different features

### State Management

Currently using React's built-in state management. For larger scale, consider:
- Redux Toolkit
- Zustand
- React Query for API calls

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run e2e
```

## Deployment

### App Store (iOS)
1. Build the app using EAS Build
2. Submit to App Store Connect
3. Configure app metadata and screenshots
4. Submit for review

### Google Play Store (Android)
1. Build the app using EAS Build
2. Create a release in Google Play Console
3. Upload the APK/AAB file
4. Configure store listing
5. Submit for review

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## Roadmap

- [ ] Real-time node discovery
- [ ] Offline message queuing
- [ ] Advanced encryption
- [ ] Push notifications
- [ ] Voice messaging
- [ ] File sharing
- [ ] Network analytics
- [ ] Multi-language support 