import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const emergencyCategories = [
  {
    id: 'medical',
    title: 'Medical Emergencies',
    icon: 'heart',
    color: '#F87171',
    situations: [
      {
        title: 'Heart Attack',
        symptoms: ['Chest pain', 'Shortness of breath', 'Nausea', 'Sweating'],
        steps: [
          'Call emergency services immediately',
          'Have person sit down and rest',
          'Loosen tight clothing',
          'Give aspirin if person is not allergic',
          'Stay with person until help arrives',
        ],
      },
      {
        title: 'Stroke',
        symptoms: ['Face drooping', 'Arm weakness', 'Speech difficulty', 'Time to call emergency'],
        steps: [
          'Use FAST test: Face, Arms, Speech, Time',
          'Call emergency services immediately',
          'Note time symptoms started',
          'Keep person calm and still',
          'Do not give food or water',
        ],
      },
      {
        title: 'Severe Bleeding',
        symptoms: ['Heavy blood loss', 'Deep cuts', 'Puncture wounds'],
        steps: [
          'Apply direct pressure to wound',
          'Elevate injured area if possible',
          'Use clean cloth or bandage',
          "Do not remove embedded objects",
          "Call emergency services if bleeding won't stop",
        ],
      },
    ],
  },
  {
    id: 'fire',
    title: 'Fire Emergencies',
    icon: 'fire',
    color: '#FB923C',
    situations: [
      {
        title: 'House Fire',
        symptoms: ['Smoke', 'Flames', 'Heat', 'Burning smell'],
        steps: [
          'Get everyone out immediately',
          'Crawl low under smoke',
          'Feel doors before opening',
          'Call fire department from outside',
          'Meet at designated meeting point',
        ],
      },
      {
        title: 'Kitchen Fire',
        symptoms: ['Grease fire', 'Oven fire', 'Stovetop fire'],
        steps: [
          'Turn off heat source if safe',
          'Cover pan fire with lid',
          'Use baking soda for small grease fires',
          'Never use water on grease fires',
          'Call fire department for large fires',
        ],
      },
    ],
  },
  {
    id: 'natural',
    title: 'Natural Disasters',
    icon: 'weather-windy',
    color: '#38BDF8',
    situations: [
      {
        title: 'Earthquake',
        symptoms: ['Ground shaking', 'Building movement', 'Loud rumbling'],
        steps: [
          'Drop, Cover, and Hold On',
          'Get under sturdy desk or table',
          'Stay away from windows and heavy objects',
          'If outdoors, move away from buildings',
          'After shaking stops, evacuate if building is damaged',
        ],
      },
      {
        title: 'Flood',
        symptoms: ['Rising water', 'Heavy rainfall', 'Dam overflow'],
        steps: [
          'Move to higher ground immediately',
          'Never drive through flooded roads',
          'Turn off utilities if time permits',
          'Take emergency kit and important documents',
          'Stay informed via weather radio',
        ],
      },
    ],
  },
  {
    id: 'home',
    title: 'Home Emergencies',
    icon: 'home',
    color: '#4ADE80',
    situations: [
      {
        title: 'Gas Leak',
        symptoms: ['Gas smell', 'Hissing sound', 'Dead vegetation near gas line'],
        steps: [
          'Do not use electrical switches or phones',
          'Evacuate area immediately',
          'Do not light matches or smoke',
          'Call gas company from safe location',
          'Ventilate area if safe to do so',
        ],
      },
      {
        title: 'Power Outage',
        symptoms: ['No electricity', 'Darkness', 'Stopped appliances'],
        steps: [
          'Check circuit breakers first',
          'Use flashlights instead of candles',
          'Keep refrigerator and freezer closed',
          'Turn off major appliances',
          'Report outage to power company',
        ],
      },
    ],
  },
];

const emergencyNumbers = [
  { service: 'Emergency Services', number: '911', description: 'Police, Fire, Medical' },
  { service: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison emergency help' },
  { service: 'Suicide Prevention', number: '988', description: '24/7 crisis support' },
  { service: 'Disaster Distress', number: '1-800-985-5990', description: 'Emotional support during disasters' },
  { service: 'Red Cross', number: '1-800-733-2767', description: 'Disaster relief and assistance' },
  { service: 'Non-Emergency Police', number: '311', description: 'Non-urgent police matters' },
];

const GuideScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredCategories = emergencyCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.situations.some(situation =>
      situation.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderIcon = (icon: string, color: string) => {
    switch (icon) {
      case 'heart':
        return <Ionicons name="heart" size={26} color={color} style={{ marginRight: 10 }} />;
      case 'fire':
        return <MaterialCommunityIcons name="fire" size={26} color={color} style={{ marginRight: 10 }} />;
      case 'weather-windy':
        return <MaterialCommunityIcons name="weather-windy" size={26} color={color} style={{ marginRight: 10 }} />;
      case 'home':
        return <Ionicons name="home" size={26} color={color} style={{ marginRight: 10 }} />;
      default:
        return <Ionicons name="alert-circle" size={26} color={color} style={{ marginRight: 10 }} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Emergency Guide</Text>
        <Text style={styles.subheader}>First aid and emergency response instructions</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search emergency situations..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Emergency Categories */}
        <Text style={styles.sectionTitle}>Emergency Situations</Text>
        <View style={styles.categoriesContainer}>
          {filteredCategories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            return (
              <View key={category.id} style={styles.categoryCard}>
                <TouchableOpacity
                  style={[styles.categoryHeader, { borderColor: category.color }]}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setExpandedCategory(isExpanded ? null : category.id);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {renderIcon(category.icon, category.color)}
                    <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                    size={20}
                    color={category.color}
                  />
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.categoryContent}>
                    {category.situations.map((situation, idx) => (
                      <View key={idx} style={styles.situationCard}>
                        <Text style={styles.situationTitle}>{situation.title}</Text>
                        <Text style={styles.situationSubtitle}>Symptoms/Signs:</Text>
                        <View style={styles.situationList}>
                          {situation.symptoms.map((symptom, i) => (
                            <View key={i} style={styles.situationListItem}>
                              <View style={styles.situationDot} />
                              <Text style={styles.situationListText}>{symptom}</Text>
                            </View>
                          ))}
                        </View>
                        <Text style={styles.situationSubtitle}>What to do:</Text>
                        <View style={styles.situationList}>
                          {situation.steps.map((step, i) => (
                            <View key={i} style={styles.situationListItem}>
                              <Text style={styles.situationStepNum}>{i + 1}.</Text>
                              <Text style={styles.situationListText}>{step}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Emergency Hotlines */}
        <Text style={styles.sectionTitle}>Emergency Hotlines</Text>
        <View style={styles.hotlinesContainer}>
          {emergencyNumbers.map((emergency, idx) => (
            <View key={idx} style={styles.hotlineItem}>
              <Ionicons name="call" size={18} color="#F87171" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.hotlineService}>{emergency.service}</Text>
                <Text style={styles.hotlineDesc}>{emergency.description}</Text>
              </View>
              <Text style={styles.hotlineNumber}>{emergency.number}</Text>
            </View>
          ))}
        </View>

        {/* Important Note */}
        <View style={styles.reminderCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <MaterialIcons name="warning" size={20} color="#F87171" style={{ marginRight: 8 }} />
            <Text style={styles.reminderTitle}>Important Reminder</Text>
          </View>
          <Text style={styles.reminderText}>
            This guide provides general information only. In any serious emergency, call professional emergency services immediately. These instructions are not a substitute for professional medical or emergency training.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 32,
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  subheader: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  hotlinesContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 18,
    padding: 10,
  },
  hotlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222b3a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  hotlineService: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  hotlineDesc: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  hotlineNumber: {
    color: '#F87171',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  categoriesContainer: {
    marginBottom: 18,
    marginHorizontal: -4,
  },
  categoryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 12,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    backgroundColor: '#232b3a',
    minHeight: 70,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  categoryContent: {
    padding: 16,
    backgroundColor: '#232b3a',
  },
  situationCard: {
    backgroundColor: '#222b3a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  situationTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
  },
  situationSubtitle: {
    color: '#FACC15',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 2,
  },
  situationList: {
    marginBottom: 6,
  },
  situationListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  situationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FACC15',
    marginRight: 8,
  },
  situationStepNum: {
    color: '#06B6D4',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  situationListText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  reminderCard: {
    backgroundColor: '#F87171' + '22',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F87171',
    padding: 12,
    marginTop: 18,
    marginBottom: 24,
  },
  reminderTitle: {
    color: '#F87171',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reminderText: {
    color: '#F87171',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default GuideScreen; 